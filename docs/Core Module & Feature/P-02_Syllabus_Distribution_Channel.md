# P-02 · Single Channel for Syllabus & Question Pattern Distribution

**Module Code:** P-02  
**Priority:** 🔴 High  
**Estimated Effort:** 3–4 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-04 (Communication), P-11 (RBAC), File Storage Service  

---

## 1. Module Overview

SVS Odisha's academic committee produces syllabi, question paper blueprints, model question papers, and examination patterns for SSVM schools across Odisha. Currently, this content is distributed through a combination of paper courier, WhatsApp forwards, and email attachments with no systematic tracking. Schools in remote areas such as Malkangiri, Nawarangapur, and Rayagada routinely receive updates late — or receive outdated versions because a WhatsApp forward was not updated when the document was revised.

This module replaces all ad-hoc distribution channels with a **single authoritative digital channel**: a versioned document distribution system where Head Office publishes syllabus and question pattern documents, every school receives a delivery notification, and Head Office can see exactly which schools have acknowledged receipt.

The committee and department structure already exists — the problem is digital distribution reliability and acknowledgment tracking. This module is purely a delivery and tracking system.

---

## 2. Problem Statement (Current Gaps)

| # | Current Gap | Consequence |
|---|-------------|-------------|
| 1 | Distribution via WhatsApp/courier | Delivery is unreliable; no record of what was sent to whom |
| 2 | No version control | Multiple versions of the same syllabus circulate simultaneously |
| 3 | No acknowledgment tracking | Head Office cannot confirm which schools received the update |
| 4 | No archiving | Previous year syllabi are not systematically preserved |
| 5 | No targeted distribution | Cannot easily send to only specific Sambhags or class groups |
| 6 | Remote school gap | Malkangiri, Nawarangapur, Rayagada schools miss updates regularly |

---

## 3. Functional Requirements

### 3.1 Document Publishing (Head Office)

Head Office (authorised department users) can publish documents through a structured publication form:

**Publication Form Fields:**
- Document Title (required)
- Document Type: Syllabus / Question Pattern / Model Question Paper / Examination Blueprint / Circular / Other
- Academic Class: All / Praramva / Bodh / Class I–XII (multi-select)
- Subject: All / Language / Mathematics / Science / Social Science / Sanskrit / Other
- Academic Year / Session
- Version Number (auto-incremented per Title; manual override allowed)
- Effective Date
- Expiry Date (optional — document auto-archived after this date)
- Description / Notes (rich text)
- File Upload (PDF, DOCX, XLSX — max 25 MB per file; up to 5 files per publication)
- Distribution Scope: All SSVMs / Select Sambhags / Select Bibhags / Select Sankulas / Select individual SSVMs
- Priority: Normal / Urgent
- Acknowledgment Required: Yes / No

On publish, the system:
1. Assigns a unique Publication ID
2. Stores the file in the central document store
3. Creates a delivery record for every SSVM in the distribution scope
4. Sends in-app notifications (and SMS if Urgent) to all target SSVMs
5. Sends notification to Sambhag and Bibhag admins covering the target schools

### 3.2 Document Reception (SSVM)

When an SSVM user logs in, unread publications appear as a notification badge. The Publications inbox shows:

- Title and type
- Published date
- Version number
- Effective date
- Read status (Unread / Read / Acknowledged)
- Download button (PDF/DOCX viewer inline where possible)

When an SSVM user opens a document where Acknowledgment Required = Yes, the system prompts: **"Please confirm you have read and understood this document."** Clicking Acknowledge marks the delivery record as Acknowledged with the user's ID and timestamp.

### 3.3 Version Control

When Head Office publishes a revised version of an existing document (same Title):

- The system auto-increments the version number (v1 → v2 → v3)
- The previous version is archived but remains accessible for reference
- All SSVMs receive a fresh delivery notification for the new version
- SSVMs that had acknowledged v1 must re-acknowledge v2
- The document list clearly shows the current version and flags it as "Updated"

### 3.4 Delivery & Acknowledgment Tracking (Head Office View)

Head Office can open any published document and see a tracking dashboard:

- Total SSVMs in distribution scope
- Read count (opened) and Read percentage
- Acknowledged count and Acknowledged percentage
- List of non-acknowledged SSVMs with Sambhag, Bibhag, Sankula filters
- Last-read timestamp per SSVM
- One-click: Send Reminder to all non-acknowledged SSVMs
- Export tracking report (Excel / PDF)

Sambhag and Bibhag admins see the same tracking view scoped to their jurisdiction.

### 3.5 Document Archive & Search

All published documents (current and archived versions) are accessible through a searchable archive:

- Search by: Title, Document Type, Subject, Class, Academic Year, Version, Effective Date range
- Filter by: Sambhag (for Head Office), Publication Status (Active / Archived / Expired)
- Download any version at any time
- Archive does not delete — it moves to an "Archived" status

### 3.6 Reminder and Escalation

- Automatic reminder notification sent to non-acknowledging SSVMs 3 days before Effective Date (configurable)
- If a school has not acknowledged by Effective Date, the Sankula admin is notified
- After Effective Date + 2 days with no acknowledgment, the Bibhag admin is notified
- Head Office can manually trigger reminders at any time

---

## 4. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| File Storage | Secure, backed-up object store (e.g., S3-compatible) |
| File Delivery | Pre-signed URL download with expiry (not direct file links) |
| Max File Size | 25 MB per file |
| Notifications | In-app (all) + SMS (Urgent only) within 5 minutes of publish |
| Uptime | 99.5% availability for the download endpoint |
| Archive Retention | Minimum 10 years |

---

## 5. Data Models

### 5.1 Publications Table
```
publications
├── publication_id (UUID, PK)
├── title
├── document_type (ENUM: SYLLABUS, QUESTION_PATTERN, MODEL_PAPER, BLUEPRINT, CIRCULAR, OTHER)
├── subject
├── class_target (JSON array of class values or "ALL")
├── academic_year
├── version_number (INT, incremented per title)
├── is_current_version (BOOL)
├── parent_publication_id (FK → publications, NULL for v1)
├── effective_date
├── expiry_date (nullable)
├── description (TEXT)
├── priority (ENUM: NORMAL, URGENT)
├── acknowledgment_required (BOOL)
├── distribution_scope (JSON — scope type + target IDs)
├── published_by (FK → users)
├── published_at
├── status (ENUM: DRAFT, PUBLISHED, ARCHIVED, EXPIRED)
└── created_at
```

### 5.2 Publication Files Table
```
publication_files
├── file_id (UUID, PK)
├── publication_id (FK → publications)
├── original_filename
├── storage_key (path in object store)
├── file_size_bytes
├── mime_type
└── uploaded_at
```

### 5.3 Delivery Records Table
```
publication_deliveries
├── delivery_id (UUID, PK)
├── publication_id (FK → publications)
├── ssvm_code
├── delivered_at (when the publication was pushed)
├── first_read_at (nullable — when first opened)
├── read_by_user_id (nullable)
├── acknowledged_at (nullable)
├── acknowledged_by_user_id (nullable)
├── reminder_count (INT — how many reminders sent)
└── last_reminder_at (nullable)
```

---

## 6. UI Screens

| Screen | Path | Role Access | Description |
|--------|------|-------------|-------------|
| Publish Document | /publications/new | Head Office | Publication creation form |
| Publications List (HO) | /publications | Head Office | All published docs with tracking summary |
| Delivery Tracker | /publications/:id/tracking | Head Office, Sambhag | Per-publication delivery status |
| SSVM Inbox | /publications/inbox | SSVM, Sankula | Publications received, unread first |
| Document Viewer | /publications/:id/view | All | Inline viewer + download + acknowledge button |
| Archive | /publications/archive | All | Searchable full archive |
| Reminder Management | /publications/:id/reminders | Head Office, Sambhag | Trigger and log reminders |

---

