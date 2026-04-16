# F-03 · Sevabrati Welfare Lifecycle & Sewa Record

**Module Code:** F-03  
**Priority:** 🔴 High  
**Estimated Effort:** 3–4 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-05 (Unified Staff Profile), P-11 (RBAC)  

---

## 1. Module Overview

Sevabrati in SVS schools are not commercial employees in the conventional sense — they are dedicated sewa (service) workers whose relationship with the organisation is defined by mission, not merely by a job contract. Their lifecycle, recognitions, and contributions cannot be captured by a standard HR module.

This module tracks the **complete sewa journey** of every Sevabrati — from the day they joined through their service milestones, recognitions, transfers, and retirement summary. It sits alongside (but is distinct from) the AKP and SAATF financial records. While P-05 handles HR and recruitment workflow, F-03 captures the mission-identity dimension of the sewa relationship.

---

## 2. Functional Requirements

### 2.1 Sewa Timeline

Every Sevabrati has a chronological Sewa Timeline — an immutable record of their sewa journey:

**Timeline Events (automatically generated or manually entered):**
| Event Type | Trigger |
|-----------|---------|
| Sewa Pravesh (Joining) | Date of joining entered in P-05 |
| Prayas Classification | Assigned on joining or after probation |
| Purnakalin Classification | On transition from Prayas to Purna-Kalin |
| SSVM Transfer | Each approved transfer in P-05 |
| Promotion in Designation | Designation change in staff profile |
| Seva Puraskar (Award) | Manually entered by Head Office / Sambhag |
| Vishesh Seva Recognition | Manually entered |
| Training Completion | Each certified training in P-08 |
| Sewa Niwriti (Retirement) | Status changed to Retired in P-05 |

The timeline is read-only for the Sevabrati — only authorised admins can add or edit timeline entries.

### 2.2 Prayas and Purnakalin Classification

**Prayas (Probationary / Part-time sewa worker):**
- Classification date
- Prayas period duration (months)
- Reviewing authority (Sankula / Sambhag)
- Transition to Purnakalin: date and approval by Head Office

**Purnakalin (Full-time committed sewa worker):**
- Confirmation date
- Confirmed by (Head Office authority)
- Benefits unlocked on Purnakalin status (e.g., higher AKP contribution rate)

Classification changes appear in the Sewa Timeline automatically.

### 2.3 Cross-SSVM Transfer History Map

A visual map of the Sevabrati's postings across SSVMs over their entire career:

- Each posting: SSVM name, district, Sambhag, date range (from → to)
- Displayed as a chronological list with an optional Odisha map pin view
- Useful for Sewa Niwriti summary and Vidya Bharati national recognition applications

### 2.4 Sewa Recognition Awards

**Award Types (master list managed by Head Office):**
- Seva Puraskar (Service Award) — annual state-level recognition
- Vishesh Seva Puraskar (Special Service Award)
- Akhil Bharatiya Shikshan Puraskar (National Teaching Award — for VB national level)
- Pradeshik Shreshtha Sevak Puraskar (State Best Worker)
- School-level recognition (informal)

**Award Record:**
- Award name and type
- Academic year / Year of award
- Awarded by (authority name and role)
- Ceremony date and location
- Citation / reason (text)
- Certificate (uploaded PDF or generated)
- Visibility: Award shown in Sevabrati's profile and in SVS network recognition board

**Recognition Board (Head Office Dashboard):**
- All award recipients by year, Sambhag, designation
- Filterable by award type and year
- Exportable for Vidya Bharati national reporting

### 2.5 Sewa Niwriti (Retirement) Summary

When a Sevabrati's status is set to "Retired" in P-05, this module automatically generates a **Sewa Niwriti Summary**:

- Full name and photograph
- Date of Sewa Pravesh (joining)
- Date of Sewa Niwriti (retirement)
- Total sewa duration (years, months)
- Prayas / Purnakalin classification history
- All SSVMs served (from transfer history map)
- All awards received
- Training programmes completed (from P-08)
- AKP and SAATF membership summary (linked from P-06 — not duplicated)
- Note of gratitude from Sambhag / Head Office (text field)

