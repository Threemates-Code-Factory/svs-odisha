# P-09 · Alumni Management and Alumni Network Portal

**Module Code:** P-09  
**Priority:** 🟢 Medium  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** Student Records (Establishment Module), P-11 (RBAC), Payment Gateway (donations)  

---

## 1. Module Overview

When a student passes out of an SSVM school, their record is archived with no follow-up mechanism. SVS Odisha has no visibility into what its alumni are doing, no way for alumni to stay connected with their schools, no organised mentorship or donation channel, and no data to demonstrate the mission's long-term impact.

This module builds an **Alumni Management Portal** — a lightweight but structured system for registering alumni, maintaining a searchable network, enabling contributions (financial and mentorship), and generating outcome reports that demonstrate impact to donors and the Vidya Bharati national body.

---

## 2. Functional Requirements

### 2.1 Alumni Registration and Profile

Alumni can be added in two ways:

**A. System-Seeded (from Student Records):**
When a student's status is changed to "Passed Out" or "Completed" in the Establishment module, the system creates a pre-populated alumni record with: Name, Date of Birth, Last SSVM, Last Class, Academic Year of Completion. This record is marked "Unverified" until the alumni themselves claim and update it.

**B. Alumni Self-Registration (Public Portal):**
A public-facing page at /alumni/register:
- Alumni provides: Name, DOB, Mobile, Email, SSVM Name (searchable dropdown), Year of Passing Out, Class at Passing Out (XI / XII)
- System attempts to match against the pre-seeded record using Name + DOB + SSVM
- If matched: alumni profile is verified and merged
- If not matched: new "Unverified" alumni record created; SSVM admin can verify manually