## 7. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/publications | Create new publication |
| GET | /api/publications | List publications (scoped by role) |
| GET | /api/publications/:id | Get publication details |
| POST | /api/publications/:id/acknowledge | Mark as acknowledged |
| GET | /api/publications/:id/tracking | Get delivery tracking data |
| POST | /api/publications/:id/reminder | Send reminder to non-acknowledging SSVMs |
| GET | /api/publications/archive | Search archive |
| GET | /api/publications/:id/download/:fileId | Get pre-signed download URL |

---

## 8. Implementation Plan

### Phase 1 — Core Publishing Engine (Weeks 1–2)
- [ ] Set up file storage service (S3 or equivalent) with folder structure by publication_id
- [ ] Create database schema: publications, publication_files, publication_deliveries
- [ ] Build publication creation API with file upload (multipart)
- [ ] Build distribution scope resolver: given a scope definition, resolve to list of SSVM codes
- [ ] Implement delivery record creation on publish (one record per SSVM)
- [ ] Implement in-app notification on publish (notification queue)
- [ ] Implement SMS dispatch for Urgent publications (SMS gateway integration)

### Phase 2 — SSVM Inbox & Acknowledgment (Week 2–3)
- [ ] Build SSVM inbox screen with unread/read/acknowledged filter
- [ ] Build document viewer with inline PDF preview (PDF.js)
- [ ] Implement acknowledgment API and UX (confirm prompt)
- [ ] Implement notification badge count in nav bar

### Phase 3 — Tracking, Archive & Reminders (Weeks 3–4)
- [ ] Build delivery tracking dashboard with read %, acknowledged %
- [ ] Build SSVM non-acknowledgment list with Sambhag/Bibhag filter
- [ ] Implement reminder trigger (manual and automatic scheduler)
- [ ] Build escalation logic (Sankula → Bibhag on non-acknowledgment)
- [ ] Build archive search with all filters
- [ ] Export tracking report (Excel, PDF)

### Phase 4 — Testing (End of Week 4)
- [ ] Test file upload with large files (25 MB limit enforcement)
- [ ] Test distribution scope: All SSVMs, single Sambhag, individual SSVMs
- [ ] Test versioning: publish v2 of an existing document, confirm v1 archived, delivery records created for v2
- [ ] Test acknowledgment: confirm audit entry created, tracking % updates correctly
- [ ] Test reminder escalation path

---

## 9. Integration Points

| Integration | Description |
|-------------|-------------|
| P-04 Communication Module | Publications share the notification infrastructure with the communication module |
| P-11 RBAC Module | Only authorised Head Office department users can publish documents |
| P-01 Compliance Module | Non-acknowledgment after Effective Date creates a compliance flag |
| SMS Gateway | For Urgent publications — SMS sent to SSVM principal's registered mobile |

---

## 10. Acceptance Criteria

- [ ] Head Office can publish a PDF with class target = "Class X", scope = "All SSVMs", and all 800+ delivery records are created within 60 seconds
- [ ] An SSVM user sees the publication in their inbox with an "Unread" badge
- [ ] After the SSVM user clicks Acknowledge, the delivery record shows `acknowledged_at` and the tracking dashboard % updates
- [ ] Publishing v2 of an existing document archives v1, creates new delivery records, and sends fresh notifications
- [ ] Head Office tracking view correctly shows which SSVMs have not acknowledged, filterable by Sambhag
- [ ] Reminder button sends notification to all non-acknowledged SSVMs and increments `reminder_count`
- [ ] An SSVM user cannot view publications addressed to a different Sambhag's scope (scope enforcement)
- [ ] Download link expires after 24 hours (pre-signed URL expiry)

---

## 11. Developer Notes

- Do not store files in the database as BLOBs — use an object store with pre-signed URLs for all file access
- For large distribution scopes (All SSVMs), use a background job queue to create delivery records — do not block the HTTP request
- PDF inline viewer: use PDF.js embedded in the frontend; do not open a new tab for viewing
- Version number is per-title, not global — maintain a sequence per title (use a DB sequence keyed on title)
- The acknowledgment button must be idempotent — clicking it twice should not create duplicate records
- Consider a "bulk publish" feature later (Phase 2 backlog): upload a ZIP and publish multiple files at once
