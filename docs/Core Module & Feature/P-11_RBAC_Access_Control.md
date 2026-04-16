# P-11 · Role-Based Access Control (RBAC)

**Module Code:** P-11  
**Priority:** 🔴 Critical — Must be built FIRST  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Senior Backend Developer (Security) + 1 Frontend Developer  
**Depends On:** Nothing — this is a foundational dependency for ALL other modules  

---

## 1. Module Overview

The current system implements only five broad roles with virtually no granularity within those roles. A Head Office user can access recruitment, accounts, exams, and publications simultaneously — there is no departmental separation. Within a school, the principal and the office assistant have identical access. Sensitive fields like salary and bank account numbers are visible to all.

This module builds a **Comprehensive RBAC Framework** — the security foundation that every other module depends on. It must be built before any other module begins, as all other modules will reference RBAC for access decisions.

---

## 2. Functional Requirements

### 2.1 Role Hierarchy

The role hierarchy maps to the SVS organisational structure, with additional departmental separation within each tier:

**Tier 1: Super Admin**
- Full access to everything including system configuration, user management, and raw audit log

**Tier 2: Head Office**
- Sub-roles (departments):
  - HO_ACCOUNTS — Accounts and Finance module
  - HO_ACADEMIC — Establishment, Examinations, Syllabus
  - HO_RECRUITMENT — Acharya Chayana module
  - HO_PRAKASHAN — Prakashan/Books module
  - HO_TRAINING — Teacher Training module
  - HO_REPORTS — Read-only access to all reports
  - HO_ADMIN — User management, system settings

**Tier 3: Sambhag**
- Sub-roles:
  - SAMBHAG_ADMIN — General admin for the Sambhag
  - SAMBHAG_FINANCE — Finance and accounts for the Sambhag
  - SAMBHAG_INSPECTION — Inspection and visit management

**Tier 4: Bibhag**
- Sub-roles:
  - BIBHAG_ADMIN
  - BIBHAG_NIRIKSHAYAK — Inspector role

**Tier 5: Sankula**
- SANKULA_ADMIN

**Tier 6: SSVM (School Level)**
- Sub-roles:
  - SSVM_PRINCIPAL
  - SSVM_OFFICE — Office assistant (limited data entry, no financial approval)
  - SSVM_ACHARYA — Class teacher (can view own class students, own profile only)
  - SSVM_ACCOUNTS — Accounts entry for the school

### 2.2 Permission Matrix

Permissions are defined at the module × action level. Actions are: View, Create, Edit, Delete, Approve, Export, Report.

**Example Permission Matrix (partial):**

| Module | Action | Super Admin | HO_ACCOUNTS | HO_ACADEMIC | SSVM_PRINCIPAL | SSVM_OFFICE | SSVM_ACHARYA |
|--------|--------|-------------|-------------|-------------|----------------|-------------|--------------|
| Student Records | View | ✅ | ✅ | ✅ | ✅ | ✅ | Own class only |
| Student Records | Create | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| Student Records | Delete | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| AKP Contributions | View | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| AKP Contributions | Approve | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Staff Salary | View | ✅ | ✅ | ❌ | SSVM_PRINCIPAL only | ❌ | ❌ |
| Transfer Approve | Approve | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

Full permission matrix to be defined for all 12 P-modules and 10 F-modules before implementation begins. Super Admin and HO_ADMIN manage this matrix through the Permission Management screen.

### 2.3 Data Scope Enforcement

Permissions are combined with data scope — even if a role has "View" on Student Records, they can only see students within their scope:

| Role | Data Scope |
|------|-----------|
| Super Admin | All SSVMs, all data |
| HO roles | All SSVMs |
| Sambhag roles | Only SSVMs within their Sambhag |
| Bibhag roles | Only SSVMs within their Bibhag |
| Sankula roles | Only SSVMs within their Sankula |
| SSVM_PRINCIPAL / SSVM_OFFICE | Only their own SSVM |
| SSVM_ACHARYA | Only their own SSVM; Student Records scoped to their class |

