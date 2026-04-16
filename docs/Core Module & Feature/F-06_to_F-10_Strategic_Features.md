# F-06 · Pracharak & Karyakarta Network Mapping

**Module Code:** F-06  
**Priority:** 🟡 Medium  
**Estimated Effort:** 3–4 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), Core SSVM master data  

---

## 1. Module Overview

The invisible strength of SVS Odisha is its network of RSS Pracharaks, local Karyakartas, and Samiti members who support each SSVM school — enrolling students, securing donations, resolving local issues, and connecting schools to the Sangh network. This is organisational capital that currently exists in no system. This module maps and tracks this network.

**Sensitivity Note:** This data is for internal organisational use only. Access is strictly controlled. No karyakarta information is visible publicly or to school-level users (only Sankula and above).

---

## 2. Functional Requirements

### 2.1 Karyakarta Directory

**Karyakarta Profile:**
- Full Name
- Role Type: Pracharak / Karyakarta / Samiti President / Samiti Member / Vishwa Hindu Parishad / Other
- Associated SSVMs (one karyakarta can support multiple schools)
- Zila, Sankula, Bibhag, Sambhag
- Mobile (primary contact)
- Email
- Nature of Support: Student Enrolment / Donations / Infrastructure / Community Relations / Administrative
- Engagement Level: Active / Occasional / Inactive
- Notes (relationship history, key contributions)

**Privacy Controls:**
- Only Sankula, Bibhag, Sambhag, and Head Office users can view karyakarta records
- SSVM-level users cannot access this module
- Mobile numbers visible only to Bibhag and above

### 2.2 SSVM Association Map

- Each SSVM has a panel showing associated karyakartas with their roles
- Each karyakarta profile shows all SSVMs they support
- Many-to-many relationship (karyakarta ↔ SSVM)

**Association Details:**
- Date of association start
- Nature of primary support
- Last engagement date (updated manually)

### 2.3 Samiti Membership Records

**Samiti (School Managing Society) Membership:**
- Each SSVM's Samiti may have broader membership beyond the Managing Committee
- General body members: Name, mobile, type (Life Member / Annual Member)
- Contribution history (if applicable)
- Samiti meeting attendance

### 2.4 Engagement and Activity Log

Manual log of karyakarta engagement activities:
- Date, SSVM, type of activity (school visit, community meeting, donor interaction, enrollment drive)
- Outcome notes
- Logged by Sankula or Bibhag admin

### 2.5 Network Intelligence Dashboard (Head Office / Sambhag)

- Karyakarta count by Sambhag, Bibhag, Zila
- SSVMs with no active karyakarta association (organisational risk)
- Karyakarta engagement activity trend (last 6 months)
- Inactive karyakartas (no engagement logged in > 6 months) — for Sambhag to review

---

## 3. Data Models

```
karyakartas
├── karyakarta_id (UUID, PK)
├── full_name
├── role_type (ENUM)
├── mobile (encrypted)
├── email
├── zila_id
├── engagement_level (ENUM: ACTIVE, OCCASIONAL, INACTIVE)
├── notes (TEXT)
└── added_by_user_id

karyakarta_ssvm_associations
├── association_id (UUID, PK)
├── karyakarta_id (FK)
├── ssvm_code
├── nature_of_support (JSONB — array of support types)
├── associated_from
├── last_engagement_date (nullable)
└── is_active (BOOL)

karyakarta_activity_log
├── log_id (UUID, PK)
├── karyakarta_id (FK)
├── ssvm_code
├── activity_date
├── activity_type
├── outcome_notes (TEXT)
└── logged_by_user_id
```

---

## 4. Implementation Plan

- **Week 1–2:** Karyakarta directory CRUD, SSVM association management, access control (Sankula+ only)
- **Week 2–3:** Samiti membership records, engagement log
- **Week 3–4:** Network intelligence dashboard, SSVMs-without-karyakarta report

---

## 5. Acceptance Criteria

- [ ] SSVM-level users cannot access the Karyakarta module (403 returned)
- [ ] A karyakarta associated with 3 SSVMs appears in all 3 schools' karyakarta panels
- [ ] SSVMs without any active karyakarta association appear in the risk report
- [ ] Mobile numbers are masked for Sankula users; visible fully to Bibhag and above

---

---

# F-07 · Scholarships, Concessions & Samajik Sahayta Tracker

**Module Code:** F-07  
**Priority:** 🔴 High  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), Student Records, Accounts Module, P-09 (Alumni — donor link)  

