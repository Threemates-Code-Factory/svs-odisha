# P-12 · Communication Channel Across the Complete Hierarchy

**Module Code:** P-12  
**Priority:** 🔴 Critical  
**Estimated Effort:** 5–6 Weeks  
**Team:** 1 Senior Backend Developer + 1 Frontend Developer + 1 QA  
**Depends On:** P-11 (RBAC), P-04 (Communication UI), SMS Gateway, Notification Service  

---

## 1. Module Overview

P-04 builds the user-facing inbox and compose interface. P-12 is the **underlying engine** that makes communication organisationally structured, enforceable, and intelligent across the full 5-tier hierarchy. While P-04 is what users see, P-12 governs how communications flow, escalate, and are tracked at the network level.

The key differentiator: P-12 introduces **mandatory acknowledgment enforcement**, **SLA-based escalation**, **horizontal coordination** (between Bibhags in the same Sambhag), **broadcast targeting** (send to specific school types or classes), and **communication analytics** that let Head Office understand the health of their communication network.

---

## 2. Functional Requirements

### 2.1 Multi-Directional Communication Flow

The engine supports three communication directions, each with its own routing rules:

**Top-Down (Head Office → Sambhag → Bibhag → Sankula → SSVM):**
- Head Office can address any level directly (not just the next level)
- Sambhag can address any level within their scope
- Message can be: Broadcast (all recipients in scope) or Targeted (specific selection)

**Bottom-Up (SSVM → Sankula → Bibhag → Sambhag → Head Office):**
- SSVM sends to their immediate Sankula by default
- SSVM can escalate directly to Bibhag or Sambhag if the Sankula does not respond within SLA
- Direct escalation to Head Office is restricted to Urgent priority only
- Bottom-up messages are classified as: Report / Request / Complaint / Query

**Horizontal (Between peers at the same tier):**
- Bibhag ↔ Bibhag within the same Sambhag (for coordination)
- Sankula ↔ Sankula within the same Bibhag
- SSVM ↔ SSVM within the same Sankula (facilitated by Sankula admin)
- Horizontal communication requires the parent tier admin's approval to initiate (prevent noise)

### 2.2 Broadcast Targeting Engine

Head Office can broadcast to precisely defined segments without manual filtering:

**Broadcast Target Types:**
- All SSVMs in the network
- SSVMs in a specific Sambhag / Bibhag / Sankula
- SSVMs by school type (Primary only / Secondary only / Higher Secondary)
- SSVMs in specific Zilas (districts) — e.g., "All SSVMs in Koraput, Malkangiri, and Nawarangapur"
- SSVMs with a specific attribute (e.g., > 200 students, or government-recognised)
- Staff by designation (all Pradhan Acharyas in a Sambhag)

Target resolution: at send time, the engine resolves the segment to a list of individual user IDs and creates delivery records.

### 2.3 SLA Enforcement and Escalation

Every message that has "Action Required" or "Acknowledgment Required" is tracked against an SLA:

**SLA Tiers (configurable by Super Admin):**
| Priority | Acknowledgment SLA | Response SLA | Escalation SLA |
|----------|-------------------|--------------|----------------|
| Critical | 2 hours | 6 hours | 1 hour past acknowledgment SLA |
| Urgent | 6 hours | 24 hours | 2 hours past acknowledgment SLA |
| Normal | 48 hours | 5 business days | 24 hours past acknowledgment SLA |

**Escalation Logic:**
1. Message sent to SSVM with Acknowledgment Required
2. T+SLA: No acknowledgment → Reminder sent to SSVM + Sankula admin notified
3. T+Escalation SLA: Still no acknowledgment → Sankula admin must respond on SSVM's behalf OR escalate to Bibhag
4. T+2×Escalation SLA: Still unresolved → Bibhag admin notified; SSVM flagged in Compliance Dashboard (P-01)
5. For Critical messages: Head Office is notified at Step 3 (not Step 4)

Escalation records are stored — who was notified, when, what action was taken.

### 2.4 Communication Analytics Dashboard

Available to Head Office (all scopes) and Sambhag/Bibhag (their scope):

**Metrics Displayed:**
- Acknowledgment Rate by Sambhag, Bibhag, Sankula, SSVM (% of messages acknowledged within SLA)
- Average Response Time by level
- Non-responsive Schools: SSVMs that have not acknowledged 3+ messages in the last 30 days
- Communication Volume: messages sent per week by category
- Escalation Frequency: how often messages escalate past first level
- SLA Breach Rate: % of messages that breach SLA before acknowledgment
- Bottom-up Volume: how many queries/complaints SSVMs are raising (high volume may indicate a systemic issue)

**Visualisations:**
- Heat map of acknowledgment rates across the state
- Time series chart: communication volume over time
- Bar chart: SLA compliance by Sambhag

### 2.5 Structured Bottom-Up Report Templates

To reduce noise and improve the quality of bottom-up communications, SSVMs use structured templates for common report types:

| Template | Frequency | Fields |
|----------|-----------|--------|
| Monthly Attendance Report | Monthly | Class-wise attendance % for each week |
| Infrastructure Issue Report | As needed | Issue type, severity, photo, estimated cost |
| Staff Shortage Report | As needed | Subject, class level, urgency |
| Student Welfare Concern | As needed | Number affected, nature of concern, action taken |

Templates are managed by Head Office (add/edit/disable). SSVM fills the template form — structured data is stored, not a free-text message.

