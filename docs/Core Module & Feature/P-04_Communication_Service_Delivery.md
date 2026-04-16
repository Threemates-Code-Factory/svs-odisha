# P-04 · Single Channel for Communication & Service Delivery

**Module Code:** P-04  
**Priority:** 🔴 Critical  
**Estimated Effort:** 5–6 Weeks  
**Team:** 1 Senior Backend Developer + 1 Frontend Developer + 1 QA  
**Depends On:** P-11 (RBAC), P-12 (Hierarchy Communication Engine), Notification Service  

---

## 1. Module Overview

Communication across the SVS network currently relies on WhatsApp groups, physical letters, personal phone calls, and a basic in-app Mail Box module. Critical communications — fee deadlines, exam schedules, policy changes — are routinely missed. There is no searchable archive of organisational communications at any level, and service delivery requests (SAATF claim status, AKP approval, book dispatch) have no unified tracking interface.

This module replaces the fragmented communication landscape with a **Unified Communication and Service Delivery Platform** — a single inbox-driven system where every communication is tracked, acknowledged, and archived, and every service request has a status trail.

This is distinct from P-12, which handles the structural hierarchy communication engine with escalation and SLA management. P-04 is the user-facing interface layer — the inbox, compose, service desk, and notification centre — that sits on top of P-12's engine.

---

## 2. Problem Statement (Current Gaps)

| # | Current Gap | Consequence |
|---|-------------|-------------|
| 1 | WhatsApp/phone/physical letter for all communications | No archive, no tracking, no enforcement |
| 2 | Critical communications missed by schools | Deadlines passed without awareness |
| 3 | No service request tracking | Schools cannot check status of SAATF claim, AKP approval, book order |
| 4 | Limited Mail Box module | No read receipts, no priority, no search, no thread view |
| 5 | Sambhag and Bibhag act as informal relays | No managed routing — messages get lost in the chain |
| 6 | No communication analytics | Head Office cannot tell which schools are non-responsive |

---

## 3. Functional Requirements

### 3.1 Unified Inbox

Every user role has a Unified Inbox — a single pane showing all incoming communications regardless of category:

**Inbox Columns:**
- Priority indicator (🔴 Urgent / 🟡 Normal)
- From (Sender name and role)
- Subject
- Category (Announcement / Circular / Notice / Service Request / Alert / Query)
- Date & Time
- Read Status (Unread / Read / Acknowledged)
- Action Required (Yes/No)
- Thread indicator (if part of a thread)

**Inbox Features:**
- Sort by: Date (default), Priority, Sender, Category
- Filter by: Category, Priority, Read Status, Date Range, Sender Level (Head Office / Sambhag / Bibhag / Sankula)
- Search: Full-text search across Subject and Body of all received messages
- Bulk actions: Mark as Read, Archive, Export
- Notification badge: Unread count in navigation bar
- Mobile-responsive with swipe-to-archive gesture

### 3.2 Compose and Send

**Compose Message Form:**
- To: (role-based selector — choose individual SSVMs, Sankulas, Bibhags, Sambhags, or roles like "All Pradhan Acharyas")
- CC: (optional)
- Subject
- Category: Announcement / Circular / Notice / Query / Alert / Other
- Priority: Normal / Urgent
- Body (rich text editor — bold, lists, links)
- Attachments: Upload up to 5 files (max 10 MB each)
- Schedule: Send Now / Schedule for date-time
- Read Receipt Required: Yes / No
- Acknowledgment Required: Yes / No (prompts recipient to click "Acknowledge" button)
- Expiry Date (optional — message auto-archives after this date)

**Sending Constraints by Role:**
| Role | Can Send To |
|------|------------|
| SSVM | Sankula, Bibhag, Sambhag, Head Office |
| Sankula | SSVMs under it, Bibhag, Sambhag, Head Office |
| Bibhag | Sankulas under it, SSVMs under it, Sambhag, Head Office |
| Sambhag | Bibhags under it, all SSVMs under it, Head Office |
| Head Office | Anyone (all levels, all scopes) |

### 3.3 Thread View

All replies to a message form a thread — displayed in chronological order (oldest first) within a single conversation view, similar to an email client. Every reply inherits the original priority and category but can be overridden.

### 3.4 Announcement Board

Head Office and Sambhag can post Announcements — messages displayed prominently on every user's Dashboard (not just the inbox). Announcements have:
- Title and body
- Effective date range (visible from / visible until)
- Targeted scope (All / specific Sambhag / specific class of schools)
- Pinned or not pinned

The dashboard shows up to 5 active pinned announcements. Archived announcements are searchable.

### 3.5 Service Delivery Request Tracker

Schools frequently need to follow up on service requests: SAATF claim status, AKP approval, book dispatch, training registration confirmation, etc. Instead of phone calls, schools raise a Service Request through the platform.

