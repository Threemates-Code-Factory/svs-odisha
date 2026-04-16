# P-01 · Compliance and Data Verification

**Module Code:** P-01  
**Priority:** 🔴 Critical  
**Estimated Effort:** 6–8 Weeks  
**Team:** 1 Senior Backend Developer + 1 Frontend Developer + 1 QA Engineer  
**Depends On:** P-11 (RBAC), Core DB Schema, All data-entry modules  

---

## 1. Module Overview

The SVS EMS currently accepts data submissions from 800–1,000 SSVM schools with no automated checks at the point of entry and no mechanism to detect manipulation or inconsistency after the fact. Any school operator can enter inflated student numbers, duplicate staff records, or fabricated fee collections — and none of this is flagged until a human auditor manually cross-checks spreadsheets.

This module introduces a **3-layer data integrity framework**:

1. **Entry-time validation** — rules enforced at the form level before data is saved
2. **Cross-module consistency engine** — a background service that checks data relationships across modules (e.g., a student registered for an exam must have a valid admission record)
3. **Audit trail** — an immutable change log recording every record creation, modification, and deletion with the user identity, timestamp, and before/after values

This module is foundational. Every other module in the new EMS depends on the data integrity guarantees this module provides.

---

## 2. Problem Statement (Current Gaps)

| # | Current Gap | Consequence |
|---|-------------|-------------|
| 1 | No mandatory field enforcement at data entry | Incomplete records enter the database silently |
| 2 | No duplicate detection (Aadhaar, staff ID, mobile) | Same person appears in multiple schools simultaneously |
| 3 | No cross-module checks | Students appear in exam records without valid admission records |
| 4 | No audit trail | Data changes cannot be traced; fabrication is undetectable |
| 5 | No anomaly flagging | Sudden 200% admission spikes, negative fee collections go unnoticed |
| 6 | Manual reconciliation | Auditors spend weeks manually cross-checking records |

---

## 3. Functional Requirements

### 3.1 Entry-Time Validation Rules

The system shall enforce the following validation gates before any record is saved to the database:

#### Student Records
- Admission Number must be unique within the SSVM and academic year
- Aadhaar number, if provided, must be exactly 12 digits and unique across the entire network
- Date of Birth must produce an age between 3 and 20 years at the time of admission
- Class/Grade must be a valid value from the master list (Praramva, Bodh, I–XII)
- Academic year must be the currently active session year or one year prior (for late entries)
- Guardian mobile number must be 10 digits and numeric
- Required fields: Student Name, Date of Birth, Class, Guardian Name, Guardian Mobile, SSVM Code

#### Staff Records
- Aadhaar number must be unique across all SSVMs in the network (a person cannot be active at two schools simultaneously)
- Date of Joining must not be a future date
- Designation must be from the master designation list
- Mobile number must be 10 digits
- Required fields: Full Name, Designation, Date of Joining, Mobile, SSVM Code

#### Fee Collection (Sahajoga Rasi)
- Total fee collected must not exceed (Student Strength × Per-Student Fee Rate)
- Fee amount must be positive and numeric
- Session year must match the currently active academic year
- Payment date must not be a future date

#### AKP and SAATF Contributions
- Monthly contribution per member must match the rate defined for the session year
- Total contribution sent to PO must reconcile with sum of individual contributions received
- Bank details must be present before online payment is initiated

### 3.2 Cross-Module Consistency Engine

A background scheduler (runs every 6 hours and on demand by Head Office) checks the following consistency rules across modules and flags violations in the Compliance Dashboard:

| Rule ID | Check | Modules Involved |
|---------|-------|-----------------|
| XM-01 | Every student in Exam Registration must have an active Admission record for the same session year | Exams ↔ Establishment |
| XM-02 | Every student in Sports Participants must have an active Admission record | Sports ↔ Establishment |
| XM-03 | Every AKP/SAATF member must have an active Staff record with a valid Designation | Accounts ↔ Establishment |
| XM-04 | Fee collected (Sahajoga Rasi) must not exceed declared student strength × fee rate | Accounts ↔ Establishment |
| XM-05 | Staff listed in Exam Duty (invigilation) must be active staff at that SSVM | Exams ↔ Establishment |
| XM-06 | Prakashan order payment must not exceed the order value | Prakashan ↔ Accounts |
| XM-07 | A Sevabrati marked as Inactive/Transferred must not appear in AKP/SAATF active contribution lists | Accounts ↔ Establishment |
| XM-08 | Student promoted to next class must have valid records in the previous class | Establishment (Promotion) |