---

## 1. Module Overview

SVS schools serve a significant tribal, rural, and EWS (Economically Weaker Section) population across Odisha's 31 districts. Fee concessions, scholarships, Samajik Sahayta (social assistance) cases, and donor-linked sponsorships are managed informally. This module provides a dedicated, structured tracker for all student welfare financial support.

---

## 2. Functional Requirements

### 2.1 Concession Registry

**Fee Concession Types (configurable by Head Office):**
- Full Fee Waiver
- 50% Concession
- EWS Concession (Government notified)
- SC/ST Concession
- Staff Ward Concession (children of Sevabrati)
- Orphan/Single Parent Concession
- Meritorious Student Concession

**Concession Record (per student):**
- Student ID (linked from Establishment module)
- Concession Type
- Academic Year(s) applicable
- Concession amount or percentage
- Approved by (Head Office / SSVM Principal)
- Supporting document (income certificate, category certificate)
- Status: Active / Expired / Withdrawn

**Reports:**
- Concession-wise student count and total value waived
- SSVM-wise concession total (financial impact report)

### 2.2 Multi-Source Scholarship Tracker

Scholarships come from multiple sources:

| Source | Examples |
|--------|---------|
| State Government | Pre-matric, Post-matric SC/ST scholarships |
| Central Government | NSP scholarships, Central Sector Scholarship |
| Vidya Bharati | National scholarship for meritorious students |
| Private Donors | Individual donor-linked sponsorships |
| Foundations | Corporate CSR scholarships |

**Scholarship Record:**
- Student ID
- Scholarship Name and Source
- Amount (per month or per year)
- Academic Year
- Application Status: Applied / Approved / Disbursed / Rejected
- Disbursement mode (direct bank transfer / through SSVM)
- Evidence of disbursement (upload)

**Application Assistance:**
- SSVM can create scholarship applications on behalf of students for government schemes
- System tracks application reference number and status

### 2.3 Samajik Sahayta (Social Assistance) Cases

For students facing acute social difficulties beyond fee concessions:

**Case Record:**
- Student ID, class
- Nature of hardship: Family tragedy / Natural disaster / Acute illness / Other
- Description (free text)
- Assistance requested: Books / Uniform / Meal support / Transport / Cash assistance
- Assistance provided (SSVM provides from local resources or escalates to Sankula/Head Office)
- Case status: Open / Resolved / Escalated
- Escalation level if escalated

### 2.4 Donor-Linked Sponsorships

Linking specific donors (from F-09 Donor CRM) to specific student beneficiaries:

- Donor selects: General support OR specific student support
- If specific student: donor linked to student record; student's academic progress shared with donor (with SSVM's consent)
- Sponsorship amount and duration (1 year / 3 years / until passing out)
- Beneficiary outcome: Did the sponsored student complete their schooling? What did they do after?

**Donor Impact Report:**
- Per donor: which students they sponsored, current class/status, outcomes
- Used for donor retention and 80G receipt generation (linked to F-09)

### 2.5 Tribal and EWS Beneficiary Reports (Head Office)

- Total beneficiaries by category (SC/ST/OBC/EWS/Tribal) across the network
- Total scholarship value disbursed by source
- Samajik Sahayta cases by SSVM, Sambhag
- Coverage report: % of eligible tribal/EWS students receiving at least one form of support

---

## 3. Data Models

```
student_concessions
├── concession_id (UUID, PK)
├── student_id (FK → students)
├── ssvm_code
├── concession_type
├── academic_year
├── amount_or_percentage
├── status (ENUM: ACTIVE, EXPIRED, WITHDRAWN)
├── approved_by_user_id
└── supporting_doc_url (nullable)

scholarships
├── scholarship_id (UUID, PK)
├── student_id (FK)
├── ssvm_code
├── scholarship_name
├── source (ENUM: STATE_GOVT, CENTRAL_GOVT, VB, PRIVATE, FOUNDATION)
├── amount
├── academic_year
├── status (ENUM: APPLIED, APPROVED, DISBURSED, REJECTED)
├── application_reference (nullable)
└── disbursement_evidence_url (nullable)

samajik_sahayta_cases
├── case_id (UUID, PK)
├── student_id (FK)
├── ssvm_code
├── nature_of_hardship
├── description (TEXT)
├── assistance_type (JSONB — array of assistance types)
├── status (ENUM: OPEN, RESOLVED, ESCALATED)
└── opened_at

donor_sponsorships
├── sponsorship_id (UUID, PK)
├── donor_id (FK → donors — from F-09)
├── student_id (FK → students)
├── ssvm_code
├── amount_per_year
├── start_academic_year
├── end_academic_year (nullable)
└── status (ENUM: ACTIVE, COMPLETED, CANCELLED)
```