Scope enforcement is implemented at the query level (all queries include a scope filter derived from the user's session) — not at the UI level only.

### 2.4 Field-Level Access Control

Certain sensitive fields are hidden based on role:

| Field | Visible To |
|-------|-----------|
| Aadhaar Number | Super Admin, HO_ADMIN, SSVM_PRINCIPAL (own staff and students) |
| Bank Account Number | Super Admin, HO_ACCOUNTS |
| Salary / Contribution Rate | Super Admin, HO_ACCOUNTS, SSVM_PRINCIPAL (own staff) |
| Mobile Number of Staff | All roles within the same scope |
| Mobile Number of Student Guardian | SSVM roles (own school), Sankula and above |

Fields are masked in API responses and UI for roles without access.

### 2.5 Temporary Access Grants

Super Admin or HO_ADMIN can grant temporary elevated access:

- Select user, select role/permission set, set start date and end date
- System automatically revokes at end date (midnight)
- All actions under temporary access are tagged in the audit log
- Use case: grant an external auditor read-only access to Accounts module for 5 days

### 2.6 Permission Delegation

A user can delegate specific permissions to a subordinate for a defined period:

- Example: SSVM_PRINCIPAL delegates SSVM_OFFICE the ability to approve leave applications for 10 days while principal is at a training
- Delegation is limited to permissions the delegating user themselves holds
- Delegation is logged and visible to Sankula admin

### 2.7 Access Audit Log

Every resource access (not just data modifications) is logged for security-sensitive modules:

- User ID, Role, Module, Action, Record ID accessed, Timestamp
- Separate from the data change audit log in P-01 (this log captures reads, P-01 captures writes)
- Viewable by Super Admin and HO_ADMIN
- Anomaly detection: flag if a user accesses > 1,000 records in one session (potential data scraping)

### 2.8 Session Management

- Session timeout: 30 minutes of inactivity (configurable per role — SSVM roles may have longer sessions for data entry workflows)
- Concurrent session limit: 1 active session per user (second login invalidates first)
- Force logout: Super Admin can remotely terminate any active session
- Login attempt limit: 5 failed attempts → account locked for 15 minutes; Super Admin notified after 10 failed attempts

### 2.9 User Management

**User Account Lifecycle:**
- Create: Super Admin creates HO users; HO_ADMIN creates Sambhag/Bibhag users; Sankula creates SSVM users
- Each user has: User ID (unique), Full Name, Role, SSVM/Sankula/Bibhag/Sambhag code, Mobile (for SMS OTP), Email, Status (Active/Locked/Inactive)
- Password reset: Self-service via OTP to registered mobile; or forced reset by admin
- Deactivate: User marked inactive; cannot log in but all their records remain

---

## 3. Data Models

### 3.1 Users Table
```
users
├── user_id (UUID, PK)
├── username (unique)
├── full_name
├── role_code (FK → roles)
├── scope_type (ENUM: GLOBAL, SAMBHAG, BIBHAG, SANKULA, SSVM)
├── scope_id (corresponding SSVM/Sankula/Bibhag/Sambhag code)
├── mobile (for OTP)
├── email
├── password_hash
├── status (ENUM: ACTIVE, LOCKED, INACTIVE)
├── last_login_at
├── failed_login_count
└── created_at
```

### 3.2 Roles Table
```
roles
├── role_code (PK, e.g., HO_ACCOUNTS, SSVM_PRINCIPAL)
├── role_name
├── tier (1=SuperAdmin, 2=HO, 3=Sambhag, 4=Bibhag, 5=Sankula, 6=SSVM)
└── description
```

### 3.3 Permissions Table
```
permissions
├── permission_id (UUID, PK)
├── role_code (FK → roles)
├── module_code
├── action (ENUM: VIEW, CREATE, EDIT, DELETE, APPROVE, EXPORT, REPORT)
├── is_granted (BOOL)
└── field_exclusions (JSONB — array of field names excluded from this role)
```

### 3.4 Temporary Access Grants Table
```
temp_access_grants
├── grant_id (UUID, PK)
├── grantee_user_id (FK → users)
├── granted_by_user_id (FK → users)
├── role_code
├── valid_from
├── valid_until
├── is_active (BOOL)
└── created_at
```

### 3.5 Access Audit Log Table
```
access_audit_log
├── log_id (UUID, PK)
├── user_id (FK → users)
├── role_code
├── module_code
├── action
├── record_id (nullable)
├── ip_address
├── timestamp
└── is_temp_access (BOOL)
```

---

## 4. Implementation Plan

### Phase 1 — Core RBAC Engine (Weeks 1–2)
- [ ] Design complete role hierarchy and permission matrix (workshop with stakeholders)
- [ ] Build roles, permissions, and users tables
- [ ] Implement authentication (login, session, JWT or session cookie)
- [ ] Implement permission checking middleware (every API call goes through this)
- [ ] Implement data scope enforcement at query level

### Phase 2 — Field-Level Control & Admin UI (Weeks 2–3)
- [ ] Implement field masking for sensitive fields per role
- [ ] Build User Management screen (create, edit, deactivate, reset password)
- [ ] Build Permission Management screen (Super Admin)
- [ ] Build Role Management screen

### Phase 3 — Temporary Access & Delegation (Week 3–4)
- [ ] Build temporary access grant creation and auto-expiry
- [ ] Build permission delegation workflow
- [ ] Implement session management (timeout, concurrent sessions, force logout)

### Phase 4 — Access Audit & Testing (Weeks 4–5)
- [ ] Build access audit log
- [ ] Implement anomaly detection (high-volume access flag)
- [ ] Security testing: attempt cross-scope data access, privilege escalation, session hijacking
- [ ] Penetration test by QA engineer
- [ ] Build access audit viewer for Super Admin

---

## 5. Acceptance Criteria

- [ ] An SSVM_OFFICE user cannot view another SSVM's data — API returns 403
- [ ] An SSVM_ACHARYA user can only view students in their assigned class
- [ ] Bank Account Number field is masked (***) in API response for all roles except Super Admin and HO_ACCOUNTS
- [ ] Temporary access auto-expires at the set end date — user cannot log in with elevated access after expiry
- [ ] 5 failed login attempts locks the account; Super Admin is notified
- [ ] Force logout by Super Admin terminates the session immediately — further requests with old token return 401

---

## 6. Developer Notes

- This module must be built and tested BEFORE any other module — all other modules depend on it
- Use JWT with short expiry (15 minutes) + refresh tokens for stateless authentication; or use server-side sessions with Redis for simplicity given the user count (~1,500)
- Permission checking must happen at the API level, not just UI — UI permission checks are UX helpers, not security controls
- Data scope filtering should be implemented as a reusable query decorator/middleware — all queries call `applyScope(query, userSession)` — not implemented individually per query
- Never return 404 for scope violations — return 403 to avoid revealing the existence of records outside the user's scope