Violations generate a flagged entry in the Compliance Dashboard visible to Head Office, Sambhag, and the SSVM's own Sankula.

### 3.3 Anomaly Detection (Statistical Flags)

The engine shall compute baselines and flag statistical anomalies:

| Anomaly | Trigger Condition | Severity |
|---------|------------------|----------|
| Admission Spike | SSVM student count increases by more than 40% year-over-year | High |
| Fee Shortfall | Fee collected is less than 60% of expected (Strength × Rate) | High |
| Duplicate Aadhaar | Same Aadhaar found at 2+ SSVMs | Critical |
| Multi-school Staff | Same mobile/Aadhaar registered as active at 2+ SSVMs | Critical |
| Negative Balance | SAATF or AKP ledger shows negative balance after a transaction | High |
| Zero Attendance Exam | SSVM registered 0 students for exam but has >50 enrolled students | Medium |

### 3.4 Audit Trail

Every data change across all modules must be recorded in a single, immutable audit log with the following fields:

| Field | Description |
|-------|-------------|
| `audit_id` | Auto-generated UUID |
| `module` | Module name (e.g., Establishment, Accounts) |
| `table_name` | Database table affected |
| `record_id` | Primary key of the changed record |
| `action` | CREATE / UPDATE / DELETE |
| `changed_by_user_id` | ID of the logged-in user |
| `changed_by_role` | Role at time of change |
| `ssvm_code` | SSVM where the change occurred |
| `timestamp` | UTC timestamp |
| `before_value` | JSON snapshot of record before change |
| `after_value` | JSON snapshot of record after change |
| `ip_address` | Client IP |
| `session_id` | Login session ID |

The audit log table is **append-only** — no UPDATE or DELETE operations are permitted on it. Only Super Admin can view the raw audit log; role-specific filtered views are exposed to Head Office and Sambhag.

### 3.5 Compliance Dashboard

A dedicated dashboard visible to Head Office (all schools) and Sambhag/Bibhag (their scope) displaying:

- Count of open cross-module violations by category
- Count of anomaly flags by severity (Critical / High / Medium)
- SSVM-wise compliance score (percentage of rules passed)
- Heat map of SSVMs by compliance status (Green / Yellow / Red)
- Filters: Sambhag, Bibhag, Sankula, SSVM, Rule Category
- Drill-down to individual violation records with the SSVM contact for follow-up
- Export to Excel/PDF for audit submission

---

## 4. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Validation Response Time | Entry-time validation must return in < 300ms |
| Consistency Engine Run Time | Full network scan must complete in < 30 minutes |
| Audit Log Retention | Minimum 7 years, non-deletable |
| Audit Log Performance | Writes must not add more than 20ms to any transaction |
| Dashboard Load Time | < 3 seconds for Sambhag-level view |

---

## 5. Data Models

### 5.1 Validation Rules Master Table
```
validation_rules
├── rule_id (PK)
├── rule_code (e.g., VAL-STU-001)
├── module
├── entity
├── field_name
├── rule_type (REQUIRED / FORMAT / RANGE / UNIQUE / CROSS_MODULE)
├── rule_expression (JSON or SQL snippet)
├── error_message
├── severity (ERROR / WARNING)
├── is_active
└── created_at
```

### 5.2 Cross-Module Violations Table
```
compliance_violations
├── violation_id (PK)
├── rule_id (FK → validation_rules)
├── ssvm_code
├── module_a
├── record_id_a
├── module_b
├── record_id_b
├── detected_at
├── status (OPEN / RESOLVED / DISMISSED)
├── resolved_by
├── resolved_at
└── notes
```

### 5.3 Audit Log Table
```
audit_log
├── audit_id (UUID, PK)
├── module
├── table_name
├── record_id
├── action (CREATE / UPDATE / DELETE)
├── changed_by_user_id (FK → users)
├── changed_by_role
├── ssvm_code
├── timestamp (UTC, indexed)
├── before_value (JSONB)
├── after_value (JSONB)
├── ip_address
└── session_id
```

---

## 6. UI Screens

| Screen | Path | Role Access | Description |
|--------|------|-------------|-------------|
| Compliance Dashboard | /compliance/dashboard | Head Office, Sambhag, Bibhag | Summary of violations, scores, heat map |
| Violations List | /compliance/violations | Head Office, Sambhag | Filterable list of open violations |
| Violation Detail | /compliance/violations/:id | Head Office, Sambhag | Full detail of one violation with linked records |
| Audit Log Viewer | /compliance/audit-log | Super Admin, Head Office | Full audit log with filters |
| SSVM Audit History | /compliance/audit-log/ssvm/:code | Sankula, SSVM | Own audit history only |
| Anomaly Flags | /compliance/anomalies | Head Office, Sambhag | Statistical anomaly list |
| Rules Management | /compliance/rules | Super Admin only | Enable/disable validation rules |

