# F-05 · Managing Committee & Samiti Governance Portal

**Module Code:** F-05  
**Priority:** 🔴 Critical  
**Estimated Effort:** 3–4 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), P-04 (Notifications), F-08 (Affiliation Compliance)  

---

## 1. Module Overview

Each SSVM school operates under a legally constituted Managing Committee — a body of President, Vice President, Secretary, Treasurer, and Members — which is a requirement for state board affiliation and legal operation. Currently, committee records are captured only in basic form in the existing system with no tenure tracking, no meeting records, and no alert mechanism.

A single lapsed committee term — if not renewed before expiry — can endanger a school's state board affiliation, disrupting education for hundreds of students. This module ensures that never happens.

---

## 2. Functional Requirements

### 2.1 Committee Constitution Registry

**Managing Committee Record (per SSVM):**
- SSVM code and name
- Constitution date (when this committee was constituted)
- Term duration (years — configurable per state rules, typically 3 years)
- Term expiry date (auto-computed from constitution date + term duration)
- Registration reference (if committee is registered under Societies Registration Act)

**Committee Members:**
- Position: President / Vice President / Secretary / Joint Secretary / Treasurer / Member / Ex-Officio Member
- Member Name
- Mobile
- Email
- Date of Appointment
- Address
- Photo (optional)

**Actions:**
- Add/Edit committee members (SSVM Principal or authorised admin)
- Reconstitute (when term ends): creates a new committee record; previous committee archived
- Partial change: add/remove members without full reconstitution (for mid-term vacancies)

### 2.2 Term Expiry Alerts

The system monitors every SSVM's committee term expiry and escalates alerts up the hierarchy:

**Alert Schedule:**
| Time Before Expiry | Alert Sent To |
|-------------------|--------------|
| 6 months | SSVM Principal |
| 3 months | SSVM Principal + Sankula Admin |
| 1 month | SSVM + Sankula + Bibhag Admin |
| 2 weeks | SSVM + Sankula + Bibhag + Sambhag Admin |
| 1 week | All above + Head Office |
| Expired (past expiry) | All above + Head Office; SSVM marked "Committee Expired" in compliance |

Alerts delivered via in-app notification + SMS to SSVM Principal's mobile.

### 2.3 Meeting Minutes and Resolutions

**Recording a Committee Meeting:**
- Meeting Date
- Meeting Type: General Body / Executive / Special
- Attendees: select from committee members list
- Quorum met: Yes / No (quorum count configurable)
- Agenda items (numbered list)
- Minutes (rich text for each agenda item)
- Resolutions passed (numbered list)
- Next meeting date (optional)
- Attachment (signed minutes PDF, if any)

Meetings are stored chronologically per SSVM and viewable by the SSVM, Sankula, Sambhag, and Head Office.

### 2.4 AGM Compliance Calendar

Each SSVM is required to hold an Annual General Body Meeting (AGM) within a defined calendar period:

- AGM due date per SSVM (based on financial year or calendar year — configurable)
- Alert if AGM not recorded 30 days before due date
- Alert if AGM not recorded by due date → compliance flag raised (visible in P-01 Compliance Dashboard)
- AGM compliance report: which SSVMs held AGM on time, which missed

### 2.5 Election Workflow (for Reconstitution)

When a committee's term is nearing expiry, the reconstitution process must be tracked:

**Steps:**
1. SSVM initiates election process (records "Election announced" with date)
2. Candidates confirmed (SSVM records names and positions)
3. Election conducted (records Election Date)
4. New committee constituted (enter new members → new committee record created, old archived)
5. Registered with appropriate authority (if required) — reference number entered

**Election Timeline Tracking:**
- Head Office can see which SSVMs have started reconstitution vs. which are doing nothing as expiry approaches

### 2.6 Governance Dashboard (Head Office)

- Total SSVMs by committee status: Valid / Expiring Soon (< 3 months) / Expired
- SSVMs without any AGM on record in the last 12 months
- SSVMs in election process
- Committee compliance heat map (by Sambhag)
- Export report for legal/compliance submission

---

## 3. Data Models

### 3.1 Committees Table
```
managing_committees
├── committee_id (UUID, PK)
├── ssvm_code
├── constitution_date
├── term_duration_years
├── term_expiry_date (computed)
├── registration_reference (nullable)
├── status (ENUM: ACTIVE, EXPIRING_SOON, EXPIRED, DISSOLVED)
├── reconstituted_from_committee_id (nullable — FK to previous committee)
└── created_at
```

### 3.2 Committee Members Table
```
committee_members
├── member_id (UUID, PK)
├── committee_id (FK → managing_committees)
├── position (ENUM — see position list)
├── full_name
├── mobile
├── email
├── address
├── date_of_appointment
├── is_active (BOOL)
└── photo_url (nullable)
```

### 3.3 Committee Meetings Table
```
committee_meetings
├── meeting_id (UUID, PK)
├── committee_id (FK → managing_committees)
├── ssvm_code
├── meeting_date
├── meeting_type (ENUM: AGM, EXECUTIVE, SPECIAL)
├── quorum_met (BOOL)
├── attendees (JSONB — array of member_ids)
├── agenda (TEXT — numbered list)
├── minutes (TEXT — rich text)
├── resolutions (TEXT — numbered list)
├── attachment_url (nullable)
└── recorded_by_user_id
```

### 3.4 Election Process Table
```
committee_elections
├── election_id (UUID, PK)
├── committee_id (FK — the expiring committee)
├── ssvm_code
├── election_announced_date
├── election_conducted_date (nullable)
├── new_committee_id (nullable — FK to newly constituted committee)
├── status (ENUM: ANNOUNCED, CONDUCTED, CONSTITUTED)
└── notes
```

---

## 4. Implementation Plan

### Phase 1 — Committee Registry & Members (Weeks 1–2)
- [ ] Build committee constitution and member management
- [ ] Implement term expiry date computation
- [ ] Build alert scheduler for all expiry thresholds
- [ ] Integrate compliance flag with P-01 on expiry

### Phase 2 — Meetings, AGM & Elections (Weeks 2–3)
- [ ] Build meeting minutes recording form
- [ ] Build AGM compliance tracking and alerts
- [ ] Build election workflow with status tracking
- [ ] Build governance dashboard

### Phase 3 — Testing (Week 4)
- [ ] Test alert scheduling: set a test committee's expiry to tomorrow, confirm alert sent at each threshold
- [ ] Test AGM compliance flag creation in P-01 on missed AGM
- [ ] Test reconstitution: old committee archived, new committee active

---

## 5. Acceptance Criteria

- [ ] A committee with an expiry date 90 days from today appears in "Expiring Soon" list; Sankula admin receives in-app notification
- [ ] Expired committee triggers a compliance flag in P-01 Dashboard visible to Head Office
- [ ] Meeting minutes recorded for an AGM; SSVM's AGM compliance status updates to "Compliant"
- [ ] Reconstitution creates a new committee record and archives the old one; the new committee appears in the governance dashboard

---

## 6. Developer Notes

- Committee expiry alerts must be sent even if the SSVM admin has not logged in — use a background scheduler, not a user-session trigger
- AGM due date calculation: configurable per SSVM (some may have different fiscal year calendars) — store as a date field, not derived from a formula
- The "Committee Expired" compliance flag should integrate with F-08 (Affiliation Compliance) — a lapsed committee directly risks affiliation; both flags should appear together in the compliance view