---

## 4. Implementation Plan

- **Weeks 1–2:** Concession registry, concession reports
- **Weeks 2–3:** Multi-source scholarship tracker, application assistance flow
- **Weeks 3–4:** Samajik Sahayta cases, donor sponsorship linking
- **Week 5:** Tribal/EWS beneficiary reports, testing

---

## 5. Acceptance Criteria

- [ ] A concession record created for a student reduces their effective fee in the Sahajoga Rasi fee calculation
- [ ] A government scholarship application tracked with reference number; on status change to "Disbursed", the student record reflects the disbursement
- [ ] A Samajik Sahayta case escalated to Head Office appears in the Head Office service desk (P-04)
- [ ] Donor sponsorship linked to a student; donor impact report shows the student's current class

---

---

# F-08 · School Affiliation & Recognition Compliance Tracker

**Module Code:** F-08  
**Priority:** 🔴 Critical  
**Estimated Effort:** 3–4 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), P-01 (Compliance), P-04 (Notifications), F-05 (Committee Governance)  

---

## 1. Module Overview

Every SSVM operates under a complex web of legal compliance documents — state board recognition, NOC approvals, land records, building safety certificates, fire NOCs, society registration, and more — each with its own expiry and renewal cycle. A single lapsed affiliation can disrupt education for hundreds of students and expose the school to legal action.

This module maintains a document compliance register for every SSVM and monitors expiry dates across the entire 800–1,000 school network, escalating renewal alerts before deadlines are missed.

---

## 2. Functional Requirements

### 2.1 Document Register (per SSVM)

**Document Types (configurable master list):**
- State Board Recognition (class-wise: Primary / Middle / Secondary / Higher Secondary)
- No Objection Certificate (NOC) — state education department
- Land Record / Patta
- Building Safety Certificate
- Fire NOC
- Society Registration Certificate
- FCRA Registration (if receiving foreign donations)
- IT Registration (80G, 12A)
- Managing Committee Registration (linked to F-05)
- Annual Inspection Report (from F-04)
- Minority Status Certificate (if applicable)

**Per Document Record:**
- Document Type
- Issuing Authority
- Document Number
- Issue Date
- Expiry Date (null if permanent)
- Renewal Lead Time (days before expiry to start renewal alert — configurable per document type)
- Document File (uploaded PDF)
- Status: Valid / Expiring Soon / Expired / Renewal Pending / Renewed

### 2.2 Expiry Monitoring and Escalation Alerts

Background scheduler checks all document expiry dates daily:

**Alert Schedule (configurable per document type):**
| Time Before Expiry | Alert To |
|-------------------|---------|
| Renewal Lead Time | SSVM Principal (set per doc type, e.g., 90 days for board recognition) |
| 60 days | SSVM + Sankula |
| 30 days | SSVM + Sankula + Bibhag |
| 15 days | All above + Sambhag |
| 7 days | All above + Head Office |
| 1 day | All levels + Head Office (URGENT) |
| Expired | All levels; Document marked Expired; P-01 compliance flag raised |

### 2.3 Renewal Tracking

When a document is approaching expiry, SSVM initiates the renewal process:

**Renewal Workflow:**
1. SSVM marks: "Renewal Application Submitted" (date + reference number)
2. SSVM uploads renewed document when received
3. System updates document expiry date from the new document
4. Status changes to "Valid"; previous record archived

**Renewal Status Visible To:** Sankula, Bibhag, Sambhag, Head Office

### 2.4 Network Compliance Dashboard (Head Office)

- Document compliance by SSVM: count of Valid / Expiring Soon / Expired documents
- SSVM-level compliance score: % of documents currently valid
- Critical alerts: SSVMs with at least one expired critical document (board recognition, society registration)
- Heat map: SSVM compliance status across Odisha (similar to F-04 but for documents)
- Export: Compliance report for legal/Vidya Bharati national submission

### 2.5 SSVM Document Panel

SSVM sees all their documents in one panel:
- Current status, expiry date, days remaining (colour coded: green/yellow/red)
- Download their own documents
- Upload updated documents

