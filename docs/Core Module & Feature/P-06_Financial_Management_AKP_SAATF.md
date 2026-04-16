# P-06 · Financial Management Panel — AKP, SAATF & Trust Fund

**Module Code:** P-06  
**Priority:** 🔴 Critical  
**Estimated Effort:** 7–9 Weeks  
**Team:** 1 Senior Backend Developer (Finance/Accounting) + 1 Frontend Developer + 1 QA  
**Depends On:** P-05 (Staff Profiles), P-11 (RBAC), Payment Gateway Integration  

---

## 1. Module Overview

Three financial welfare schemes — Acharya Kalyana Panthi (AKP), Seva Anutoshika Anudan Trust Fund (SAATF), and the general Trust Fund — are the financial backbone of SVS Odisha's staff welfare system. Currently managed in separate modules with no integration, the gaps are severe: no unified dashboard, paper-based claims, no online disbursement slips, and offline payment reconciliation failures.

This module consolidates all three schemes into a **Comprehensive Financial Operations Panel** with a unified dashboard, online claim filing, automated disbursement slip generation, real-time payment reconciliation, and fund-level reporting.

---

## 2. Functional Requirements

### 2.1 Unified Finance Dashboard

Available to Head Office (all schemes, all SSVMs) and Sambhag/Bibhag (their scope):

**Dashboard Cards (per scheme):**
- Total Members (active)
- Total Contributions Received (current month, current year)
- Pending Claims Count and Total Claim Value
- Approved Claims Pending Disbursement
- Disbursed Amount (current month, current year)
- Scheme Fund Balance (AKP Pool / SAATF Corpus)
- Interest/Returns (SAATF & Trust Fund)

**Cross-Scheme Summary:**
- Total welfare commitments across all three schemes
- Upcoming disbursement obligations (next 30 days)
- Schools with outstanding contribution arrears

### 2.2 AKP (Acharya Kalyana Panthi)

**Membership Management:**
- Register new AKP member (links to Sevabrati profile)
- Membership fields: Member ID, Sevabrati ID, SSVM, Contribution Rate, Date of Enrolment, Nominee(s)
- Membership approval workflow: SSVM submits → Sankula reviews → Head Office approves
- Member status: Active / Suspended (arrears > 3 months) / Closed (resigned/retired)

**Contribution Collection:**
- SSVM records monthly contributions received per member
- System validates: total matches (member count × rate) for the period
- Send to Head Office: batch payment (online via payment gateway OR offline cheque with entry)
- Online payment: integration with payment gateway; receipt auto-generated
- Offline payment: SSVM enters cheque number, date, bank; Head Office confirms on receipt

**Claim Filing (Member):**
- Member (or school on their behalf) files claim online
- Claim types (configurable): Medical Assistance, Marriage Assistance, Death Benefit, Retirement Benefit
- Claim form: Member ID, Claim Type, Amount Requested, Reason, Supporting Documents (upload)
- Claim workflow: SSVM submits → Sankula verifies → Head Office approves/rejects
- Member notified at each stage via in-app + SMS

**Disbursement:**
- On approval, disbursement slip auto-generated (PDF) with: Member name, SSVM, Claim Type, Amount, Bank Account details, Approval authority name and digital signature
- Head Office records actual disbursement date and payment mode
- Member receives disbursement notification

**AKP Reports:**
- Member list (active, suspended, closed)
- Contribution history (member-wise, SSVM-wise, month-wise)
- Payment status (sent vs. confirmed at Head Office)
- Claim ledger (filed, approved, rejected, disbursed)
- Fund balance summary
- Arrear report (SSVMs with outstanding contributions)

### 2.3 SAATF (Seva Anutoshika Anudan Trust Fund)

Same workflow structure as AKP but with SAATF-specific rules:

**Monthly Contribution Statement:**
- Auto-generated per SSVM per month based on active member list
- Shows each member's expected contribution for the month
- SSVM confirms which members paid and records any exceptions

**Consolidated Ledger:**
- Full ledger with all credits (contributions) and debits (claim disbursements, admin fees)
- Interest/investment returns credited to corpus
- Opening balance, period transactions, closing balance per period
- Exportable as Excel for external audit submission

