# P-08 · Teacher Training Management System (TTMS)

**Module Code:** P-08  
**Priority:** 🟡 High  
**Estimated Effort:** 5–6 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-05 (Staff Profiles), P-11 (RBAC), P-04 (Notifications), Certificate Generation  

---

## 1. Module Overview

The current Prasikshyana Sulka module only records fee payment for training registration. It does not manage any aspect of the training lifecycle — no calendar, no enrollment management, no attendance, no certification, no competency tracking, and no impact analysis.

This module builds a **complete Teacher Training Management System (TTMS)** covering the full lifecycle from training program creation to post-training impact measurement.

---

## 2. Functional Requirements

### 2.1 Training Catalogue

Head Office manages a catalogue of all training programs offered:

**Programme Entry Fields:**
- Programme Code (auto-generated)
- Programme Title
- Programme Type: Orientation / Subject Training / Leadership / Sanskar / Technology / Compliance / Other
- Organiser Level: Head Office / Pradeshik (Sambhag) / Bibhag / External
- Mode: In-Person / Online / Hybrid
- Duration (days)
- Capacity (max participants)
- Eligibility: Designation filter (e.g., Acharya only) / Service years requirement / Subject requirement
- Mandatory (Y/N): If Yes, required for all eligible staff by a specified deadline
- Trainer(s): Internal or external trainer details
- Venue (for in-person)
- Fee (₹, if any — fed into Prasikshyana Sulka accounts module)
- Description and objectives (rich text)
- Attachments: Pre-reading materials, agenda PDF

### 2.2 Training Calendar

A shared, hierarchical calendar visible to all users:

- Head Office can see all programmes
- Sambhag can see programmes in their scope + Pradeshik
- SSVM can see programmes open for their staff

**Calendar View:**
- Monthly/list toggle
- Filter by Programme Type, Mode, Eligibility
- Click on event to see details and enrollment status

### 2.3 Enrollment Management

**Enrollment Process (SSVM/Sevabrati):**
1. SSVM identifies eligible staff for a training
2. SSVM submits nominations (can nominate one or more staff) before the registration deadline
3. If fee required: nomination triggers fee payment workflow (linked to Prasikshyana Sulka accounts)
4. Head Office / Bibhag reviews nominations and confirms/waitlists/rejects
5. Confirmed staff receive in-app + SMS notification with programme details

**Enrollment Rules:**
- System enforces capacity: nominations beyond capacity go to waitlist
- System checks eligibility: if a nominated Sevabrati doesn't meet criteria, error shown
- System checks mandatory training compliance: flags staff who are overdue for mandatory training

**Nomination Form (SSVM):**
- Select Programme
- Select Sevabrati(s) from SSVM staff list (shows designation, subject, eligible flag)
- Notes (why this staff?)
- Submit

### 2.4 Attendance Tracking

**During Training:**
- Designated coordinator (at training venue) marks daily attendance
- Attendance entry: select programme, day, mark each participant as Present/Absent/Late
- Partial attendance tracked for multi-day programmes
- Minimum attendance threshold configurable per programme (e.g., 80%) — below this, certificate not issued

### 2.5 Assessment and Certification

**Assessment (optional, per programme):**
- Programme can have a post-training assessment: MCQ or short answer
- Questions entered by Head Office in the system
- Participants take the assessment online (within the platform)
- Score auto-computed for MCQ; manual scoring for short answers
- Pass threshold configurable per programme

**Digital Certificate:**
- Issued to participants who: (a) meet attendance threshold AND (b) pass assessment (if required)
- Certificate generated as PDF with: Sevabrati name, programme name, duration, dates, issuing authority, digital seal
- Certificate stored in Sevabrati profile under Training History
- Certificate has a unique verification code — anyone can verify at /certificates/verify/:code

### 2.6 Mandatory Training Compliance Tracking

- Each mandatory programme has an applicable Designation and a Compliance Deadline
- System tracks, per Sevabrati, which mandatory programmes they have completed and which are overdue
- Compliance dashboard:
  - Network-wide compliance % per mandatory programme
  - SSVM-wise compliance status
  - List of non-compliant staff with their immediate supervisor (Principal/Sankula)
- Non-compliance alerts sent to SSVM Principal and Sankula at configurable intervals before deadline

### 2.7 Trainer Management

**Trainer Profile:**
- Name, designation, organisation (internal or external)
- Subject specialisation
- Contact details
- Previous programmes conducted at SVS (history)
- Rating from post-training feedback (see below)

### 2.8 Post-Training Feedback

After programme completion, participants receive a feedback survey (5 questions, 1–5 scale + open text):
1. Relevance of content to classroom practice
2. Trainer's effectiveness
3. Organisation and logistics
4. Overall rating
5. What will you apply from this training?