**Service Request Form:**
- Request Type (from master list, configurable): SAATF Claim Status / AKP Approval / Book Dispatch / Exam Registration Issue / Fee Receipt Issue / Login Problem / Other
- Subject
- Description (detailed text)
- Related Module (Accounts / Exams / Prakashan / Establishment / Other)
- Reference ID (optional — e.g., AKP Payment ID or SAATF Member ID)
- Attachment (up to 3 files)
- Priority: Normal / Urgent

**Service Request Lifecycle:**
```
SSVM raises request → Assigned to responsible desk (auto-routed by Request Type)
    ↓
Desk responds with status update → SSVM notified
    ↓
Further back-and-forth (thread model)
    ↓
Desk marks Resolved → SSVM notified → SSVM can reopen within 7 days
    ↓
Closed
```

**Service Request Tracking View (SSVM):**
- All my requests with status: Open / In Progress / Resolved / Closed / Reopened
- Last update date and who updated
- Thread of all back-and-forth messages
- Reopen button (within 7 days of resolution)

**Service Request Management View (Head Office / Sambhag):**
- All requests assigned to my desk
- Filter by Status, Request Type, SSVM, Priority, Date
- SLA indicator: requests approaching or past response SLA highlighted
- Assign to user, add internal notes (not visible to SSVM)
- Bulk actions: Assign, Close, Change Priority

**Default SLA targets (configurable by Super Admin):**
| Priority | First Response | Resolution |
|----------|---------------|-----------|
| Urgent | 4 hours | 24 hours |
| Normal | 24 hours | 72 hours |

### 3.6 Notification Centre

A consolidated Notification Centre (bell icon in nav) shows:
- Unread messages in inbox
- Unacknowledged communications with deadline
- Service request status updates
- Announcements
- System alerts (from P-01 compliance, P-12 escalations)

Notifications can be dismissed or snoozed (1 hour, 1 day). Settings allow users to configure which notification types trigger SMS/email vs. in-app only.

### 3.7 Communication Archive

All communications (sent and received) are stored permanently and searchable:
- Search by: Keyword, Sender, Recipient, Category, Date Range
- Filter by: Read / Unread, Acknowledged, Priority
- No deletion allowed (communications are archived, not deleted)
- Export: Selected communications to PDF

---

## 4. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Inbox Load | < 2 seconds for a user with 500+ messages |
| Search | Full-text search results in < 3 seconds |
| Notification Delivery | In-app notifications within 30 seconds of message send |
| Archive Retention | Permanent (no TTL on communications) |
| SMS Integration | SMS for Urgent messages and SLA breach alerts |
| Concurrent Users | Support 1,500+ concurrent users without degradation |

---

## 5. Data Models

### 5.1 Messages Table
```
messages
├── message_id (UUID, PK)
├── thread_id (UUID — same as message_id for thread root; FK for replies)
├── parent_message_id (nullable — for replies)
├── sender_user_id (FK → users)
├── sender_role
├── sender_ssvm_code (nullable)
├── subject
├── body (TEXT — HTML)
├── category (ENUM)
├── priority (ENUM: NORMAL, URGENT)
├── read_receipt_required (BOOL)
├── acknowledgment_required (BOOL)
├── scheduled_at (nullable)
├── sent_at
├── expiry_date (nullable)
└── status (DRAFT / SENT / SCHEDULED)
```

### 5.2 Message Recipients Table
```
message_recipients
├── recipient_id (UUID, PK)
├── message_id (FK → messages)
├── recipient_user_id (FK → users, nullable for scope-based sends)
├── recipient_scope_type (USER / SSVM / SANKULA / BIBHAG / SAMBHAG / ROLE)
├── recipient_scope_id
├── delivered_at
├── read_at
├── acknowledged_at
└── is_archived (BOOL)
```

### 5.3 Service Requests Table
```
service_requests
├── request_id (UUID, PK)
├── ssvm_code
├── raised_by_user_id (FK → users)
├── request_type
├── subject
├── description (TEXT)
├── related_module
├── reference_id (nullable)
├── priority (ENUM)
├── status (ENUM: OPEN, IN_PROGRESS, RESOLVED, CLOSED, REOPENED)
├── assigned_to_user_id (nullable)
├── first_response_at (nullable)
├── resolved_at (nullable)
├── closed_at (nullable)
├── sla_first_response_due
├── sla_resolution_due
└── created_at
```

### 5.4 Announcements Table
```
announcements
├── announcement_id (UUID, PK)
├── title
├── body (TEXT — HTML)
├── scope (JSON)
├── effective_from
├── effective_until
├── is_pinned (BOOL)
├── published_by (FK → users)
└── published_at
```

---

## 6. UI Screens

| Screen | Path | Role Access | Description |
|--------|------|-------------|-------------|
| Unified Inbox | /messages/inbox | All | All received communications |
| Compose Message | /messages/compose | All | Compose and send |
| Thread View | /messages/thread/:threadId | All | Full conversation thread |
| Sent Messages | /messages/sent | All | All sent messages |
| Announcement Board | /announcements | All | Active announcements |
| Manage Announcements | /announcements/manage | HO, Sambhag | Create/edit announcements |
| Service Requests (SSVM) | /service-requests | SSVM, Sankula | My requests |
| New Service Request | /service-requests/new | SSVM, Sankula | Raise a new request |
| Service Request Detail | /service-requests/:id | All | Full thread + status |
| Service Desk | /service-desk | HO, Sambhag | Manage incoming requests |
| Notification Centre | /notifications | All | All notifications |
| Communication Archive | /messages/archive | All | Searchable archive |
| Communication Analytics | /messages/analytics | HO, Sambhag | Read rates, SLA metrics |

