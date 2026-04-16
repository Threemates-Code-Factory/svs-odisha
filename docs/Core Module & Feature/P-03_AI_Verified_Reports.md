# P-03 · AI-Based Verified and Authentic Reports

**Module Code:** P-03  
**Priority:** 🔴 High  
**Estimated Effort:** 5–7 Weeks  
**Team:** 1 Senior Backend Developer (ML/Data) + 1 Frontend Developer + 1 QA  
**Depends On:** P-01 (Compliance & Audit), All data modules, Reporting Engine  

---

## 1. Module Overview

The SVS EMS currently generates 50+ report types from data entered manually by 800–1,000 schools. Since there is no verification layer, these reports are only as trustworthy as the humans who entered the data. Auditors from the state education department, trust fund inspectors, and internal reviewers must manually cross-check multiple reports to identify discrepancies — a process that takes weeks.

This module adds an **AI-assisted verification and authenticity layer** on top of the existing reporting engine. It does not replace reports; it augments them with:

1. **Trust Scores** — a calculated confidence rating for each report section based on data consistency, cross-module corroboration, and historical deviation
2. **Anomaly Annotations** — inline flags within reports where specific data points deviate from expected patterns
3. **Data Lineage** — every value in a report can be traced to the original entry, the user who entered it, and any subsequent modifications
4. **Digital Signatures** — reports can be digitally signed by the SSVM Principal, Sankula, Sambhag, and Head Office, creating a tamper-evident compliance record
5. **AI Narrative Summary** — a plain-language summary generated for each report explaining key findings, anomalies, and recommended follow-up

This module is especially critical for reports submitted to the state education department and during trust fund audits.

---

## 2. Problem Statement (Current Gaps)

| # | Current Gap | Consequence |
|---|-------------|-------------|
| 1 | Reports come directly from manual data entry | No way to distinguish authentic data from fabricated data |
| 2 | No anomaly detection in reports | Inflated admissions, duplicate fee entries go unnoticed |
| 3 | Manual cross-module reconciliation | Auditors spend weeks checking Sahajoga Rasi vs SAATF vs exam records |
| 4 | No data lineage | Cannot trace a value in a report back to who entered it and when |
| 5 | No digital signatures | Reports are not tamper-evident; printed copies can be altered |
| 6 | Reports show numbers but no context | No automated narrative explaining what the numbers mean |

---

## 3. Functional Requirements

### 3.1 Trust Score Engine

For every report generated, the system computes a **Trust Score** (0–100) for each major data section. The score is based on:

| Factor | Weight | Description |
|--------|--------|-------------|
| Cross-module corroboration | 35% | Data consistent across related modules (e.g., student count matches fee collection) |
| Historical deviation | 25% | Current value within ±40% of the 3-year rolling average for this SSVM |
| Audit trail completeness | 20% | All records have complete audit trail with no gaps |
| Data completeness | 15% | Required fields populated, no null values in key columns |
| Duplicate detection | 5% | No duplicates detected in the relevant dataset |

Score bands:
- **90–100: Verified** (green) — High confidence, minimal anomalies
- **70–89: Mostly Verified** (yellow) — Minor anomalies detected, review recommended
- **50–69: Needs Review** (orange) — Significant anomalies, manual verification needed
- **0–49: Flagged** (red) — Critical anomalies, report should not be used for compliance without investigation

Trust Score is displayed as a badge on every report header and each report section.

### 3.2 Anomaly Annotations (Inline Report Flags)

When a report is generated, the engine scans each data point and annotates anomalies inline within the report view:

| Anomaly Type | Example | Display |
|-------------|---------|---------|
| Statistical outlier | Student strength 3× higher than school's 3-year average | 🔴 Red inline flag |
| Cross-module mismatch | Fee collection exceeds expected from student count | 🔴 Red inline flag |
| Historical spike | 150% admission increase year-over-year | 🟠 Orange inline flag |
| Data completeness gap | 12% of staff records missing Aadhaar | 🟡 Yellow inline flag |
| Soft duplicate | Two staff with identical Name + DOB but different IDs | 🟡 Yellow inline flag |

Each flag is clickable — expanding shows: what rule triggered the flag, what the expected value was, the actual value, and a link to the source record.

### 3.3 Data Lineage Panel

Every value in a report can be traced to its origin. A "Lineage" button on each report row opens a panel showing:

- The source table and record ID
- The user who created the original entry (name, role, login time)
- All subsequent modifications (from the audit log): who changed it, when, what changed
- The current value and the history of all previous values

This is implemented by joining the audit log (from P-01) with report data at generation time.

### 3.4 Digital Signature Workflow

Reports can be locked and digitally signed through a multi-level signing process:

**Level 1: SSVM Principal**
- Generates the report
- Reviews anomaly flags
- If satisfied, clicks "Sign & Lock" — adds the principal's digital signature with timestamp
- Once signed, the underlying data cannot be changed without breaking the signature

**Level 2: Sankula Admin (optional, configurable per report type)**
- Reviews the SSVM-signed report
- Adds counter-signature

**Level 3: Sambhag Admin**
- Reviews all SSVM and Sankula-signed reports in their scope
- Adds final Sambhag-level signature

**Level 4: Head Office**
- Receives fully signed consolidated reports
- Can submit to external authorities with all signature chain intact

Signature implementation: SHA-256 hash of the report data payload, signed with the user's unique key (managed by the system — no external PKI needed for initial version). Signature chain stored in `report_signatures` table.

### 3.5 AI Narrative Summary

When a report is generated, the system sends the report data and anomaly flags to the Claude API (or similar LLM) to generate a plain-language narrative summary. This summary appears at the top of each report:

**Example for a Sahajoga Rasi Report:**
> "This fee collection report for SSVM Bhojpur (2025–26) covers 342 students across 14 classes. The total collection of ₹8,54,000 is within the expected range based on the declared student strength. However, Class IX shows a 28% shortfall compared to the fee rate × enrolled students. Two students appear in the fee collection list without corresponding admission records (Admission Nos. ADM-2024-0291, ADM-2024-0302). Trust Score: 74 — Mostly Verified. Recommended action: verify Class IX shortfall with SSVM Principal."

The narrative is generated on-demand (not automatically for every report) and cached per report version.

### 3.6 Consolidated Verification Report

Head Office can generate a **Network Verification Report** — a special report that aggregates Trust Scores, anomaly counts, and signature status across all SSVMs for a selected date range and report type. This is the primary deliverable for state-level compliance audits.

The Network Verification Report includes:
- SSVM-wise Trust Score table
- Heat map of Trust Scores across the state
- Count of unsigned reports (past due date)
- Top 10 SSVMs with lowest Trust Scores and highest anomaly counts
- Exportable as PDF with all signatures embedded

---

## 4. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Trust Score Computation | < 5 seconds per report for a single SSVM |
| Network Verification Report | < 3 minutes for all 1,000 SSVMs |
| AI Narrative | Generated within 10 seconds on demand |
| Report Export | PDF with inline anomaly flags and signature watermark |
| Signature Integrity | Signature verification must detect any post-signature data change |
| AI API Dependency | System must be gracefully operable without AI narrative (fallback: skip narrative, show score only) |

---

## 5. Data Models

### 5.1 Report Trust Scores Table
```
report_trust_scores
├── score_id (UUID, PK)
├── report_type
├── report_reference_id (unique key for the specific report instance)
├── ssvm_code
├── academic_year
├── generated_at
├── overall_score (0–100)
├── corroboration_score
├── deviation_score
├── completeness_score
├── duplicate_score
├── anomaly_count_critical
├── anomaly_count_high
├── anomaly_count_medium
├── score_band (VERIFIED / MOSTLY_VERIFIED / NEEDS_REVIEW / FLAGGED)
└── anomaly_detail (JSONB — array of anomaly objects)
```

### 5.2 Report Signatures Table
```
report_signatures
├── signature_id (UUID, PK)
├── report_type
├── report_reference_id
├── ssvm_code
├── signer_user_id (FK → users)
├── signer_role
├── signed_at
├── data_hash (SHA-256 of report payload at time of signing)
├── signature_level (1=SSVM, 2=SANKULA, 3=SAMBHAG, 4=HEAD_OFFICE)
└── is_valid (BOOL — recomputed on access to detect tampering)
```

### 5.3 Report Narratives Table
```
report_narratives
├── narrative_id (UUID, PK)
├── report_reference_id
├── generated_at
├── model_used (e.g., claude-sonnet-4)
├── prompt_version
├── narrative_text (TEXT)
└── generation_time_ms
```

---

## 6. UI Screens

| Screen | Path | Role Access | Description |
|--------|------|-------------|-------------|
| Enhanced Report View | /reports/:type/:id | All | Any existing report with Trust Score badge, inline flags, lineage panel |
| Anomaly Flag Detail | /reports/:type/:id/anomaly/:flagId | All | Expanded anomaly detail |
| Data Lineage Panel | /reports/:type/:id/lineage/:rowId | All | Trace a value to its origin |
| Sign Report | /reports/:type/:id/sign | SSVM, Sankula, Sambhag, HO | Signing confirmation and signature display |
| Signature Chain | /reports/:type/:id/signatures | All | View full signature chain and validation status |
| AI Narrative | /reports/:type/:id/narrative | All | Generate/view AI narrative |
| Network Verification Report | /reports/network-verification | Head Office | Consolidated trust dashboard for all SSVMs |