Feedback responses aggregated in a programme-level report for Head Office.

### 2.9 Impact Analysis

**Metric:** Compare student outcome data (exam results, attendance, etc.) for classes taught by trained vs. untrained staff for the same subject and class level, with a 6-month lag.

- Impact Dashboard: By programme type, show average delta in student outcomes
- Note: This is an indicative correlation measure, not a causal claim — display with appropriate caveats
- Head Office can export impact data for grant reporting and Vidya Bharati national submissions

---

## 3. Data Models

### 3.1 Training Programmes Table
```
training_programmes
├── programme_id (UUID, PK)
├── programme_code
├── title
├── programme_type (ENUM)
├── organiser_level (ENUM)
├── mode (ENUM: IN_PERSON, ONLINE, HYBRID)
├── duration_days
├── capacity
├── eligibility_rules (JSONB)
├── is_mandatory (BOOL)
├── mandatory_deadline (nullable date)
├── fee_amount
├── start_date
├── end_date
├── venue
├── status (ENUM: DRAFT, OPEN, CLOSED, COMPLETED, CANCELLED)
└── created_by
```

### 3.2 Enrollments Table
```
training_enrollments
├── enrollment_id (UUID, PK)
├── programme_id (FK)
├── sevabrati_id (FK → sevabrati)
├── ssvm_code
├── nominated_by_user_id
├── status (ENUM: NOMINATED, WAITLISTED, CONFIRMED, ATTENDED, CERTIFIED, REJECTED, WITHDRAWN)
├── attendance_days (INT)
├── attendance_percentage (computed)
├── assessment_score (nullable)
├── certificate_url (nullable)
├── certificate_code (nullable, unique)
└── nominated_at
```

### 3.3 Attendance Records Table
```
training_attendance
├── attendance_id (UUID, PK)
├── enrollment_id (FK)
├── programme_id (FK)
├── attendance_date
├── status (ENUM: PRESENT, ABSENT, LATE)
└── marked_by_user_id
```

### 3.4 Feedback Table
```
training_feedback
├── feedback_id (UUID, PK)
├── enrollment_id (FK)
├── programme_id (FK)
├── q1_score, q2_score, q3_score, q4_score (1–5)
├── open_text (TEXT)
└── submitted_at
```

---

## 4. Implementation Plan

### Phase 1 — Catalogue & Calendar (Weeks 1–2)
- [ ] Build programme catalogue management (CRUD)
- [ ] Build training calendar view (monthly + list)
- [ ] Implement eligibility rules engine

### Phase 2 — Enrollment & Nominations (Weeks 2–3)
- [ ] Build nomination form and submission workflow
- [ ] Implement capacity management and waitlist
- [ ] Implement fee link to Prasikshyana Sulka accounts
- [ ] Build enrollment confirmation and notification

### Phase 3 — Attendance, Assessment & Certification (Weeks 3–4)
- [ ] Build attendance marking interface
- [ ] Build MCQ assessment module (question entry + online test + auto-score)
- [ ] Implement certificate PDF generation with unique verification code
- [ ] Build /certificates/verify/:code public endpoint

### Phase 4 — Compliance & Impact (Weeks 4–5)
- [ ] Build mandatory training compliance tracker and dashboard
- [ ] Build trainer profile management
- [ ] Build post-training feedback survey and aggregated report
- [ ] Build impact analysis dashboard (correlation with student outcomes)

### Phase 5 — Testing (Week 6)
- [ ] Test full enrollment lifecycle
- [ ] Test certificate uniqueness and verification
- [ ] Test mandatory compliance alert triggering

---

## 5. Acceptance Criteria

- [ ] An SSVM can nominate a Sevabrati; if ineligible (wrong designation), an error blocks submission
- [ ] Nominations beyond capacity go to waitlist; confirmed when a spot opens
- [ ] Daily attendance marks update attendance_percentage; if below 80% at programme end, certificate not issued
- [ ] Certificate PDF generated with unique code; /certificates/verify/:code returns "Valid" with staff name
- [ ] Mandatory compliance dashboard shows correct % for each mandatory programme
- [ ] Post-training feedback responses visible in aggregated programme report for Head Office

---

## 6. Developer Notes

- Certificate codes should be cryptographically random (UUID or similar) — not sequential integers that can be guessed
- Attendance percentage must be recomputed after each day's attendance — pre-compute and store, not on-the-fly
- The MCQ assessment should have a time limit (configurable) — implement using a server-side timer, not client-side
- Impact analysis is a data correlation query — it can be slow for large datasets; run it as a batch job and cache results nightly
