# F-01 · Vidya Bharati National Hierarchy Sync & Compliance Portal

**Module Code:** F-01  
**Priority:** 🔴 Critical  
**Estimated Effort:** 5–6 Weeks  
**Team:** 1 Senior Backend Developer (API/Integration) + 1 Frontend Developer  
**Depends On:** P-10 (ERP Integration Layer), P-01 (Compliance), P-11 (RBAC), Core Data Modules  

---

## 1. Module Overview

SVS Odisha is a Pradeshik (state) unit under Vidya Bharati's national structure spanning 13,000+ schools across India. Data exchange with national bodies — Akhil Bharatiya Karyalaya — is entirely manual: spreadsheets emailed periodically, phone calls for circular distribution. This creates reporting delays, version inconsistencies, and a complete absence of real-time national visibility into Odisha's school network.

This module builds a **two-way sync layer** between SVS Odisha EMS and the Vidya Bharati national portal:
- **Upward flow:** SVS Odisha pushes school-wise data to the national portal
- **Downward flow:** National circulars, syllabus frameworks, and event calendars flow into SVS Odisha EMS automatically

---

## 2. Functional Requirements

### 2.1 National Data Push (SVS Odisha → Vidya Bharati National)

Scheduled and on-demand push of state-level consolidated data:

**Data Sets Pushed:**
| Dataset | Frequency | Description |
|---------|-----------|-------------|
| School Strength Report | Monthly | School-wise student count by class |
| Staff Headcount | Monthly | Active Sevabrati count by designation |
| Examination Results | After each exam cycle | School-wise pass %, merit list |
| Sports Achievements | After each event | District/state level medals and records |
| Cultural Programme Participation | Quarterly | Bal Sansad, Sanskruti Gyan participation counts |
| Scholarship/Welfare Beneficiaries | Quarterly | Tribal, EWS, scholarship recipient counts |
| Alumni Outcomes | Annual | Alumni employment and higher education summary |

**Push Mechanism:**
- API call to Vidya Bharati national portal endpoint (REST JSON)
- If VB national portal provides API: direct integration
- If not: generate standardised export files (CSV/Excel) in VB-defined format for manual upload (fallback mode)
- Push log maintained per dataset per push: status (Success / Failed / Partial), record count, timestamp

### 2.2 National Compliance Dashboard

Head Office view showing SVS Odisha's compliance against national reporting requirements:

- Last push date and status for each dataset
- National targets vs. current state numbers (if national provides targets)
- Overdue reports (past the national submission deadline)
- Data quality score for last push (% of records without errors)

### 2.3 National Downward Flow (Vidya Bharati National → SVS Odisha EMS)

**Inbound Data Types:**
- National Circulars and Policy Directives → automatically entered as Publications in P-02 (marked as "National Directive") with all-SSVM distribution
- National Syllabus Framework Updates → trigger syllabus update review workflow in P-02
- Akhil Bharatiya Event Calendar → entries created in F-10 (Event Management Hub) automatically
- National Training Programmes → added to TTMS catalogue in P-08 with national badge

**Pull Mechanism:**
- Poll VB national API at configured interval (daily at midnight)
- Or receive webhook from VB national on new content
- All inbound national content tagged with source: "Vidya Bharati National" — cannot be deleted by state admins

### 2.4 API Integration with Vidya Bharati National

**If VB National provides an API:**
- Authenticate using VB-issued API credentials (stored encrypted in config)
- Push data to VB endpoints in their defined format
- Pull data from VB endpoints

**If VB National does not yet have an API (fallback):**
- Generate standardised Excel/CSV export files in VB-defined column format
- Store exports in an archive folder
- Head Office downloads and manually uploads to VB national portal
- System tracks manual upload confirmation (HO admin marks "Uploaded to VB" with date)

---

## 3. Data Models

### 3.1 National Sync Log Table
```
national_sync_log
├── sync_id (UUID, PK)
├── sync_direction (ENUM: OUTBOUND, INBOUND)
├── dataset_name
├── triggered_by (ENUM: SCHEDULED, MANUAL)
├── started_at
├── completed_at (nullable)
├── status (ENUM: SUCCESS, FAILED, PARTIAL)
├── records_attempted
├── records_succeeded
├── error_details (JSONB, nullable)
└── export_file_url (nullable — for fallback mode)
```

### 3.2 National Content Registry Table
```
national_inbound_content
├── content_id (UUID, PK)
├── vb_national_id (string — ID from VB national system)
├── content_type (ENUM: CIRCULAR, SYLLABUS_UPDATE, EVENT, TRAINING)
├── title
├── received_at
├── processed_at (nullable)
├── local_record_id (FK to the corresponding SVS EMS record created)
└── status (ENUM: RECEIVED, PROCESSED, FAILED)
```

---

## 4. Implementation Plan

### Phase 1 — Architecture & Fallback (Weeks 1–2)
- [ ] Document VB national portal API (if available) or define fallback export format
- [ ] Build outbound data push for each dataset (generate correct JSON/CSV)
- [ ] Implement push log and compliance dashboard
- [ ] Build scheduled push job (monthly trigger per dataset)

### Phase 2 — Inbound & Live Integration (Weeks 3–4)
- [ ] Build inbound content fetch (poll or webhook)
- [ ] Implement content processors (create publication, add event, add training)
- [ ] Build national content registry and tracking

### Phase 3 — Testing (Weeks 5–6)
- [ ] Test outbound push with VB national sandbox (or test with export file validation)
- [ ] Test inbound circular → publication creation with all-SSVM distribution
- [ ] Test fallback mode export format against VB's template

---

## 5. Acceptance Criteria

- [ ] Monthly School Strength Report pushes to VB national on schedule; sync log shows "Success" with correct record count
- [ ] A new national circular received from VB portal is automatically created as a Publication in P-02 with "National Directive" tag and all-SSVM distribution initiated within 24 hours of receipt
- [ ] Compliance dashboard shows all datasets with their last push date and overdue status
- [ ] Fallback mode export generates an Excel file in VB's column format, downloadable by Head Office admin

---

## 6. Developer Notes

- Build the integration in "adapter" pattern — a VB national adapter that can be swapped between API mode and fallback export mode without changing core logic
- All VB API credentials must be stored encrypted (not in code or plain config files)
- Inbound national content must be idempotent — if the same VB content is received twice (e.g., due to a retry), the second processing should detect the duplicate and skip