---

## 7. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/reports/:type/:id/trust-score | Compute/retrieve trust score |
| GET | /api/reports/:type/:id/anomalies | Get anomaly list for a report |
| GET | /api/reports/:type/:id/lineage/:rowId | Get lineage for a specific value |
| POST | /api/reports/:type/:id/sign | Sign and lock a report |
| GET | /api/reports/:type/:id/signatures | Get signature chain |
| POST | /api/reports/:type/:id/narrative | Generate AI narrative (on demand) |
| GET | /api/reports/network-verification | Get consolidated verification data |
| GET | /api/reports/:type/:id/export | Export report as PDF with flags and signatures |

---

## 8. Implementation Plan

### Phase 1 — Trust Score Engine (Weeks 1–2)
- [ ] Design trust score computation framework (pluggable scoring components)
- [ ] Implement cross-module corroboration checks (using P-01 consistency rules)
- [ ] Implement historical deviation baseline computation (3-year rolling average per SSVM)
- [ ] Implement audit trail completeness check
- [ ] Implement data completeness and duplicate detection components
- [ ] Store computed scores in `report_trust_scores`
- [ ] Display Trust Score badge on existing report views

### Phase 2 — Anomaly Annotations (Weeks 2–3)
- [ ] Build anomaly detection engine that annotates individual rows/values in reports
- [ ] Implement inline flag display in report views (red/orange/yellow flags)
- [ ] Build anomaly detail expansion panel
- [ ] Build data lineage panel (join audit log with report data)

### Phase 3 — Digital Signatures (Weeks 3–5)
- [ ] Design report payload hash computation (deterministic serialisation of report data)
- [ ] Implement SHA-256 hashing and signature storage
- [ ] Build signing UI for each level (SSVM → Sankula → Sambhag → HO)
- [ ] Implement signature validation on report access (detect post-signing changes)
- [ ] Build signature chain display panel
- [ ] Integrate signature watermark into PDF export

### Phase 4 — AI Narrative & Network Report (Weeks 5–6)
- [ ] Integrate Claude API for narrative generation
- [ ] Design prompt template for each major report type
- [ ] Implement narrative caching and regeneration
- [ ] Build Network Verification Report (aggregated scores, heat map)
- [ ] Export Network Verification Report as PDF

### Phase 5 — Testing (Week 7)
- [ ] Test trust score against known-good and known-bad datasets
- [ ] Test signature: modify data after signing, confirm `is_valid` = false detected
- [ ] Test AI narrative with edge cases (all zeros, extreme outliers)
- [ ] Performance test: Network Verification Report for 1,000 SSVMs

---

## 9. Integration Points

| Integration | Description |
|-------------|-------------|
| P-01 Compliance Module | Anomaly annotations reuse the cross-module violations from P-01 |
| Audit Log (P-01) | Lineage panel reads directly from the audit log |
| All Report Types | Trust score and anomaly layer wraps all 50+ existing report types |
| Claude API | AI narrative generation via Anthropic API |
| PDF Export | PDF generator must support annotation overlays and signature watermarks |

---

## 10. Acceptance Criteria

- [ ] A Sahajoga Rasi report with a known cross-module mismatch (fee > student count × rate) receives a Trust Score below 70 and shows a red flag on the relevant data row
- [ ] Data lineage panel shows the correct original entry user and all subsequent modifications for a selected value
- [ ] After SSVM Principal signs a report, modifying any underlying data record invalidates the signature (`is_valid` = false) and the report shows "Tampered" warning
- [ ] AI narrative generates within 10 seconds and correctly mentions the top anomalies present in the report
- [ ] Network Verification Report loads for 1,000 SSVMs within 3 minutes
- [ ] PDF export includes inline flags (colour-coded), Trust Score badge, and signature chain

---

## 11. Developer Notes

- Trust score computation should be triggered lazily (on first access) and cached; a background job invalidates the cache when underlying data changes
- For the SHA-256 report hash: serialize the report data to a canonical JSON string (sorted keys, no whitespace) before hashing — this ensures identical reports always produce the same hash
- AI narrative prompt should include: report type, key numbers, anomaly list, and instruction to write 3–5 sentences in plain English without jargon
- The AI narrative is supplementary — if the API call fails, show a retry button; do not block report access
- Historical baselines should be pre-computed nightly and stored in a baselines table — computing 3-year averages on the fly for 1,000 SSVMs will be too slow
- Anomaly flag colours should also be accessible (not colour-only) — add icons alongside colours for accessibility