---

## 3. Data Models

```
ssvm_documents
├── document_id (UUID, PK)
├── ssvm_code
├── document_type_id (FK → document_types)
├── issuing_authority
├── document_number
├── issue_date
├── expiry_date (nullable — null if permanent)
├── file_url
├── status (ENUM: VALID, EXPIRING_SOON, EXPIRED, RENEWAL_PENDING, RENEWED)
├── renewal_lead_time_days
├── is_current_version (BOOL)
├── previous_document_id (nullable FK — for version history)
└── uploaded_by_user_id

document_types
├── document_type_id (UUID, PK)
├── document_name
├── is_mandatory (BOOL)
├── is_critical (BOOL — critical docs affect compliance score heavily)
├── default_renewal_lead_time_days
└── description
```

---

## 4. Implementation Plan

- **Weeks 1–2:** Document register (CRUD), document types management, file upload
- **Weeks 2–3:** Expiry monitoring scheduler, alert delivery, escalation chain
- **Weeks 3–4:** Network compliance dashboard, heat map, SSVM document panel
- **Testing:** Test alert trigger, test renewal workflow, test compliance score calculation

---

## 5. Acceptance Criteria

- [ ] An SSVM's board recognition document with expiry 30 days from today triggers alerts to SSVM, Sankula, and Bibhag
- [ ] When SSVM uploads the renewed document, status changes to "Valid" and old document is archived
- [ ] Expired critical document raises a P-01 compliance flag and appears in the Head Office network compliance dashboard
- [ ] SSVM document panel shows all documents with days remaining, colour-coded correctly

---

---

# F-09 · Donor & Damdatri Relationship Management (CRM)

**Module Code:** F-09  
**Priority:** 🔴 High  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), Accounts Module (donation payments), F-07 (Sponsorships)  

---

## 1. Module Overview

SVS schools are substantially funded through Sebasamarpan, donations, and deep relationships with local Damdatris (philanthropists). The existing donation screen captures transactions but has no relationship intelligence — no donor profiles, no 80G automation, no pledge tracking, and no renewal cycle management.

This module transforms one-time donation recording into a **full Damdatri Relationship Management system** — the CRM that ensures sustained donor relationships, automated receipting, and donor engagement intelligence.

---

## 2. Functional Requirements

### 2.1 Donor Profile

**Donor Types:** Individual / Corporate / NRI / Trust / Foundation / Alumni (linked to P-09)

**Donor Profile Fields:**
- Donor ID (auto-generated)
- Full Name / Organisation Name
- Type
- PAN Number (mandatory for 80G receipt above ₹2,000)
- Mobile, Email
- Address
- Associated SSVM(s) (which schools they have donated to)
- First donation date
- Relationship owner (which Sambhag/Sankula admin manages this relationship)
- Notes (free text — key relationship context)
- Preferred Communication: SMS / Email / WhatsApp / Post

### 2.2 Giving History

- All donations linked to the donor profile (from the Accounts module donation payment screen)
- Each donation: Date, Amount, Purpose, Mode, Receipt generated (Y/N)
- Total lifetime giving
- Giving trend (annual bar chart)
- Last donation date and days since last donation

### 2.3 80G Receipt Generation

**Automated 80G Receipt:**
- On donation entry and confirmation, system auto-generates a PDF receipt with:
  - Receipt number (sequential, with prefix configurable e.g., SVS-2025-0001)
  - Donor name, PAN, address
  - Donation amount (in figures and words)
  - Purpose of donation
  - Organisation 80G registration number and validity
  - Authorised signatory name and digital signature
  - Date
- Receipt emailed automatically to donor's registered email
- Receipt stored in donor profile
- Annual giving summary generated in April (for income tax filing)

### 2.4 Pledge and Campaign Tracking

**Pledge:**
- Donor commits to give ₹X per year / per month for Y years
- Pledge reminder: 30 days before pledge due date → automated reminder to donor (SMS/email) + relationship owner
- Pledge fulfilled / unfulfilled tracking
- Pledge balance: total pledged vs. total received

**Campaign:**
- Head Office or Sambhag creates a fundraising campaign (e.g., "Nabakalabara Library Fund 2025-26")
- Each donation can be tagged to a campaign
- Campaign progress: target vs. received
- Campaign-wise donor list

### 2.5 Renewal and Engagement Reminders