---

## 7. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/messages/inbox | Get inbox messages |
| POST | /api/messages | Send a message |
| GET | /api/messages/thread/:threadId | Get full thread |
| POST | /api/messages/:id/acknowledge | Acknowledge a message |
| POST | /api/messages/:id/reply | Reply to a message |
| GET | /api/announcements | Get active announcements |
| POST | /api/announcements | Create announcement |
| GET | /api/service-requests | List service requests |
| POST | /api/service-requests | Raise a service request |
| PATCH | /api/service-requests/:id | Update status/assignment |
| POST | /api/service-requests/:id/reply | Add reply to service request |
| GET | /api/notifications | Get notifications for user |
| PATCH | /api/notifications/:id/dismiss | Dismiss a notification |

---

## 8. Implementation Plan

### Phase 1 — Core Messaging (Weeks 1–2)
- [ ] Build message schema and sender/recipient resolution for scope-based sends
- [ ] Implement compose and send API (with attachment upload)
- [ ] Build inbox API with filters and pagination
- [ ] Build thread view API
- [ ] Build read-tracking (mark as read on open)
- [ ] Build acknowledgment flow
- [ ] Basic inbox UI with thread view

### Phase 2 — Service Requests (Weeks 2–3)
- [ ] Build service request schema with SLA fields
- [ ] Implement service request creation and assignment routing
- [ ] Build service desk management view (filter, assign, respond)
- [ ] Implement SLA tracking and breach alerts
- [ ] Build SSVM-facing request status view

### Phase 3 — Notifications & Announcements (Weeks 3–4)
- [ ] Build notification queue and delivery service (in-app)
- [ ] Integrate SMS gateway for Urgent notifications
- [ ] Build notification centre UI
- [ ] Build announcement creation and display
- [ ] Implement announcement scope targeting

### Phase 4 — Archive, Search & Analytics (Weeks 4–5)
- [ ] Implement full-text search on messages (use PostgreSQL full-text or Elasticsearch)
- [ ] Build communication archive screen
- [ ] Build communication analytics dashboard (read rates, response times, SLA metrics)
- [ ] Build export functionality

### Phase 5 — Testing (Week 6)
- [ ] Test scope-based sends to 1,000 SSVMs — confirm delivery records created
- [ ] Test SLA breach alert at correct threshold
- [ ] Load test inbox for user with 500+ messages
- [ ] Test full-text search across large message archive
- [ ] Test SMS delivery for Urgent messages

---

## 9. Integration Points

| Integration | Description |
|-------------|-------------|
| P-12 Hierarchy Engine | P-12 provides escalation logic; P-04 is the user-facing interface |
| P-02 Publication Module | Publications share the notification infrastructure |
| P-11 RBAC | Sender/recipient scope resolution uses the role hierarchy from P-11 |
| P-01 Compliance | Compliance violation alerts are delivered through the notification centre |
| SMS Gateway | Urgent communications and SLA breaches trigger SMS |

---

## 10. Acceptance Criteria

- [ ] An SSVM user can send a message to Sambhag and receive a reply in a thread view
- [ ] Head Office sends a message to "All SSVMs" — 1,000 delivery records created within 60 seconds and all SSVMs see it in their inbox
- [ ] A message with Acknowledgment Required shows an "Acknowledge" button; after clicking, Head Office tracking shows the SSVM as Acknowledged
- [ ] A Service Request raised by SSVM is auto-routed to the correct desk and shows "In Progress" after the desk responds
- [ ] SLA breach alert is sent (in-app + SMS) when a Normal priority request exceeds 24 hours without a first response
- [ ] Full-text search on a keyword returns matching messages within 3 seconds for a dataset of 50,000 messages
- [ ] Communications cannot be deleted by any user — only archived

---

## 11. Developer Notes

- For scope-based sends (e.g., "All SSVMs under Sambhag X"), resolve the scope to individual user IDs at send time and create one `message_recipients` row per user — do not resolve at read time (too slow for large scopes)
- Use a background job queue (e.g., Redis + Bull) for large sends — sending to 1,000 SSVMs must not block the HTTP response
- Full-text search: use PostgreSQL `tsvector` / `tsquery` for initial implementation; consider Elasticsearch if search performance degrades past 100,000 messages
- SMS should be sent via a reliable gateway with delivery receipts (e.g., Twilio, MSG91) — store delivery receipt status per message
- Archive is immutable — soft delete only (set `is_archived = true`); raw data is never deleted
- Thread model: all replies share the same `thread_id` (root message ID); use recursive CTE to fetch full thread in correct order
