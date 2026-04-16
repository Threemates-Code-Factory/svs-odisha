# F-02 · Sanskar & Cultural Programme Management Module

**Module Code:** F-02  
**Priority:** 🔴 High  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), P-04 (Communication/Notifications), Accounts Module (Sanskruti Gyan fees)  

---

## 1. Module Overview

Vidya Bharati schools are built on a cultural and value-formation identity — Sanskar Kendras, daily Prarthana Sabha, Bal Sansad (student parliament), Rashtriya Parvas (national festival celebrations), and the Sanskruti Gyan Pariksha (cultural knowledge examination). These activities define the institution's distinctiveness from commercial schools, yet no EMS on the market tracks them.

This module plans, tracks, and reports all Sanskar activities across the SVS Odisha network — creating a closed loop between cultural participation and the financial collection it generates (Sanskruti Gyan examination fees already tracked in the Accounts module).

No generic ERP or school management system can model this. It requires deep understanding of the Vidya Bharati ecosystem.

---

## 2. Functional Requirements

### 2.1 Sanskar Activity Tracker

Head Office defines the master list of Sanskar activities:

**Activity Types:**
- Prarthana Sabha (daily assembly)
- Rashtriya Parva (National Day celebration: Republic Day, Independence Day, Teachers Day, etc.)
- Bal Sansad (student parliament) — elections, sessions, resolutions
- Sanskar Kendra activities (weekly value formation sessions)
- Ekal Geet (school anthem/prayer sessions)
- Yoga Divas
- Matribhasha Divas (Mother Tongue Day)
- Saraswati Puja / Vandana
- Vidyarthi Parishad activities
- Custom (SSVM-defined activities)

**Activity Recording (SSVM):**
- Activity Type, Date, Participants Count, Brief Description, Photos (optional)
- For Prarthana Sabha: can be recorded as a weekly batch (Mon–Sat, participant count)
- For Rashtriya Parvas: details of programme, chief guest, student participation count, any awards

**Activity Calendar:**
- Rashtriya Parvas and mandated Sanskar activities are pre-populated in the calendar by Head Office
- SSVM sees upcoming activities and marks them as Completed with details after the event
- Overdue (mandated activity not marked completed) → reminder sent to SSVM

### 2.2 Bal Sansad Election Management

The Bal Sansad (student parliament) is a core Vidya Bharati feature — schools conduct annual elections:

**Election Workflow:**
1. Head Office announces Bal Sansad election cycle (academic year)
2. SSVM registers candidates: Name, Class, Position (Pradhan/Upa-Pradhan/Mantri)
3. Election conducted at school level; SSVM records results (winner per position)
4. Bal Sansad constituted: record of elected members with photo
5. Bal Sansad activities during the year: sessions held, resolutions passed, initiatives taken

**Reports:**
- Network-wide Bal Sansad constitution report (all schools, all positions filled)
- Activity report: sessions held per school per term

### 2.3 Sanskruti Gyan Pariksha Management

The Sanskruti Gyan Pariksha is a cultural knowledge examination conducted annually:

**Registration:**
- SSVM registers eligible students (Chatra Sanskruti Gyana) and teachers (Acharya Sanskruti Gyana)
- Fee collected per registrant (linked to existing Sanskruti Gyan accounts module — no duplication)
- Registration deadline enforcement: registration blocked after cutoff date

**Examination:**
- Examination centre assignment by Sankula/Bibhag
- Admit card generation for registered participants
- Results entry after examination
- Merit list generation (Sambhag-wise, state-wise)
- Certificate generation for qualifiers

**Financial Closed Loop:**
- Registration fees collected in Accounts module (existing flow preserved)
- This module adds: registration roster, results, certificates — completing the lifecycle

### 2.4 Cultural Programme Calendar

A network-wide cultural calendar showing:
- All Rashtriya Parvas (pre-populated nationally mandated dates)
- School-level Saraswati Vandana dates
- Pradeshik and Akhil Bharatiya cultural events (from F-10 Event Hub)
- SSVM-specific cultural programmes

Filter by: Sambhag / Bibhag / SSVM / Programme Type

### 2.5 Prarthana Attendance Records

For SSVMs that choose to track daily Prarthana Sabha participation:
- Weekly entry: class-wise or school-wide participant count
- Prarthana content tracker: which Ekal Geet, Shlokas, and Mantras are used
- Monthly Prarthana report per SSVM