For each donor:
- Days since last donation displayed
- Lapsed donors (no donation in > 1 year): flagged for relationship owner's outreach
- Renewal reminder: on approaching anniversary of last donation (configurable trigger), relationship owner receives an internal reminder to reach out
- Personalised acknowledgement: system drafts a thank-you message for the relationship owner to review and send

### 2.6 Donor Segmentation and Reports

**Segmentation Tags (configurable):**
- Patron (lifetime giving > ₹1 lakh)
- Regular (giving every year for 3+ years)
- Lapsed (no donation in > 1 year)
- New (first donation this year)
- Pledge Active

**Reports:**
- Donor-wise giving summary
- SSVM-wise donation total
- Campaign progress report
- Lapsed donor list (for outreach)
- Annual 80G statement per donor (for their tax filing)
- Total donations by source type (individual / corporate / NRI)

---

## 3. Data Models

```
donors
├── donor_id (UUID, PK)
├── donor_type (ENUM: INDIVIDUAL, CORPORATE, NRI, TRUST, FOUNDATION, ALUMNI)
├── full_name
├── organisation_name (nullable)
├── pan_number (encrypted)
├── mobile
├── email
├── address
├── relationship_owner_user_id (FK → users)
├── preferred_comm (ENUM)
├── notes (TEXT)
├── tags (JSONB — array of segmentation tags)
└── created_at

donations
├── donation_id (UUID, PK)
├── donor_id (FK → donors)
├── ssvm_code (nullable — which school the donation benefits)
├── campaign_id (nullable FK)
├── amount
├── purpose
├── payment_mode
├── payment_reference
├── receipt_number (nullable — assigned on confirmation)
├── receipt_url (nullable)
├── donated_at
└── is_80g_eligible (BOOL)

pledges
├── pledge_id (UUID, PK)
├── donor_id (FK)
├── total_pledge_amount
├── frequency (ENUM: ONE_TIME, MONTHLY, ANNUAL)
├── start_date
├── end_date (nullable)
├── status (ENUM: ACTIVE, FULFILLED, LAPSED, CANCELLED)
└── created_at

fundraising_campaigns
├── campaign_id (UUID, PK)
├── campaign_name
├── purpose
├── target_amount
├── start_date
├── end_date
├── ssvm_code (nullable — if school-specific)
├── status (ENUM: ACTIVE, CLOSED, CANCELLED)
└── created_by
```

---

## 4. Implementation Plan

- **Weeks 1–2:** Donor profile management, link existing donations to donor profiles
- **Weeks 2–3:** 80G receipt auto-generation, annual giving summary
- **Weeks 3–4:** Pledge and campaign tracking, renewal reminders
- **Week 5:** Segmentation, reports, testing

---

## 5. Acceptance Criteria

- [ ] A donation recorded in the Accounts module creates/links to a donor profile automatically
- [ ] 80G receipt PDF generated within 60 seconds of donation confirmation, emailed to donor
- [ ] A pledge with annual frequency sends a reminder to the relationship owner 30 days before due date
- [ ] Lapsed donor list correctly shows donors with no donation in > 12 months
- [ ] Annual giving summary PDF generated per donor for the last financial year

---

---

# F-10 · Pradeshik & Akhil Bharatiya Event Management Hub

**Module Code:** F-10  
**Priority:** 🟡 Medium  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), P-04 (Notifications), P-05 (Staff for duty assignments), F-02 (Cultural Calendar)  

---

## 1. Module Overview

SVS Odisha participates in large-scale events unique to the Vidya Bharati ecosystem — Pradeshik Khelkud Samaroha (State Sports Meet), Akhil Bharatiya Shikshak Prashikshan Shivirs (National Teacher Training Camps), Vidya Bharati Sammelans, Saraswati Vandana programmes, and Rashtriya Bal Sansad Mahotsavs. These events involve hundreds of delegates from 800+ schools, travel and accommodation coordination, and significant event budgets — all currently managed through WhatsApp and spreadsheets.

---

## 2. Functional Requirements

### 2.1 Event Creation and Management

**Create Event (Head Office):**
- Event Name, Type (Sports Meet / Shivir / Sammelan / Cultural / Other)
- Level: Sambhag / Pradeshik / Akhil Bharatiya
- Dates and Venue
- Description
- Participant Eligibility: criteria for who can be nominated (class, age group, designation, gender)
- Registration Deadline
- Delegate Capacity (max per SSVM / total)
- Budget (initial estimate)

**Event Lifecycle Stages:**
Announced → Registration Open → Registration Closed → Ongoing → Concluded → Report Submitted