The Sewa Niwriti Summary is generated as a formatted PDF — a dignified record of the Sevabrati's service to be presented at a retirement ceremony or retained in their records.

### 2.6 Network Sewa Statistics (Head Office)

- Total Sevabrati by Prayas vs. Purnakalin classification across the network
- Average sewa duration by Sambhag, designation
- Award recipients this year vs. previous years
- Upcoming retirements (Sevabrati crossing retirement age in next 12 months)
- Long-serving Sevabrati (20+ years, 25+ years) — eligible for special recognition

---

## 3. Data Models

### 3.1 Sewa Timeline Table
```
sewa_timeline
├── event_id (UUID, PK)
├── sevabrati_id (FK → sevabrati)
├── event_type (ENUM — see list above)
├── event_date
├── description (TEXT)
├── ssvm_code (nullable — relevant SSVM for this event)
├── recorded_by_user_id
├── recorded_at
└── is_system_generated (BOOL)
```

### 3.2 Sewa Classification Table
```
sewa_classifications
├── classification_id (UUID, PK)
├── sevabrati_id (FK → sevabrati)
├── classification (ENUM: PRAYAS, PURNAKALIN)
├── classified_from
├── classified_until (nullable — NULL means current)
├── approved_by_user_id
└── notes (TEXT)
```

### 3.3 Sewa Awards Table
```
sewa_awards
├── award_id (UUID, PK)
├── sevabrati_id (FK → sevabrati)
├── award_type (FK → award_types master)
├── award_year
├── awarded_by_name
├── awarded_by_role
├── ceremony_date
├── citation (TEXT)
└── certificate_url (nullable)
```

### 3.4 Award Types Master Table
```
award_types
├── award_type_id (UUID, PK)
├── award_name
├── awarding_level (ENUM: SCHOOL, SANKULA, SAMBHAG, PRADESHIK, AKHIL_BHARATIYA)
├── is_active (BOOL)
└── description
```

---

## 4. Implementation Plan

### Phase 1 — Timeline & Classification (Weeks 1–2)
- [ ] Build sewa_timeline schema with auto-event triggers (joining, transfer, classification change, retirement)
- [ ] Build classification management (Prayas → Purnakalin transition workflow)
- [ ] Build Sevabrati timeline display (chronological view in profile)

### Phase 2 — Awards & Recognition Board (Week 2–3)
- [ ] Build award types master management
- [ ] Build award record creation by authorised admins
- [ ] Build recognition board dashboard for Head Office
- [ ] Integrate award events into Sewa Timeline

### Phase 3 — Retirement Summary & Statistics (Weeks 3–4)
- [ ] Build Sewa Niwriti Summary PDF auto-generation on retirement status change
- [ ] Build network sewa statistics dashboard
- [ ] Build upcoming retirements report (next 12 months)
- [ ] Test full timeline from joining through retirement

---

## 5. Acceptance Criteria

- [ ] Approving a Sevabrati's transfer in P-05 automatically creates a "SSVM Transfer" event in their Sewa Timeline
- [ ] Prayas → Purnakalin classification change requires Head Office approval and triggers a timeline event
- [ ] A Seva Puraskar award recorded for a Sevabrati appears in their profile and in the recognition board
- [ ] When a Sevabrati is marked Retired, Sewa Niwriti Summary PDF is auto-generated with complete timeline, awards, and SSVM history
- [ ] Upcoming retirements report correctly identifies all Sevabrati reaching retirement age in the next 12 months

---

## 6. Developer Notes

- Sewa Timeline events triggered from P-05 (transfers, status changes) must be implemented via event/observer pattern — P-05 fires an event; F-03 listens and creates the timeline entry. Avoid tight coupling between modules
- The Sewa Niwriti PDF should be beautifully formatted — invest in a good PDF template with the SVS/Vidya Bharati branding; this document will be physically presented to retiring Sevabrati
- Classification history must be preserved (never overwrite) — the `classified_until` field tracks the end of each classification period
- Cross-SSVM transfer map: for the optional Odisha map pin view, use a simple SVG map of Odisha districts — no external mapping library needed given the data is district-level, not GPS coordinates