**Alumni Profile Fields:**
- Personal: Name, DOB, Gender, Mobile, Email, Profile Photo
- Academic (SSVM): School name, Year of Passing Out, Class
- Current Status: Higher Education / Working / Self-Employed / Other
- Institution/Employer (current)
- Location (City, State, Country)
- Achievements (free text — notable achievements they'd like to share)
- Mentorship Availability: Yes/No + areas of expertise
- Visible to other alumni: Yes/No (privacy choice)

### 2.2 Alumni Directory

A searchable directory accessible to:
- Verified alumni (full access to other alumni who have set visibility = Yes)
- SSVM admins and above (full access to all alumni from their scope)

**Search Filters:**
- SSVM / Sambhag / Bibhag
- Year of Passing Out (range)
- Current Location (state/city)
- Current Status (Higher Education / Working)
- Mentorship Available: Yes

**Directory Entry Card Shows:**
- Name, profile photo (if uploaded)
- SSVM and year of passing out
- Current status and institution (if made public)
- Mentorship badge (if available)
- "Connect" button (sends introduction request, not direct contact — privacy-first)

### 2.3 Alumni Contribution and Donation

**Financial Contributions:**
- Donation form (online payment gateway integration)
- Donation can be: General Fund / Specific SSVM / Scholarship for current students / Infrastructure / Other
- 80G receipt generated automatically for eligible donations (links to F-09 Donor CRM for full donor relationship management)
- Alumni donation history shown in profile

**Mentorship Contributions:**
- Alumni who opt in as mentors can be connected with current students or graduating students
- Mentorship type: Career Guidance / Subject Help / Campus Visit / Online Session
- SSVM admin facilitates connection between mentor and school
- Mentorship sessions logged (date, type, participants)

### 2.4 Outcome Tracking

Head Office can generate **Alumni Outcome Reports**:

- Total registered alumni count by SSVM, Sambhag, Year, Status
- Higher Education pathways: which institutions SVS alumni are attending
- Professional distribution: fields of work alumni have entered
- Alumni who returned to SVS ecosystem (as Sevabrati/Acharya)
- Geographic spread: where are SVS alumni today?
- Donation summary: total donated by alumni, by SSVM, by campaign

This data can be submitted to Vidya Bharati national for impact reporting and used in fundraising narratives.

### 2.5 Alumni Events

- Head Office or SSVM can create an alumni event: Reunion, Career Fair, Homecoming Day
- Event is posted on the Alumni Portal with registration option
- Registered alumni receive notification
- Post-event: attendance list and photos (optional upload)

---

## 3. Data Models

### 3.1 Alumni Table
```
alumni
├── alumni_id (UUID, PK)
├── student_record_id (FK → students, nullable — for system-seeded)
├── full_name
├── date_of_birth
├── gender
├── mobile
├── email
├── ssvm_code (where they studied)
├── year_of_passing_out
├── class_at_passing
├── current_status (ENUM: HIGHER_EDUCATION, WORKING, SELF_EMPLOYED, OTHER)
├── institution_employer (nullable)
├── location_city
├── location_state
├── location_country
├── achievements (TEXT)
├── is_mentor (BOOL)
├── mentor_areas (JSONB — array of expertise areas)
├── directory_visible (BOOL)
├── verification_status (ENUM: UNVERIFIED, VERIFIED, SELF_REGISTERED)
├── profile_photo_url (nullable)
└── registered_at
```

### 3.2 Alumni Donations Table
```
alumni_donations
├── donation_id (UUID, PK)
├── alumni_id (FK → alumni)
├── amount
├── purpose (ENUM)
├── target_ssvm_code (nullable)
├── payment_mode
├── payment_reference
├── receipt_url (nullable)
├── is_80g_eligible (BOOL)
└── donated_at
```

### 3.3 Mentorship Sessions Table
```
mentorship_sessions
├── session_id (UUID, PK)
├── alumni_id (FK → alumni)
├── ssvm_code
├── session_type (ENUM)
├── session_date
├── participant_count
├── notes (TEXT)
└── logged_by_user_id
```

### 3.4 Alumni Events Table
```
alumni_events
├── event_id (UUID, PK)
├── title
├── event_type (ENUM: REUNION, CAREER_FAIR, HOMECOMING, OTHER)
├── ssvm_code (nullable — if SSVM-specific)
├── event_date
├── venue
├── description
├── registration_deadline
├── created_by
└── created_at
```

---

## 4. Implementation Plan

### Phase 1 — Registration & Profile (Weeks 1–2)
- [ ] Build alumni schema and pre-seeding logic from passed-out students
- [ ] Build public self-registration form with matching logic
- [ ] Build alumni profile page with edit capability
- [ ] Implement verification workflow (SSVM admin confirms unverified registrations)

### Phase 2 — Directory & Network (Week 2–3)
- [ ] Build alumni directory with search and filters
- [ ] Implement directory visibility settings
- [ ] Build "Connect" introduction request flow

### Phase 3 — Contributions & Events (Weeks 3–4)
- [ ] Build donation form with payment gateway integration
- [ ] Implement 80G receipt generation
- [ ] Build mentorship opt-in and session logging
- [ ] Build alumni event creation and registration

### Phase 4 — Reports & Testing (Week 5)
- [ ] Build outcome reports for Head Office
- [ ] Test self-registration → matching → verification flow
- [ ] Test donation payment and 80G receipt generation

---

## 5. Acceptance Criteria

- [ ] When a student's status is set to "Passed Out", a pre-seeded alumni record is created
- [ ] An alumnus who self-registers with matching Name + DOB + SSVM gets auto-verified
- [ ] Directory only shows alumni with `directory_visible = true` to other alumni; admin sees all
- [ ] Donation payment generates an 80G receipt PDF for eligible donations
- [ ] Outcome report correctly aggregates alumni count by SSVM and status category

---

## 6. Developer Notes

- Privacy first: alumni mobile and email must not be visible to other alumni — only the "Connect" request flow should be used for contact
- The matching algorithm for self-registration should use fuzzy name matching (Levenshtein distance < 2) + exact DOB + SSVM — to handle slight name spelling variations
- Consider a batch email/SMS campaign feature for future phase: invite all passed-out students (with contact info in the system) to self-register
- 80G eligibility: display a disclaimer that 80G receipt is for reference; actual tax benefit depends on individual's ITR filing