### 2.6 Reporting

**Head Office Reports:**
- Sanskar Activity Completion Rate: % of mandated activities completed per SSVM / Sambhag
- Bal Sansad Coverage: % of SSVMs with active Bal Sansad
- Sanskruti Gyan Pariksha: registration count, pass %, merit list
- Cultural Activity Volume: activities logged per Sambhag per quarter
- Non-compliant SSVMs: schools that have not logged any Sanskar activity in 30+ days

---

## 3. Data Models

### 3.1 Sanskar Activities Table
```
sanskar_activities
├── activity_id (UUID, PK)
├── ssvm_code
├── activity_type (ENUM)
├── activity_date
├── participant_count
├── description (TEXT)
├── photos (JSONB — array of file URLs)
├── is_mandated (BOOL — whether this was a Head Office mandated activity)
├── mandated_activity_ref (nullable — FK to the mandated activity)
└── logged_by_user_id
```

### 3.2 Mandated Activities Table
```
mandated_activities
├── mandated_id (UUID, PK)
├── activity_type
├── title
├── scheduled_date
├── applicable_scope (JSON — All / Sambhag / Bibhag)
├── completion_deadline
└── created_by
```

### 3.3 Bal Sansad Table
```
bal_sansad
├── sansad_id (UUID, PK)
├── ssvm_code
├── academic_year
├── election_date
├── status (ENUM: PENDING, ELECTED, ACTIVE, DISSOLVED)
└── members (JSONB — array of {name, class, position, photo_url})
```

### 3.4 Sanskruti Gyan Registrations Table
```
sanskruti_gyan_registrations
├── registration_id (UUID, PK)
├── ssvm_code
├── academic_year
├── participant_type (ENUM: CHATRA, ACHARYA)
├── participant_id (FK → students or sevabrati)
├── participant_name
├── exam_centre_ssvm_code (nullable)
├── result (nullable — PASS / FAIL / MERIT)
├── marks (nullable)
├── certificate_url (nullable)
└── registered_at
```

---

## 4. Implementation Plan

### Phase 1 — Activity Tracker & Calendar (Weeks 1–2)
- [ ] Build mandated activities management (Head Office creates/publishes mandated activities)
- [ ] Build SSVM activity logging form
- [ ] Build cultural calendar view
- [ ] Implement overdue reminders for mandated activities

### Phase 2 — Bal Sansad & Sanskruti Gyan (Weeks 2–3)
- [ ] Build Bal Sansad election and constitution management
- [ ] Build Sanskruti Gyan registration (link to existing Accounts fee flow)
- [ ] Build admit card generation and results entry
- [ ] Build certificate generation

### Phase 3 — Reporting & Testing (Weeks 4–5)
- [ ] Build all Head Office reports (activity completion rate, Bal Sansad coverage)
- [ ] Build Sanskruti Gyan merit list and state/Sambhag-level ranking
- [ ] Test mandated activity overdue reminder triggering
- [ ] Test Sanskruti Gyan financial closed loop (fee in accounts = registration here)

---

## 5. Acceptance Criteria

- [ ] Head Office creates a mandated Prarthana activity for all SSVMs on Republic Day; SSVMs see it in their calendar and can mark it Completed
- [ ] SSVMs that do not mark a mandated activity as Completed by the deadline receive a reminder; Sankula admin is notified
- [ ] Bal Sansad election results recorded for an SSVM; all elected members appear in the Bal Sansad record with positions
- [ ] Sanskruti Gyan registration count matches the fee collection count in the Accounts module (closed loop verified)
- [ ] Cultural Activity Completion Rate report shows correct % per Sambhag

---

## 6. Developer Notes

- This module is highly SVS/Vidya Bharati specific — invest time in a requirements workshop with the SVS Odisha academic committee before building
- Prarthana attendance recording should be made as frictionless as possible (mobile-friendly, weekly batch entry) — or it will not be used
- Photos upload for activities should be optional and compressed server-side (no raw photos > 2 MB stored)
- The Sanskruti Gyan financial closed loop: the registration here creates a record; the fee is already collected in the Accounts module. Link via `registration_id` stored in the accounts fee record — do not move money handling here