### 2.6 Communication Archive and Search

- All communications (including escalations) are permanently archived
- Search: keyword, sender, recipient, category, date range, SLA status
- Role-scoped: each user can only search within their scope's communications
- Head Office can search the entire archive
- Export: filtered results to Excel or PDF for compliance submissions

---

## 3. Data Models

### 3.1 Communication Events Table
```
communication_events
├── event_id (UUID, PK)
├── thread_id (UUID)
├── direction (ENUM: TOP_DOWN, BOTTOM_UP, HORIZONTAL)
├── sender_user_id (FK → users)
├── sender_scope_level (ENUM: HEAD_OFFICE, SAMBHAG, BIBHAG, SANKULA, SSVM)
├── sender_scope_id
├── target_type (ENUM: INDIVIDUAL, SEGMENT, BROADCAST)
├── target_definition (JSONB — scope or segment definition)
├── category (ENUM: ANNOUNCEMENT, CIRCULAR, REPORT, REQUEST, COMPLAINT, QUERY)
├── priority (ENUM: CRITICAL, URGENT, NORMAL)
├── subject
├── body (TEXT)
├── action_required (BOOL)
├── acknowledgment_required (BOOL)
├── acknowledgment_sla_hours
├── response_sla_hours
├── sent_at
└── expiry_at (nullable)
```

### 3.2 Communication Deliveries Table
```
communication_deliveries
├── delivery_id (UUID, PK)
├── event_id (FK → communication_events)
├── recipient_user_id (FK → users)
├── recipient_ssvm_code (nullable)
├── delivered_at
├── read_at (nullable)
├── acknowledged_at (nullable)
├── escalation_level (INT — 0=not escalated, 1=Sankula notified, 2=Bibhag notified)
├── last_escalated_at (nullable)
└── is_sla_breached (BOOL)
```

### 3.3 Escalation Log Table
```
escalation_log
├── escalation_id (UUID, PK)
├── delivery_id (FK)
├── escalated_to_user_id (FK → users)
├── escalated_to_role
├── escalation_reason (SLA_BREACH / MANUAL)
├── escalated_at
└── resolution (nullable TEXT)
```

### 3.4 Communication Templates Table
```
communication_templates
├── template_id (UUID, PK)
├── template_name
├── template_type (REPORT / REQUEST / COMPLAINT)
├── fields_schema (JSONB — array of field definitions)
├── frequency (MONTHLY / AS_NEEDED)
├── is_active (BOOL)
└── created_by
```

---

## 4. Implementation Plan

### Phase 1 — Engine Core (Weeks 1–2)
- [ ] Build communication event schema and delivery record creation
- [ ] Implement broadcast target resolver (segment → user ID list) — must be async for large segments
- [ ] Implement SLA timer tracking for each delivery record
- [ ] Implement escalation trigger (cron job checks overdue deliveries every 30 minutes)

### Phase 2 — Escalation & Notifications (Weeks 2–3)
- [ ] Build escalation notification delivery (in-app + SMS)
- [ ] Implement escalation log creation at each escalation step
- [ ] Build manual escalation (SSVM can escalate directly to Bibhag after SLA breach)
- [ ] Integrate with P-04 inbox for delivery display

### Phase 3 — Horizontal Communication & Templates (Weeks 3–4)
- [ ] Implement horizontal communication routing with parent approval
- [ ] Build structured report template management
- [ ] Build SSVM-facing template fill form

### Phase 4 — Analytics & Archive (Weeks 4–5)
- [ ] Build communication analytics dashboard with all metrics
- [ ] Build heat map (acknowledgment rate by SSVM, Sambhag)
- [ ] Build archive search with all filters
- [ ] Build export functionality

### Phase 5 — Testing (Week 6)
- [ ] Test SLA escalation triggers at correct timestamps
- [ ] Test broadcast to 1,000 SSVMs — all delivery records created, all notified
- [ ] Test horizontal communication gating (parent approval required)
- [ ] Load test analytics dashboard query for 6 months of archive data

---

## 5. Acceptance Criteria

- [ ] A Critical message sent by Head Office to all SSVMs creates delivery records for all in-scope users and triggers in-app notifications within 2 minutes
- [ ] A delivery record not acknowledged within the Critical SLA triggers an escalation notification to the Sankula admin at exactly the SLA breach time
- [ ] Communication analytics dashboard shows correct acknowledgment rate for the last 30 days, scoped correctly per role
- [ ] Horizontal message between two Bibhags requires Sambhag admin approval before delivery proceeds
- [ ] Non-responsive schools list correctly identifies SSVMs with ≥ 3 unacknowledged messages in the last 30 days
- [ ] Full archive search returns results for a keyword across 12 months of communications within 5 seconds

---

## 6. Developer Notes

- The escalation cron job should run every 30 minutes and process only deliveries where `sla_deadline` has passed and `acknowledged_at IS NULL` — use an indexed query on these two conditions
- For large broadcasts (1,000 SSVMs), the target resolver must be a background job — do not block the HTTP response; return a `202 Accepted` with a job ID, and the client polls for completion
- SLA deadlines should be stored as absolute UTC timestamps (computed at send time as `sent_at + sla_hours`) — not computed on the fly — for reliable cron-based escalation
- Communication analytics queries on large archives will be slow — pre-aggregate daily stats in a summary table (nightly batch job) and query the summary table for the dashboard