### 2.2 Multi-School Delegate Registration

**Nomination Process (SSVM/Sankula):**
- SSVM nominates delegates for the event from their student/staff list
- Fields per delegate: Name, DOB (for age verification), Designation/Class, Photo, Emergency Contact
- System validates eligibility criteria (age group, class, gender)
- SSVM submits nominations before deadline

**Head Office Confirmation:**
- Reviews nominations across all SSVMs
- Confirms, waitlists, or rejects individual delegates
- Sends confirmation to SSVMs

### 2.3 Travel and Accommodation Coordination

**Travel:**
- SSVM submits travel plan for their delegation: mode, departure point, estimated arrival
- Head Office/coordinator records assigned transport (if centrally arranged)
- Consolidated travel plan: all SSVMs, all modes, arrival timeline

**Accommodation:**
- Accommodation blocks created by coordinator: Block Name, Capacity, Type (dormitory/room)
- Delegates allocated to accommodation blocks
- Allocation visible to SSVM (which block their delegation is assigned to)

### 2.4 Budget and Expense Tracking

**Event Budget:**
- Initial budget entered by Head Office
- Budget categories: Venue, Food, Transport, Materials, Accommodation, Prizes, Miscellaneous
- Actual expenses recorded against categories
- Budget vs. Actual dashboard
- Expense approval workflow (expenses above threshold require Head Office approval)

### 2.5 Identity Cards and Badges

**Badge Generation:**
- For each confirmed delegate: Identity card / Badge PDF generated
- Badge includes: Delegate name, SSVM, event name, photo, unique QR code (links to delegate record)
- Batch download: all badges for an SSVM as a single PDF
- On-site check-in: QR code scanned at event venue for attendance

### 2.6 Post-Event Report

After event concludes:
- Results entry (for sports/competitions): rank, scores per category
- Participation summary: total delegates, SSVM-wise, Sambhag-wise
- Budget closure: final expenses, surplus/deficit
- Highlights and photos upload
- Post-event report PDF generated for Head Office and Vidya Bharati national submission

---

## 3. Data Models

```
events
├── event_id (UUID, PK)
├── event_name
├── event_type (ENUM)
├── level (ENUM: SAMBHAG, PRADESHIK, AKHIL_BHARATIYA)
├── start_date
├── end_date
├── venue
├── eligibility_criteria (JSONB)
├── registration_deadline
├── delegate_capacity_total
├── delegate_capacity_per_ssvm (nullable)
├── budget_estimate
├── status (ENUM: ANNOUNCED, REG_OPEN, REG_CLOSED, ONGOING, CONCLUDED)
└── created_by

event_delegates
├── delegate_id (UUID, PK)
├── event_id (FK)
├── ssvm_code
├── person_type (ENUM: STUDENT, SEVABRATI)
├── person_id (FK to student or sevabrati)
├── full_name
├── designation_or_class
├── photo_url
├── status (ENUM: NOMINATED, CONFIRMED, WAITLISTED, REJECTED, ATTENDED, ABSENT)
├── badge_url (nullable)
├── accommodation_block (nullable)
└── nominated_at

event_expenses
├── expense_id (UUID, PK)
├── event_id (FK)
├── category
├── description
├── amount
├── approved_by (nullable)
└── recorded_at
```

---

## 4. Implementation Plan

- **Weeks 1–2:** Event creation, eligibility validation, delegate nomination and confirmation
- **Weeks 2–3:** Travel/accommodation coordination, budget tracking
- **Weeks 3–4:** Badge/identity card generation with QR, on-site check-in
- **Week 5:** Post-event report, results entry, testing

---

## 5. Acceptance Criteria

- [ ] SSVM nominates delegates; system blocks nominations for delegates who don't meet eligibility criteria
- [ ] Confirmed delegates have badge PDFs auto-generated with their photo and QR code
- [ ] Budget vs. Actual dashboard shows correct figures after expenses are entered
- [ ] Post-event report PDF includes participation summary, results, and budget closure

---

## 6. Developer Notes (F-10)

- Badge generation with photos requires a server-side PDF/image composition library (e.g., Puppeteer, html2pdf with embedded base64 photos)
- QR code on badge: encode the delegate_id; scanning links to a read-only delegate detail page (no login required for on-site verification)
- For Akhil Bharatiya events, the event may be managed by VB national — integrate with F-01 to receive event details automatically from the national portal