---

## 7. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/compliance/dashboard | Summary stats for dashboard |
| GET | /api/compliance/violations | List violations with filters |
| PATCH | /api/compliance/violations/:id | Update violation status |
| POST | /api/compliance/scan | Trigger manual consistency scan |
| GET | /api/compliance/audit-log | Query audit log |
| GET | /api/compliance/audit-log/record/:table/:id | All changes to a specific record |
| GET | /api/compliance/anomalies | List anomaly flags |
| GET | /api/compliance/ssvm-score | SSVM compliance scores |
| GET | /api/compliance/rules | List validation rules |
| PATCH | /api/compliance/rules/:id | Enable/disable a rule |

---

## 8. Implementation Plan

### Phase 1 — Foundations (Weeks 1–2)
- [ ] Design and create the `audit_log` table with append-only enforcement (DB trigger)
- [ ] Build the audit logging middleware — intercept all INSERT/UPDATE/DELETE operations across all modules and write to audit log
- [ ] Implement entry-time validation framework: validation rule engine that reads from `validation_rules` master table
- [ ] Implement all student record validation rules
- [ ] Implement all staff record validation rules
- [ ] Write unit tests for all validation rules

### Phase 2 — Cross-Module Engine (Weeks 3–4)
- [ ] Build the cross-module consistency engine as a background service (cron job + manual trigger)
- [ ] Implement all 8 cross-module rules (XM-01 through XM-08)
- [ ] Implement anomaly detection: baselines computed per SSVM per year, flag logic
- [ ] Write violations to `compliance_violations` table
- [ ] Implement email/in-app notification when Critical violations are detected

### Phase 3 — Dashboard & UI (Weeks 5–6)
- [ ] Build Compliance Dashboard with heat map, score cards, violation counts
- [ ] Build Violations List with filters and drill-down
- [ ] Build Audit Log Viewer with date range, user, module, SSVM filters
- [ ] Build Anomaly Flags list
- [ ] Build Rules Management screen (Super Admin)
- [ ] Export functionality (Excel, PDF) for all views

### Phase 4 — Testing & Hardening (Weeks 7–8)
- [ ] Load test the consistency engine against simulated 1,000-school dataset
- [ ] Penetration test: attempt to bypass audit logging via direct DB access (should be blocked)
- [ ] UAT with Head Office and one Sambhag admin
- [ ] Document all validation rules for the operations manual
- [ ] Train Head Office admins on the Compliance Dashboard

---

## 9. Integration Points

| Integration | Description |
|-------------|-------------|
| All data-entry modules | Must call the validation engine before saving any record |
| P-11 RBAC Module | Audit log captures role and user from the session context |
| P-04 Communication Module | Sends notifications to Sankula/Sambhag when Critical violations are found |
| P-03 AI Reports Module | Compliance scores and violation data feed the AI report trust scoring |

---

## 10. Acceptance Criteria

- [ ] Submitting a student record with a missing Required field returns a clear error and does not save
- [ ] Submitting a duplicate Aadhaar number (across two different SSVMs) is blocked with a specific error
- [ ] Every successful record save produces a corresponding `audit_log` entry with correct before/after values
- [ ] The consistency engine detects and flags XM-01 (student in exam without admission) within one scheduled run
- [ ] The Compliance Dashboard loads within 3 seconds for a Sambhag with 100+ SSVMs
- [ ] An SSVM user can view their own audit history but cannot view another SSVM's records
- [ ] Audit log entries cannot be deleted or updated, even by Super Admin (enforced by DB trigger)

---

## 11. Developer Notes

- Use a database trigger (not application-level code only) to enforce audit log immutability — application-level enforcement can be bypassed
- The consistency engine should use cursor-based pagination to avoid memory issues when scanning 100,000+ student records
- Store `before_value` and `after_value` as JSONB (PostgreSQL) or JSON (MySQL) — do not stringify and store as TEXT
- The validation rule engine should be data-driven (rules stored in DB) so Head Office can activate/deactivate rules without a deployment
- Index `audit_log` on `(ssvm_code, timestamp)` and `(table_name, record_id)` for fast lookups
- For the heat map, pre-compute SSVM compliance scores during the nightly batch run and cache them — do not compute on every dashboard load