**Nominee Management:**
- Each SAATF member must have at least one nominee
- Nominee update workflow (member request → HO approval)
- Death benefit: automatically triggered claim for nominee on member's death (confirmed by SSVM)

### 2.4 Trust Fund

- General trust fund contributions tracked separately from AKP and SAATF
- Corpus management: track investments (FDs, bonds), maturity dates, interest earned
- Annual fund performance report: opening corpus, receipts, disbursements, investment returns, closing corpus

### 2.5 Payment Reconciliation Engine

- Online payments: auto-reconciled on gateway callback (webhook)
- Offline payments: SSVM entry pending confirmation — Head Office confirms on receipt of physical cheque
- Reconciliation dashboard: matched vs. unmatched transactions
- Mismatch alerts: amount entered by SSVM does not match gateway confirmation
- Monthly reconciliation report: all transactions, matched status, outstanding items

---

## 3. Data Models

### 3.1 Scheme Members Table
```
scheme_members
├── member_id (UUID, PK)
├── scheme (ENUM: AKP, SAATF, TRUST_FUND)
├── sevabrati_id (FK → sevabrati)
├── ssvm_code
├── contribution_rate
├── enrolment_date
├── status (ENUM: ACTIVE, SUSPENDED, CLOSED)
├── nominees (JSONB — array of nominee objects)
└── approved_at
```

### 3.2 Contributions Table
```
contributions
├── contribution_id (UUID, PK)
├── scheme
├── member_id (FK → scheme_members)
├── ssvm_code
├── period_month (YYYY-MM)
├── amount
├── payment_mode (ENUM: ONLINE, OFFLINE_CHEQUE, OFFLINE_CASH)
├── payment_reference (cheque number or gateway ref)
├── ssvm_entry_at
├── ho_confirmed_at (nullable)
└── reconciliation_status (ENUM: PENDING, MATCHED, MISMATCHED)
```

### 3.3 Claims Table
```
claims
├── claim_id (UUID, PK)
├── scheme
├── member_id (FK → scheme_members)
├── claim_type
├── amount_requested
├── amount_approved (nullable)
├── reason
├── documents (JSONB — array of file refs)
├── status (ENUM: DRAFT, SUBMITTED, SANKULA_VERIFIED, APPROVED, REJECTED, DISBURSED)
├── submitted_at
├── approved_at (nullable)
├── disbursed_at (nullable)
└── disbursement_slip_url (nullable)
```

---

## 4. Implementation Plan

### Phase 1 — Schema & Core (Weeks 1–2)
- [ ] Build unified scheme_members, contributions, and claims tables
- [ ] Migrate existing AKP and SAATF data
- [ ] Implement membership registration and approval workflows

### Phase 2 — Contributions & Payments (Weeks 3–4)
- [ ] Build monthly contribution statement generation
- [ ] Implement online payment gateway integration (webhook reconciliation)
- [ ] Implement offline payment entry and confirmation
- [ ] Build reconciliation dashboard

### Phase 3 — Claims & Disbursements (Weeks 5–6)
- [ ] Build claim filing form with document upload
- [ ] Implement multi-level claim approval workflow
- [ ] Build disbursement slip PDF generation
- [ ] Implement disbursement recording

### Phase 4 — Dashboard & Reports (Weeks 7–8)
- [ ] Build unified finance dashboard
- [ ] Build all AKP and SAATF reports
- [ ] Build consolidated ledger with Excel export
- [ ] Build Trust Fund corpus tracking

### Phase 5 — Testing (Week 9)
- [ ] Test payment gateway webhook reconciliation with simulated payments
- [ ] Test claim approval chain and disbursement slip generation
- [ ] Test arrear detection accuracy

---

## 5. Acceptance Criteria

- [ ] Unified dashboard shows correct AKP, SAATF, and Trust Fund balances for Head Office
- [ ] Online contribution payment auto-reconciles within 60 seconds of gateway confirmation
- [ ] Offline cheque entry stays "Pending" until Head Office confirms; mismatch in amount triggers alert
- [ ] Claim approval workflow sends notification to SSVM at each stage change
- [ ] Disbursement slip PDF generates with correct member details, amount, and digital signature
- [ ] SAATF consolidated ledger balances to zero (credits = debits + closing balance)
- [ ] Arrear report correctly identifies SSVMs with > 2 months' unpaid contributions
