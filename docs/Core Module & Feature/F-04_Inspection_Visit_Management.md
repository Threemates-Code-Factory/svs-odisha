# F-04 · Sambhag & Bibhag Inspection & Visit Management

**Module Code:** F-04  
**Priority:** 🔴 High  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), P-04 (Notifications), P-01 (Compliance)  

---

## 1. Module Overview

Bibhag Nirikshayaks (Division Inspectors) and Sambhag Sanjojaks (Regional Coordinators) are responsible for physically inspecting SSVM schools within their jurisdiction. These visits assess infrastructure quality, staff deployment, student strength accuracy, Sanskar programme health, and overall school management. Currently, visit scheduling happens informally and findings are recorded on paper or in personal notebooks — with no systematic follow-up, no consolidated analysis, and no heat map for Head Office.

This module provides a **Structured Inspection and Visit Management System** with digital checklists, graded reports, follow-up tracking, and a real-time compliance heat map for Head Office.

---

## 2. Functional Requirements

### 2.1 Visit Planning and Scheduling

**Schedule a Visit (Bibhag Nirikshayak / Sambhag Sanjojak):**
- Select SSVM from their jurisdiction
- Visit Date
- Visit Type: Routine Inspection / Follow-up Visit / Surprise Inspection / Special Purpose
- Inspectors: self (default) + additional inspectors (optional)
- Purpose notes

**SSVM Notification:**
- For Routine / Special visits: SSVM Principal notified 3 days in advance via in-app + SMS
- For Surprise visits: no advance notification

**Calendar View:**
- Inspector's personal visit calendar for the month
- Head Office sees all visits across all Sambhags
- Sambhag admin sees all visits within their Sambhag

### 2.2 Digital Inspection Checklist

Head Office defines inspection checklist templates. Each checklist has sections and items:

**Default Checklist Template (SVS Odisha Standard):**

**Section 1: Infrastructure**
- Classrooms: count, condition (1–5 scale), adequate for student strength?
- Drinking water facility: available / not available
- Toilet facilities: boys (count, condition), girls (count, condition)
- Library: available, books count (approx)
- Sports ground: available, usable area (sq ft approx)
- Office room: available, condition
- Notice board: present and updated?

**Section 2: Staff**
- Principal present on visit: Yes / No
- All Sevabrati present vs. roll: count present, count on roll, absent with leave, absent without leave
- Qualification certificates verified: Yes / Partial / No
- Any vacancy unfilled > 30 days: Yes / No (detail if Yes)

**Section 3: Students**
- Actual students present vs. roll: count (spot check on a random class)
- Admission register verified: Yes / Partial / No
- Uniform compliance: % observed wearing uniform
- Student conduct: Excellent / Good / Fair / Poor

**Section 4: Academics**
- Syllabus coverage (% of curriculum covered for the term)
- Examination records verified: Yes / Partial / No
- Last exam results: noted

**Section 5: Sanskar Activities**
- Prarthana Sabha conducted: Daily / Irregular / Never
- Bal Sansad: Constituted / Not Constituted
- Rashtriya Parvas celebrated (last quarter): All / Some / None
- Sanskar Kendra activity: Active / Inactive

**Section 6: Accounts**
- Fee registers available and updated: Yes / Partial / No
- AKP/SAATF contribution current: Yes / Arrears (months)
- Donation receipts maintained: Yes / No

**Section 7: Overall Assessment**
- Overall Grade: A (Excellent) / B (Good) / C (Satisfactory) / D (Needs Improvement) / E (Critical)
- Commendations (text)
- Observations (text)
- Action Required (text)

Head Office can edit the default template or create additional templates for specific visit types.

### 2.3 Visit Report Generation

After completing the inspection:
- Inspector finalises and submits the inspection report (cannot edit after submission)
- Report auto-sent to: SSVM Principal, Sankula Admin, Sambhag Admin (scoped to their level)
- Head Office receives all reports
- Report PDF generated (branded SVS Odisha format) — downloadable by all authorised levels

**Report PDF Contains:**
- SSVM name, code, address, Sambhag, Bibhag, Sankula
- Visit date, type, inspector name(s)
- All checklist responses
- Overall Grade and narrative sections
- Inspector's digital signature

### 2.4 Follow-Up Action Tracking

After a visit report is submitted:
- Observations requiring action are extracted as **Action Items**
- Each Action Item: Description, Responsible party (SSVM / Sankula / Head Office), Due Date
- SSVM Principal must mark each Action Item as: Completed / In Progress / Cannot Complete (with reason)
- Sankula and Bibhag can verify completion (accept or reject with note)
- Overdue Action Items trigger escalation alerts (via P-12 engine)

**Action Item Dashboard:**
- All open action items across the network
- Filter by: SSVM, Sambhag, Due Date, Overdue Status
- % Completion by Sambhag

### 2.5 Compliance Heat Map (Head Office)

A real-time state-level heat map of SSVM inspection status and compliance:

- **Color coding per SSVM:**
  - 🟢 Green: Last inspection < 6 months ago, Overall Grade A or B, all action items resolved
  - 🟡 Yellow: Last inspection 6–12 months ago, OR Grade C, OR open action items
  - 🔴 Red: Last inspection > 12 months ago, OR Grade D/E, OR overdue action items
  - ⚪ Grey: Never inspected

- Filter by: Sambhag, Bibhag, Grade, Last Visit Age
- Click an SSVM: see all past inspection reports and open action items
- Export: Heat map data as Excel for Head Office reporting

### 2.6 Visit History per SSVM

Each SSVM has a complete visit history:
- List of all past visits with date, type, inspector, overall grade
- Grade trend chart (over last 5 visits)
- All action items: resolved vs. open

---

## 3. Data Models

### 3.1 Visits Table
```
inspection_visits
├── visit_id (UUID, PK)
├── ssvm_code
├── visit_date
├── visit_type (ENUM: ROUTINE, FOLLOW_UP, SURPRISE, SPECIAL)
├── inspector_user_ids (JSONB — array of user IDs)
├── checklist_template_id (FK)
├── status (ENUM: SCHEDULED, IN_PROGRESS, SUBMITTED, CANCELLED)
├── overall_grade (ENUM: A, B, C, D, E, nullable)
├── report_url (nullable)
└── scheduled_by_user_id
```

### 3.2 Inspection Responses Table
```
inspection_responses
├── response_id (UUID, PK)
├── visit_id (FK → inspection_visits)
├── checklist_item_id (FK → checklist_items)
├── response_value (TEXT — numeric score, yes/no, or free text depending on item type)
└── notes (nullable TEXT)
```

### 3.3 Action Items Table
```
inspection_action_items
├── action_id (UUID, PK)
├── visit_id (FK → inspection_visits)
├── ssvm_code
├── description (TEXT)
├── responsible_party (ENUM: SSVM, SANKULA, HEAD_OFFICE)
├── due_date
├── status (ENUM: OPEN, IN_PROGRESS, COMPLETED, VERIFIED, CANNOT_COMPLETE)
├── completion_notes (nullable)
├── verified_by_user_id (nullable)
└── created_at
```

### 3.4 Checklist Templates Table
```
inspection_checklist_templates
├── template_id (UUID, PK)
├── template_name
├── visit_type (nullable — if specific to a visit type)
├── is_default (BOOL)
├── is_active (BOOL)
└── created_by
```

### 3.5 Checklist Items Table
```
checklist_items
├── item_id (UUID, PK)
├── template_id (FK)
├── section_name
├── item_code
├── item_text
├── response_type (ENUM: SCALE_1_5, YES_NO, TEXT, COUNT, PERCENTAGE, ENUM_LIST)
├── enum_options (JSONB, nullable — for ENUM_LIST type)
├── is_mandatory (BOOL)
└── sort_order (INT)
```

---

## 4. Implementation Plan

### Phase 1 — Visit Scheduling & Checklist (Weeks 1–2)
- [ ] Build inspection checklist template management (Head Office)
- [ ] Build visit scheduling form and calendar
- [ ] Implement advance notification for routine visits
- [ ] Build mobile-optimised checklist fill interface (Nirikshayak fills on phone during visit)

### Phase 2 — Report Generation & Action Items (Weeks 2–3)
- [ ] Build inspection report PDF generation with all checklist responses and narrative
- [ ] Implement report submission with signature
- [ ] Build action item extraction and assignment
- [ ] Build action item dashboard with overdue alerts

### Phase 3 — Heat Map & History (Weeks 3–4)
- [ ] Build compliance heat map (SVG Odisha map with SSVM pin colour coding)
- [ ] Build SSVM visit history with grade trend chart
- [ ] Build Head Office analytics (grade distribution, inspection frequency report)

### Phase 4 — Testing (Week 5)
- [ ] Test full visit lifecycle: schedule → checklist fill → submit → action items created → SSVM marks complete → Sankula verifies
- [ ] Test heat map colour coding logic across all conditions
- [ ] Test surprise visit (no notification sent)

---

## 5. Acceptance Criteria

- [ ] Inspector fills and submits a checklist; report PDF is generated and distributed to SSVM, Sankula, and Sambhag within 5 minutes
- [ ] Action items created from visit observations; SSVM marks one complete; Sankula verifies it; item status changes to "Verified"
- [ ] An SSVM not inspected for > 12 months appears as 🔴 Red on the heat map
- [ ] Overdue action items (past due date) trigger an escalation alert to the Sankula admin

---

## 6. Developer Notes

- The checklist fill interface must be **mobile-first** — inspectors fill it on a phone during the physical visit; make it work on 4G with graceful offline support (save draft locally if internet drops during the visit, sync when back online)
- Grade trend chart: a simple line chart showing last 5 visit grades per SSVM — use a lightweight chart library
- Heat map: use an SVG map of Odisha with Bibhag/district polygons; each SSVM is a dot on the district. Do not use Google Maps (cost); use a free SVG map with district boundaries
- Action item "Cannot Complete" status must require a reason and escalates automatically to Sankula for decision
