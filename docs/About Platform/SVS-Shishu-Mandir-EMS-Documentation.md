# SVS Odisha — Shiksha Vikash Samiti (SVS)
# Education Management System (EMS) — Comprehensive System Documentation

---

**System URL:** http://103.76.208.200/svsemsnew/  
**Organization:** Shiksha Vikash Samiti (SVS), Odisha  
**Platform:** ASP.NET Web Forms (.NET Framework)  
**Current Vendor:** CTSPL (Creative Technology Solutions Pvt. Ltd.)  
**Document Version:** 1.0  
**Date:** April 2026  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Overview & Objective](#2-system-overview--objective)
3. [Organizational Hierarchy & Structure](#3-organizational-hierarchy--structure)
4. [User Roles & Access Control](#4-user-roles--access-control)
5. [System Architecture & Technology Stack](#5-system-architecture--technology-stack)
6. [Module-wise Functional Specification](#6-module-wise-functional-specification)
   - 6.1 [Authentication & Login Module](#61-authentication--login-module)
   - 6.2 [Establishment Module](#62-establishment-module)
   - 6.3 [Accounts & Finance Module](#63-accounts--finance-module)
   - 6.4 [Acharya Chayana (Staff Recruitment) Module](#64-acharya-chayana-staff-recruitment-module)
   - 6.5 [Examinations Module](#65-examinations-module)
   - 6.6 [Sports & Games Module](#66-sports--games-module)
   - 6.7 [Prakashan (Publications) Order Module](#67-prakashan-publications-order-module)
   - 6.8 [Users Module](#68-users-module)
   - 6.9 [Correspondence / Mail Box Module](#69-correspondence--mail-box-module)
   - 6.10 [Help & Support (CRM Integration)](#610-help--support-crm-integration)
7. [Data Entities & Relationships](#7-data-entities--relationships)
8. [Key System Workflows](#8-key-system-workflows)
9. [Reports & Analytics](#9-reports--analytics)
10. [UI/UX & Navigation Structure](#10-uiux--navigation-structure)
11. [System Integration Points](#11-system-integration-points)
12. [Replication Scope — Features for New System](#12-replication-scope--features-for-new-system)

---

## 1. Executive Summary

The **SVS EMS (Education Management System)** is a web-based application used by **Shiksha Vikash Samiti, Odisha** — an organization that operates a network of **Saraswati Shishu Vidya Mandir (SSVM)** schools across the state of Odisha, India. The system serves as the central platform for managing the entire lifecycle of school administration including:

- **School (SSVM) Information Management**
- **Student Admission, Promotion & Status Tracking**
- **Employee/Sevabrati (Teacher/Staff) Management**
- **Accounts & Financial Transactions** (Fee Collection, Trust Funds, Donations)
- **Examination Registration, Payment & Result Management**
- **Staff Recruitment (Acharya Chayana)**
- **Sports & Games Event Management**
- **Publication (Prakashan) Ordering & Inventory**
- **Internal Correspondence (Mail Box System)**
- **CRM-based Help Desk / Complaint System**

The system follows a **hierarchical organizational structure** spanning from the **Head Office** down to individual **SSVM schools**, with role-based access control at each level.

---

## 2. System Overview & Objective

### 2.1 Purpose
The SVS EMS is designed to digitize and centralize all administrative, financial, and academic operations of the Saraswati Shishu Vidya Mandir (SSVM) school network managed by Shiksha Vikash Samiti in Odisha.

### 2.2 Core Objectives
| # | Objective | Description |
|---|-----------|-------------|
| 1 | **Centralized Data Management** | Single platform for all schools, staff, and students across Odisha |
| 2 | **Hierarchical Administration** | Multi-level management from Head Office → Sambhag → Bibhag → Sankula → SSVM |
| 3 | **Financial Transparency** | Track all financial transactions — fees, trust fund contributions, donations, payments |
| 4 | **Academic Management** | Student admissions, promotions, examinations, and certificates |
| 5 | **HR & Recruitment** | End-to-end staff requirement posting, candidate registration, and selection |
| 6 | **Communication** | Internal mail system with file attachments across organizational units |
| 7 | **Reporting** | Comprehensive reports at every level — school-wise, region-wise, consolidated |
| 8 | **Online Payment Integration** | Online and offline payment modes for various fees and contributions |

---

## 3. Organizational Hierarchy & Structure

The SVS operates on a **5-tier hierarchical structure** across the state of Odisha:

```
┌─────────────────────────────────────────────────────┐
│                    HEAD OFFICE                       │
│             (Shiksha Vikash Samiti)                  │
│              Central Administration                  │
├─────────────────────────────────────────────────────┤
│                    SAMBHAG                           │
│     (Regional Division — 9 Sambhags in Odisha)      │
│  Dakshina | Dakshina Paschim | Dakshina Purva |     │
│  Madhya | Paschim | Purva | Purvouttar |            │
│  Uttar | Uttar Purva                                │
├─────────────────────────────────────────────────────┤
│                    BIBHAG                            │
│     (Sub-Division under each Sambhag)               │
│  Example: Sambalpur, Rourkela, Baragada (under      │
│  Paschim Sambhag)                                   │
├─────────────────────────────────────────────────────┤
│                    SANKULA                           │
│     (Cluster of Schools under each Bibhag)          │
│  Example: Brajaraj Nagar, Burla, Deogarh,           │
│  Jharsuguda, Kuchinda, Sambalpur                    │
├─────────────────────────────────────────────────────┤
│                     SSVM                             │
│     (Individual School — Saraswati Shishu Vidya     │
│      Mandir)                                        │
│  Example: BAMRA, Bhojpur, Bilung, Gadaposh,         │
│  Jamankira, Khandokata, Kuchinda, Kuntara,          │
│  Laida, Solbaga                                     │
└─────────────────────────────────────────────────────┘
```

### 3.1 Geographical Coverage (from data observations)
- **9 Sambhags** covering all of Odisha
- **Multiple Bibhags** under each Sambhag
- **Multiple Sankulas** under each Bibhag
- **31 Zilas (Districts)** mapped: Angul, Balasore, Baragarh, Bhadrak, Bolangir, Boudh, Cuttack, Deogarh, Dhenkanal, Gajapati, Ganjam, Jagatsinghpur, Jajpur, Jharsuguda, Kalahandi, Kandhamal, Kendrapada, Kendujhar, Khurdha, Koraput, Malkangiri, Mayurbhanj, Nawarangapur, Nayagarh, Nuapada, Puri, Rayagada, Sambalpur, Subarnapur, Sundargarh
- **Hundreds of individual SSVM schools** across the state

---

## 4. User Roles & Access Control

The system implements **Role-Based Access Control (RBAC)** with 5 distinct user types:

| # | User Type | Access Level | Description |
|---|-----------|-------------|-------------|
| 1 | **Super Admin** | Full System | Complete control over all modules, data, and configurations across the entire organization |
| 2 | **Head Office** | Organization-wide | Central administration, approval workflows, consolidated reports, master data management |
| 3 | **Sambhag** | Regional Level | Manages all Bibhags, Sankulas, and SSVMs under their Sambhag; regional reports |
| 4 | **Sankula** | Cluster Level | Manages a cluster of SSVMs; cluster-level reports and oversight |
| 5 | **SSVM** | School Level | Individual school operations — student management, staff management, fee collection, exam registration, etc. |

### 4.1 Access Control Behavior
- **Cascading dropdowns:** Higher-level users see all entities below them; lower-level users see only their own data (dropdowns are disabled/locked)
- **Login page:** Role selection via dropdown → User ID → Password
- **Session tracking:** Username displayed in header (e.g., "Bhojpur[ssvm1156]")
- **Help Me Now** link available on login page for immediate CRM-based support

---

## 5. System Architecture & Technology Stack

| Component | Technology |
|-----------|-----------|
| **Platform** | ASP.NET Web Forms (Classic .NET Framework) |
| **Server-side Language** | C# / VB.NET |
| **Client-side** | HTML 4.0 Transitional, JavaScript, jQuery 1.7.2, jQuery UI |
| **AJAX** | ASP.NET AJAX (ScriptManager, UpdatePanel) |
| **CSS** | Custom ssvm.css stylesheet |
| **State Management** | ViewState (server-side, encrypted) |
| **Page Architecture** | Master Page with ContentPlaceHolder pattern |
| **Navigation** | Dropdown menu system (dropdown.js) |
| **Form Processing** | PostBack model with DoPostBack() |
| **Data Grid** | ASP.NET GridView with server-side paging |
| **Payment Gateway** | Online payment integration (for AKP, SAATF, Exam fees) |
| **Hosting** | Self-hosted on IP 103.76.208.200 |
| **UI Pattern** | Table-based layout, fixed-width design |

### 5.1 Application Structure
```
/svsemsnew/
├── Home/
│   ├── AdminHome.aspx          (Dashboard)
│   └── UserLogin.aspx          (Login)
├── Establishment/
│   ├── SchoolInformations.aspx (School Details)
│   ├── EmpListSSVM.aspx        (Employee List)
│   ├── StudentList.aspx        (Student Admission)
│   ├── StudClassPromotion.aspx (Class Promotion)
│   ├── StudentStatus.aspx      (Student Status)
│   ├── MailBox.aspx            (Mail Box)
│   ├── FileUploadList.aspx     (Compose Mail)
│   ├── EmpTrgRegList.aspx      (Training Registration)
│   └── rpt*.aspx              (Various Reports)
├── Accounts/
│   ├── SahajogaRasi*.aspx      (Fee Collection)
│   ├── AKP_*.aspx              (Acharya Kalyan Panthi)
│   ├── SAATF_*.aspx            (Trust Fund)
│   ├── *SanskrutiGyan*.aspx    (Cultural Knowledge Fees)
│   ├── PatraPatrika*.aspx      (Magazine Subscriptions)
│   ├── PayMiscFeesList.aspx    (Misc Payments)
│   ├── DonationPmt.aspx        (Donation/Sebasamarpan)
│   └── rpt*.aspx              (Financial Reports)
├── StaffSelection/
│   ├── StaffRequirementNewList.aspx
│   ├── CandidateList.aspx
│   └── rpt*.aspx              (Recruitment Reports)
├── Exams/
│   ├── StudentAdmissionList.aspx
│   ├── DRReportList.aspx
│   └── rpt*.aspx              (Exam Reports)
├── Sports/
│   ├── SportsParticipantNewList.aspx
│   └── Rpt*.aspx              (Sports Reports)
├── PrakasanInventory/
│   ├── InvOrderListSSVM.aspx
│   ├── InvOrderPmtList.aspx
│   └── InvRpt_*.aspx          (Inventory Reports)
├── Users/
│   └── ChangePW.aspx
├── Scripts/
│   ├── jquery-1.7.2.min.js
│   ├── jquery-ui.min.js
│   ├── dropdown.js
│   └── pngfix.js
├── css/
│   ├── ssvm.css
│   └── jquery-ui.css
├── images/
│   ├── LoginSaraswatiSVS.png
│   ├── home.gif
│   └── logout.jpg
└── Up_Files/
    ├── SahajogaRashiHelpManual.pdf
    ├── SVS_AKP_OnlinePayHelpManual.pdf
    ├── SVS_AATF_OnlinePayHelpManual.pdf
    ├── SVS_PrasishanaSulkaReg_OnlinePayHelpManual.pdf
    ├── SVS_Exam_Reg_OnlinePayHelpManual.pdf
    └── SVS_AcharyaChayan_Help.pdf
```

---

## 6. Module-wise Functional Specification

### 6.1 Authentication & Login Module

**Page:** `UserLogin.aspx`

#### Features:
| Feature | Description |
|---------|-------------|
| **User Type Selection** | Dropdown with 5 roles: Super Admin, Head Office, Sambhag, Sankula, SSVM |
| **Credential Entry** | User ID (text) + Password (password field) |
| **Auto-Focus** | Login form auto-focuses on User Type dropdown |
| **Help Link** | "Help Me Now" redirects to CRM complaint system |
| **Session Management** | Server-side session with encrypted ViewState |
| **Branding** | Organization logos (Saraswati image + SVS logo) on login page |

#### Login Flow:
```
User selects User Type → Enters User ID → Enters Password → Clicks "Login"
    ↓
Server validates credentials → Redirects to AdminHome.aspx (Dashboard)
    ↓
Navigation menu dynamically adjusts based on user role
```

---

### 6.2 Establishment Module

The **Establishment Module** is the core administrative module handling school, staff, and student management.

#### 6.2.1 Manage Schools
| Feature | Page | Description |
|---------|------|-------------|
| **School Details** | `SchoolInformations.aspx` | View/Edit SSVM school information — address, contact, infrastructure, managing committee |

**Reports:**
- SSVM List (basic)
- SSVM List (Detailed) — comprehensive school info
- Managing Committee details

#### 6.2.2 Manage Sevavratis (Employees/Staff)

**Page:** `EmpListSSVM.aspx`

| Feature | Description |
|---------|-------------|
| **Employee Listing** | Grid view of all staff with hierarchical filters (Sambhag → Bibhag → Sankula → SSVM) |
| **Establishment Type Filter** | Filter by establishment type (SSVM) |
| **Designation Filter** | Extensive designation dropdown (see below) |
| **Search Options** | Search by Sevabrati ID or Employee Name |
| **Add Employee** | Two methods: (1) Add Directly, (2) Add Through Acharya Chayan (recruitment process) |
| **Delete Employee** | With confirmation dialog: "You are going to delete the employee record completely. Do you want to continue?" |
| **Inactive/Transferred View** | Checkboxes to show inactive or transferred staff |
| **SSVM Code** | Unique numeric code identifying each school (e.g., 1156 for Bhojpur) |
| **Search for SAATF** | Separate search for trust fund member registration |

**Staff Designations:**
| Designation | Category |
|-------------|----------|
| Pradhan Acharya | Principal (Boys) |
| Pradhan Acharyaa | Principal (Girls) |
| Saha Pradhan Acharya | Vice Principal |
| Acharya | Teacher (Male) |
| Acharyaa | Teacher (Female) |
| Acharya Representative | Teaching Representative |
| Karyalaya Pramukha | Office Head |
| Karyalaya Sahayak | Office Assistant |
| Sebak | Attendant (Male) |
| Sebika | Attendant (Female) |
| Night Watcher | Security |
| Store Keaper | Store Keeper |
| Laboratory Assistant | Lab Assistant |
| P.E.T. | Physical Education Teacher |
| Music Teacher | Music |
| NCC Teacher | NCC Instructor |
| Scouts & Guide | Scouts & Guides |
| Bahan Chalaka | Vehicle Driver |
| Shift Incharge | Shift Manager |
| Sanskar Kendra Pramukh | Cultural Center Head |
| Bibhag Nirikshayak | Division Inspector |
| Sambhag Sanjojak | Regional Coordinator |
| Purnakalin | Full-time Worker |
| President | Committee President |
| Vice President | Committee VP |
| Secretary | Committee Secretary |
| Joint Secretary | Committee Joint Secretary |
| Treasurer | Committee Treasurer |
| Member | Committee Member |
| Ex-Officio Member | Ex-Officio |

**Reports for Sevabrati:**
- Sevabrati List (basic)
- Sevabrati List (Employment Details) — detailed employment info
- Sevabrati Status
- Sevabrati Training records
- List of Retiring Sevabrati

#### 6.2.3 Manage Students

**Page:** `StudentList.aspx`

| Feature | Description |
|---------|-------------|
| **Student Listing** | Grid with hierarchical filters (Sambhag → Bibhag → Zila → Sankula → SSVM) |
| **Academic Year Filter** | Dropdown: 2010-11 through 2019-20 (and beyond) |
| **Class Filter** | All / Praramva / Bodh / I through XII |
| **Search** | By Student Name or Admission Number |
| **New Admission** | Button to register new students |
| **Delete Student** | With multi-select checkbox + delete functionality |
| **Record Count** | Displays total records found |

**Class Structure (SSVM-specific naming):**
- Praramva (Pre-school)
- Bodh (Kindergarten)
- Class I through XII

**Student Class Promotion Page:** `StudClassPromotion.aspx`
- Bulk promotion of students from one class to the next
- Filtered by Session Year and SSVM
- Select-all / individual selection checkboxes

**Modify Student Status Page:** `StudentStatus.aspx`
- Change student status (active, withdrawn, transferred, etc.)

#### 6.2.4 Correspondence (Mail Box)

**Page:** `MailBox.aspx`

| Feature | Description |
|---------|-------------|
| **Inbox View** | Grid showing From, Subject, Date (Time), Description, Attachment, Size, Valid Till |
| **Compose New Mail** | Button to compose and send new messages via `FileUploadList.aspx` |
| **File Attachments** | Upload/download attachment files (JPG, PDF, etc.) |
| **Pagination** | Server-side paging for mail list |
| **Inter-unit Communication** | Schools can communicate with other organizational units |

**Mail Grid Columns:**
| Column | Description |
|--------|-------------|
| From | Sender school/office name |
| Subject | Mail subject line |
| Date (Time) | Sent date and time |
| Description | Full message body |
| Attachment | Downloadable file link |
| Size | File size (KB/MB) |
| Valid Till | Expiration date (-N/A- if none) |

#### 6.2.5 Address Reports
- Bibhag addresses
- Sankula addresses
- SSVM addresses
- DEO (District Education Officer) addresses
- BEO (Block Education Officer) addresses

#### 6.2.6 Other Reports
- Holidays List
- Class-wise Student Strength

---

### 6.3 Accounts & Finance Module

The **Accounts Module** is the most extensive module, handling all financial transactions across multiple schemes.

#### 6.3.1 Sahajoga Rasi Bibarani (Cooperation Fee Collection)

**Purpose:** Collection and management of cooperation fees (Sahajoga Rasi) from students.

| Feature | Page | Description |
|---------|------|-------------|
| **Define Student Strength** | `SahajogaRasiBibaraniDeclare.aspx` | Define class-wise student strength for fee calculation |
| **Fee Entry by SSVM** | `SahajogaRasiBibaraniList.aspx` | SSVM enters the fee collection details |
| **Balance Payment** | `SahajogaRasiBibaraniBalPay.aspx` | Track and manage balance fee payments |
| **Help Manual** | `SahajogaRashiHelpManual.pdf` | PDF guide for users |

**Reports:**
- Sahajoga Rasi Bibarani By SSVM
- Class-wise Student Strength (Paid)

#### 6.3.2 Acharya Kalyana Panthi (AKP) — Staff Welfare Scheme

**Purpose:** Welfare scheme for teachers (Acharyas) — membership registration, payment collection, and claim processing.

| Feature | Page | Description |
|---------|------|-------------|
| **Membership Registration** | `AKP_MemberList.aspx` | Register new AKP members |
| **Receive Payment** | `AKP_ReceivePayment.aspx` | Receive AKP payment from members |
| **Payment to PO (Offline)** | `AKP_SendPaymentToHO_Old.aspx` | Offline payment to Provincial Office |
| **Payment to PO (Online)** | `AKP_SendPaymentToHO_OLP.aspx` | Online payment to Provincial Office |
| **Money Receipt** | `AKP_SendPaymentToHOList.aspx` | Download AKP payment money receipts |
| **Claim by Members** | `AKP_ClaimByMemberList.aspx` | Members file claims for benefits |
| **Help Manual** | `SVS_AKP_OnlinePayHelpManual.pdf` | Online payment guide |

**Reports:**
- AKP Member List (Approved)
- AKP Membership Details
- AKP Payment Approval Status
- Member-wise AKP Contribution
- AKP Member Claims
- AKP Claim Paid
- AKP Claim Status

**AKP Membership Data Fields:**
- Member details (personal info, SSVM, designation)
- Session-wise filters
- Approval workflow (pending → approved)

#### 6.3.3 Sebabrati Anutosik Anudan Trust Fund (SAATF)

**Purpose:** Trust fund for staff — monthly contribution collection, claim processing, and financial management.

| Feature | Page | Description |
|---------|------|-------------|
| **Member Registration** | `SAATF_MemberList.aspx` | Define SAATF member details |
| **Monthly Statement** | `SAATF_SetStaffMontlyContributionsDetails.aspx` | Generate monthly contribution statements |
| **Monthly Payment (Online)** | `SAATF_EstWiseMonthlyContbDetailList.aspx` | Online payment to Provincial Office |
| **Monthly Payment (Offline)** | `SAATF_EstWiseMlyCont_OfflinePaidInfo.aspx` | Offline payment entry |
| **Delete Offline Payment** | `SAATF_EstWiseMlyCont_OfflinePaidList.aspx` | Manage/delete offline payment records |
| **Claims** | `SAATF_ClaimByMemberList.aspx` | File SAATF benefit claims |
| **Help Manual** | `SVS_AATF_OnlinePayHelpManual.pdf` | Guide for online payment process |

**Reports:**
- SAATF Member List
- SAATF New Member List
- SAATF Nominee Details
- Month-wise Contributions (All Employees)
- Employee-wise Contribution Details
- Monthly Contribution History
- Payment Receipt (Voucher)
- Monthly Contribution Status
- SAATF Ledger Report (Consolidated)

#### 6.3.4 Prasikshyana Sulka (Training Fee)

**Purpose:** Registration and fee collection for staff training programs.

| Feature | Page | Description |
|---------|------|-------------|
| **Training Registration** | `EmpTrgRegList.aspx` | Register employees for training programs |
| **Help Manual** | `SVS_PrasishanaSulkaReg_OnlinePayHelpManual.pdf` | Training fee payment guide |

**Training Registration Data Fields:**
- Session year
- Employee selection from SSVM
- Training details
- Payment tracking

#### 6.3.5 Sanskruti Gyana (Cultural Knowledge)

**Purpose:** Management of cultural knowledge programs for both students (Chatra) and teachers (Acharya).

**Chatra Sanskruti Gyana (Student):**
| Feature | Page |
|---------|------|
| By SSVM | `ChartaSanskrutiGyanList.aspx` |
| Approved List | `ChatraSanskrutiGyanaPaidList.aspx` |

**Acharya Sanskruti Gyana (Teacher):**
| Feature | Page |
|---------|------|
| By SSVM | `AcharyaSanskrutiGyanList.aspx` |
| Approved List | `AcharyaSanskrutiGyanaPaidList.aspx` |

#### 6.3.6 SVS Patrika (Magazine/Publication)

**Purpose:** Magazine subscription management.

| Feature | Page | Description |
|---------|------|-------------|
| **Order by SSVM** | `PatraPatrikaBySSVMList.aspx` | Place patrika subscription orders |
| **Subscriber Report** | `rptMZ_Contributions.aspx` | List of subscribers |

#### 6.3.7 Other Payment Types

| Feature | Page | Description |
|---------|------|-------------|
| **Prakashan Payment (OLD)** | `PrakashanPmtList.aspx` | Legacy publication payments |
| **Miscellaneous Payment** | `PayMiscFeesList.aspx` | Miscellaneous fee collection |
| **Donation Payment** | `DonationPmt.aspx?pmtType=d` | Donation collection |
| **Sebasamarpan Payment** | `DonationPmt.aspx?pmtType=s` | Service offering payments |

**Misc. Payment Features:**
- Session-wise filtering
- Hierarchical location filters (Sambhag → Bibhag → Sankula → SSVM)
- Payment type categorization
- Grid-based payment listing with pagination

---

### 6.4 Acharya Chayana (Staff Recruitment) Module

**Purpose:** End-to-end staff recruitment process for SSVM schools.

| Feature | Page | Description |
|---------|------|-------------|
| **Staff Requirement** | `StaffRequirementNewList.aspx` | SSVMs post their staff requirements by subject/position |
| **Candidate Registration** | `CandidateList.aspx` | Register candidates who apply for positions |
| **Help Manual** | `SVS_AcharyaChayan_Help.pdf` | Recruitment process guide |

**Reports:**
| Report | Page | Description |
|--------|------|-------------|
| Staff Requirement for SSVM | `rptStaffRequirement.aspx` | School-wise requirement list |
| Staff Requirement (Consolidated) | `rptStaffRequirementConsolidated.aspx` | Consolidated view across SSVMs |
| Subject-wise Requirement | `rptSubjectwiseRequirement.aspx` | Requirements grouped by subject |
| Candidate List (DR Report) | `rptCandidateList.aspx` | Registered candidates list |
| Download Admit Card | `rptSSAdmitCard.aspx` | Generate/download admit cards for recruitment exams |

**Recruitment Workflow:**
```
SSVM posts Staff Requirement → Candidates Register
    ↓
Admit Cards Generated → Recruitment Exam/Interview Conducted
    ↓
Selected candidates added to Employee List via "Add Through Acharya Chayan"
```

---

### 6.5 Examinations Module

**Purpose:** Manage student examination registration, fee payment, results, and certificate generation.

| Feature | Page | Description |
|---------|------|-------------|
| **Student Registration** | `StudentAdmissionList.aspx` | Register students for examinations |
| **Payment Entry / Receipt** | `DRReportList.aspx` | Enter exam fee payments and print receipts |
| **Help Manual** | `SVS_Exam_Reg_OnlinePayHelpManual.pdf` | Online registration & payment guide |

**Reports:**
| Report | Page | Description |
|--------|------|-------------|
| DR Report / Payment Details | `DRReport.aspx` | Detailed registration and payment report |
| Admit Card Download | `rptAdmitcard.aspx` | Generate/download student admit cards |
| School-wise Result | `rptSchoolwiseresult.aspx` | Exam results by school |
| Generate Certificate | `ExamGenCertificate.aspx` | Generate exam certificates |

**Exam Workflow:**
```
Student Registration → Fee Payment (Online/Offline) → DR Report Generated
    ↓
Admit Card Downloaded → Exam Conducted → Results Published
    ↓
Certificates Generated
```

---

### 6.6 Sports & Games Module

**Purpose:** Manage sports events, participant registration, and result tracking at various levels (Sankula, Pradeshik, etc.)

| Feature | Page | Description |
|---------|------|-------------|
| **Participant Registration** | `SportsParticipantNewList.aspx` | Register students as sports participants |

**Registration Form Fields:**
| Field | Options |
|-------|---------|
| Academic Year | 2023-24, 2024-25, 2025-26 |
| Event Details | Dropdown (e.g., "37th Pradeshik Khelkud (Athletics) Samaroha") |
| Varga (Age Group) | Under 11, Under 14, Under 17, Under 19 |
| Category | Boys / Girls |
| Hierarchical Filters | Sambhag → Bibhag → Sankula → SSVM |
| Search | By SSVMID or Student Name |
| Order by | Participant toggle |

**Reports:**
| Report | Page | Description |
|--------|------|-------------|
| Participant List | `RptSportsParticipantSankula.aspx` | All participants for a Sankula |
| Game-wise Participant List | `RptSportsParticipantGameSankula.aspx` | Participants grouped by game/sport |
| Top 3 Result (Consolidated) | `rptTop3ResultSankulaLevel.aspx` | Top 3 winners - consolidated |
| Top 3 Result (Detailed) | `rptTop3ResultCatWithName.aspx` | Top 3 winners with names |
| Participant Championship | `rptStudChampionship.aspx` | Championship standings |
| Event-wise Highest Record | `rptHighestRecord.aspx` | Record holders by event |

---

### 6.7 Prakashan (Publications) Order Module

**Purpose:** Publication/book ordering and payment management for SSVMs.

| Feature | Page | Description |
|---------|------|-------------|
| **Prakashan Order** | `InvOrderListSSVM.aspx` | Place book/publication orders |
| **Payment List** | `InvOrderPmtList.aspx` | Track payments for orders |

**Reports:**
| Report | Page | Description |
|--------|------|-------------|
| SSVM Order Requirement | `InvRpt_SSVMOrderReq.aspx` | School-wise order requirements |
| Order-wise Bill Status | `InvRpt_OrdwiseBillStatus.aspx` | Track bill/payment status per order |

---

### 6.8 Users Module

**Page:** `ChangePW.aspx`

| Feature | Description |
|---------|-------------|
| **Change Password** | Users can change their login password |

---

### 6.9 Correspondence / Mail Box Module

This is a built-in internal messaging system (detailed in section 6.2.4).

**Key Features:**
- Compose new mail with file attachments
- Inbox with paginated view
- Inter-school and inter-office communication
- File download capability
- Date/time tracking
- Valid-till date for time-sensitive communications

---

### 6.10 Help & Support (CRM Integration)

**External System:** http://103.76.208.200/crm/admin/RaiseComplain.aspx?pid=svs

| Feature | Description |
|---------|-------------|
| **Raise Complaint** | "Help Me Now" link opens CRM complaint system |
| **Available Everywhere** | Link present on login page and every internal page |
| **External CRM** | Separate CRM system (possibly managed by Azeonics) for issue tracking |
| **Project ID** | `pid=svs` parameter identifies SVS as the project in the CRM |

---

## 7. Data Entities & Relationships

### 7.1 Core Entities

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Sambhag    │────>│   Bibhag     │────>│   Sankula    │
│  (Region)    │1:N  │ (Division)   │1:N  │  (Cluster)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                │
                                                │ 1:N
                                                ▼
                                          ┌──────────────┐
                                          │    SSVM      │
                                          │  (School)    │
                                          └──────────────┘
                                            │         │
                                     1:N    │         │ 1:N
                                            ▼         ▼
                                    ┌──────────┐  ┌──────────┐
                                    │ Employee │  │ Student  │
                                    │(Sevabrati│  │          │
                                    └──────────┘  └──────────┘
                                         │              │
                                    ┌────┴─────┐   ┌────┴────┐
                                    │AKP Member│   │Exam Reg │
                                    │SAATF Memb│   │Sports   │
                                    │Training  │   │Promotion│
                                    └──────────┘   └─────────┘
```

### 7.2 Key Data Entities

| Entity | Key Fields | Related To |
|--------|-----------|------------|
| **Sambhag** | SambhagId, SambhagName | Bibhag |
| **Bibhag** | BibhagId, BibhagName | Sambhag, Sankula |
| **Sankula** | SankulaId, SankulaName | Bibhag, SSVM |
| **Zila** | ZilaId, ZilaName | Sankula, SSVM |
| **SSVM (School)** | SchoolId, NameOfSSVM, Code | Sankula, Students, Staff |
| **Employee (Sevabrati)** | EmpId, Name, Designation, Status | SSVM, AKP, SAATF, Training |
| **Student** | AdmnNo, Name, Class, SessionYr | SSVM, Exams, Sports |
| **AKP Member** | MemberId, EmpId | Employee, AKP Payments |
| **SAATF Member** | MemberId, EmpId, NomineeDetails | Employee, SAATF Contributions |
| **Sports Participant** | ParticipantId, EventId, Varga | Student, Event |
| **Event** | EventHistId, EventDetails | Sports Module |
| **Mail** | MailId, From, Subject, Date, Attachment | Users |
| **Order** | OrderId, SSVMID, SessionYear | SSVM, Prakashan |

---

## 8. Key System Workflows

### 8.1 Student Admission Workflow
```
1. SSVM Login → Establishment → Manage Student → Student Admission
2. Select Academic Year & Class
3. Click "New Admission"
4. Fill student details form
5. Save → Student appears in Student List
6. Optionally register for Exams, Sports
```

### 8.2 Student Promotion Workflow
```
1. SSVM Login → Establishment → Manage Student → Student Promotion
2. Select Session Year (From → To)
3. Select Class to promote
4. Select students (checkbox / Select All)
5. Promote → Students move to next class
```

### 8.3 Employee Onboarding Workflow
```
1. Staff Requirement posted by SSVM (Acharya Chayana module)
2. Candidates Register → Admit Cards Generated
3. Exam/Interview Conducted
4. Selected Candidate added:
   a. Through Acharya Chayan → Establishment → Add Employee
   b. Or Direct Addition (if applicable)
5. Employee appears in Sevabrati List
6. Register for AKP, SAATF memberships
```

### 8.4 AKP Payment Workflow (Online)
```
1. AKP Membership Registration → Member approved
2. Member makes payment → SSVM receives payment
3. SSVM sends payment to Provincial Office (Online Mode)
4. Money Receipt downloaded
5. Reports: Payment Approval Status, Member Contributions
```

### 8.5 SAATF Monthly Contribution Workflow
```
1. SAATF Members defined
2. Monthly Statement generated
3. Payment collected from staff
4. Payment sent to PO (Online or Offline)
5. Receipt/Voucher generated
6. Monthly Status and Ledger Reports
```

### 8.6 Examination Workflow
```
1. Student Registration for Exam
2. Fee Payment (Online/Offline)
3. DR Report generated
4. Admit Card downloaded
5. Exam conducted
6. School-wise Results published
7. Certificates generated
```

### 8.7 Sports Event Workflow
```
1. Event created (e.g., "37th Pradeshik Khelkud Athletics")
2. SSVM registers participants by Varga + Category
3. Sankula/Pradeshik level competition
4. Results entered → Top 3 determined
5. Championship standings updated
6. Record holders tracked
```

---

## 9. Reports & Analytics

### 9.1 Complete Reports Inventory

| # | Module | Report Name | Level |
|---|--------|-------------|-------|
| 1 | Establishment | SSVM List | Multi-level |
| 2 | Establishment | SSVM List (Detailed) | Multi-level |
| 3 | Establishment | Managing Committee | School |
| 4 | Establishment | Sevabrati List | Multi-level |
| 5 | Establishment | Sevabrati List (Employment Details) | Multi-level |
| 6 | Establishment | Sevabrati Status | Multi-level |
| 7 | Establishment | Sevabrati Training | Multi-level |
| 8 | Establishment | Retiring Sevabrati List | Multi-level |
| 9 | Establishment | Holidays List | Organization |
| 10 | Establishment | Bibhag Addresses | Regional |
| 11 | Establishment | Sankula Addresses | Cluster |
| 12 | Establishment | SSVM Addresses | School |
| 13 | Establishment | DEO Addresses | District |
| 14 | Establishment | BEO Addresses | Block |
| 15 | Establishment | Class-wise Student Strength | School |
| 16 | Accounts | Sahajoga Rasi Bibarani By SSVM | School |
| 17 | Accounts | Class-wise Student Strength (Paid) | School |
| 18 | Accounts | AKP Member List (Approved) | Multi-level |
| 19 | Accounts | AKP Membership Details | Member |
| 20 | Accounts | AKP Payment Approval Status | Multi-level |
| 21 | Accounts | Member-wise AKP Contribution | Member |
| 22 | Accounts | AKP Member Claims | Multi-level |
| 23 | Accounts | AKP Claim Paid | Multi-level |
| 24 | Accounts | AKP Claim Status | Multi-level |
| 25 | Accounts | SAATF Member List | Multi-level |
| 26 | Accounts | SAATF New Members | Multi-level |
| 27 | Accounts | SAATF Nominee Details | Member |
| 28 | Accounts | SAATF Month-wise Contributions | School |
| 29 | Accounts | SAATF Employee-wise Contributions | Member |
| 30 | Accounts | SAATF Monthly History | Multi-level |
| 31 | Accounts | SAATF Payment Receipt | Transaction |
| 32 | Accounts | SAATF Monthly Status | Multi-level |
| 33 | Accounts | SAATF Ledger (Consolidated) | Multi-level |
| 34 | Accounts | Patrika Subscriber List | Multi-level |
| 35 | Recruitment | Staff Requirement (SSVM) | School |
| 36 | Recruitment | Staff Requirement (Consolidated) | Multi-level |
| 37 | Recruitment | Subject-wise Requirement | Subject |
| 38 | Recruitment | Candidate List (DR Report) | Multi-level |
| 39 | Recruitment | Admit Card Download | Candidate |
| 40 | Exams | DR Report / Payment Details | Multi-level |
| 41 | Exams | Admit Card Download | Student |
| 42 | Exams | School-wise Result | School |
| 43 | Exams | Certificate Generation | Student |
| 44 | Sports | Participant List | Sankula |
| 45 | Sports | Game-wise Participant List | Game |
| 46 | Sports | Top 3 Result (Consolidated) | Sankula |
| 47 | Sports | Top 3 Result (Detailed) | Category |
| 48 | Sports | Participant Championship | Multi-level |
| 49 | Sports | Event-wise Record Holder | Event |
| 50 | Prakashan | SSVM Order Requirement | School |
| 51 | Prakashan | Order-wise Bill Status | Order |

---

## 10. UI/UX & Navigation Structure

### 10.1 Layout Structure
```
┌──────────────────────────────────────────────────────┐
│  TOP BAR - Organization Logo & Branding              │
├──────────────────────────────────────────────────────┤
│  NAVIGATION BAR (Horizontal Menu)                    │
│  Home | Mail Box | Users | Masters | Establishment | │
│  Accounts | Acharya Chayana | Examinations |         │
│  Sports & Games | Prakashan Order | Help | Logout    │
├──────────────────────────────────────────────────────┤
│  BREADCRUMB BAR - Page Title + Logged-in User        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  CONTENT AREA                                        │
│  ┌─────────────────────────────────────────────┐    │
│  │  Filter Section (Dropdowns for hierarchy)    │    │
│  ├─────────────────────────────────────────────┤    │
│  │  Action Buttons (New, Delete, Search)        │    │
│  ├─────────────────────────────────────────────┤    │
│  │  Data Grid with Pagination                   │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
├──────────────────────────────────────────────────────┤
│  FOOTER - Copyright + Powered by CTSPL              │
└──────────────────────────────────────────────────────┘
```

### 10.2 Navigation Menu (SSVM Level — Full Menu Tree)

```
🏠 Home
📧 Mail Box
👤 Users
    └── Change Password
📋 Masters
    └── No Sub Menu
🏫 Establishment
    ├── Manage Schools
    │   └── School Details
    ├── Manage Sevavratis
    │   ├── Sevabrati Details
    │   └── Search Sevabrati for SAATF
    ├── Manage Student
    │   ├── Student Admission
    │   ├── Student Promotion
    │   └── Modify Student Status
    ├── Correspondence
    │   ├── Compose New Mail
    │   └── Mail Box
    └── Reports
        ├── School → SSVM List | SSVM List (Detailed) | Managing Committee
        ├── Sevabrati → List | Employment Details | Status | Training | Retiring List
        ├── Holidays List
        └── Addresses → Bibhag | Sankula | SSVM | DEO | BEO
💰 Accounts
    ├── Sahajoga Rasi Bibarani
    │   ├── Help Manual
    │   ├── Define Student Strength
    │   ├── Fee Collection by SSVM
    │   ├── Balance Payment
    │   └── Reports → By SSVM | Class-wise Strength
    ├── Acharya Kalyana Panthi (AKP)
    │   ├── Help Manual
    │   ├── Membership Registration
    │   ├── Receive Payment
    │   ├── Payment to PO (Offline/Online)
    │   ├── Money Receipt
    │   ├── Claim by Members
    │   └── Reports → Member List | Details | Payment Status | Contributions | Claims
    ├── SAATF (Trust Fund)
    │   ├── Help Manual
    │   ├── Member Details
    │   ├── Monthly Statement
    │   ├── Monthly Payment (Online/Offline)
    │   ├── Claims
    │   └── Reports → Members | Nominees | Contributions | History | Receipts | Ledger
    ├── Prasikshyana Sulka (Training Fee)
    │   ├── Help Manual
    │   └── Training Registration
    ├── Sanskruti Gyana
    │   ├── Chatra (Student) → By SSVM | Approved List
    │   └── Acharya (Teacher) → By SSVM | Approved List
    ├── SVS Patrika → Order by SSVM | Subscriber List
    ├── Prakashan Payment (OLD)
    ├── Misc. Payment
    ├── Donation Payment
    └── Sebasamarpan Payment
👨‍🏫 Acharya Chayana (Staff Recruitment)
    ├── Help Manual
    ├── Place Staff Requirement
    ├── Candidate Registration
    └── Reports → Requirement | Consolidated | Subject-wise | Candidate List | Admit Card
📝 Examinations
    ├── Help Manual
    ├── Student Registration
    ├── Payment Entry / Receipt
    └── Reports → DR Report | Admit Card | School-wise Result | Certificate
🏅 Sports & Games
    ├── Manage Sports → Participant Registration
    └── Reports → Participant List | Game-wise | Top 3 | Championship | Records
📚 Prakashan Order
    ├── Prakashan Order
    ├── Payment List
    └── Reports → Order Requirement | Bill Status
🆘 HELP ME NOW (External CRM Link)
🚪 Logout
```

---

## 11. System Integration Points

| # | Integration | Type | Description |
|---|------------|------|-------------|
| 1 | **CRM System** | External Link | http://103.76.208.200/crm/ — complaint/support ticketing |
| 2 | **Payment Gateway** | Online Payment | Online payment for AKP, SAATF, Exam fees, Training fees |
| 3 | **PDF Help Manuals** | Static Files | PDF guides for various modules hosted in /Up_Files/ |
| 4 | **File Upload** | Internal | Mail attachments (JPG, PDF uploads) |

---

## 12. Replication Scope — Features for New System

### 12.1 Core Modules to Replicate

| Priority | Module | Complexity | Description |
|----------|--------|-----------|-------------|
| 🔴 P1 | **Authentication** | Medium | Multi-role login with RBAC |
| 🔴 P1 | **School Management** | Medium | SSVM information and hierarchy management |
| 🔴 P1 | **Student Management** | High | Admission, promotion, status, class-wise tracking |
| 🔴 P1 | **Staff Management** | High | 30+ designations, lifecycle management |
| 🔴 P1 | **Fee Collection (Sahajoga Rasi)** | High | Student fee management with reports |
| 🟡 P2 | **AKP (Welfare Scheme)** | High | Membership, payments, claims with online/offline |
| 🟡 P2 | **SAATF (Trust Fund)** | High | Monthly contributions, claims, ledger |
| 🟡 P2 | **Examinations** | High | Registration, payment, admit cards, results, certificates |
| 🟡 P2 | **Staff Recruitment** | Medium | Requirements, candidates, admit cards |
| 🟢 P3 | **Sports & Games** | Medium | Event management, multi-level competitions |
| 🟢 P3 | **Prakashan/Publications** | Low | Book ordering and payment |
| 🟢 P3 | **Mail/Correspondence** | Medium | Internal messaging with attachments |
| 🟢 P3 | **Reports Engine** | High | 50+ reports across all modules |
| 🟢 P3 | **Help/CRM Integration** | Low | External help desk link |

### 12.2 Data Scale Estimates

| Entity | Estimated Volume |
|--------|-----------------|
| Sambhags | 9 |
| Bibhags | ~30-40 |
| Sankulas | ~100-150 |
| SSVMs (Schools) | ~800-1000 |
| Students | ~50,000-100,000+ |
| Sevabrati (Staff) | ~5,000-10,000+ |
| Zilas (Districts) | 31 |
| User Accounts | ~1,000-1,500+ |

### 12.3 Key Functional Requirements Summary

1. **Multi-level hierarchical data access** with cascading dropdowns
2. **Role-based access control** with 5 user types
3. **Online and offline payment** support for multiple fee types
4. **Grid-based data views** with server-side paging, sorting, filtering
5. **Bulk operations** (select all, mass promotion, batch processing)
6. **Document/file management** (upload/download attachments)
7. **PDF report generation** (admit cards, certificates, receipts, vouchers)
8. **Academic year/session management** across all modules
9. **Approval workflows** (membership approvals, payment approvals, claim processing)
10. **Comprehensive reporting** at every level of the hierarchy

---

*This document is based on analysis of the SVS EMS system at http://103.76.208.200/svsemsnew/ — pages, HTML structure, navigation, form fields, and screenshots captured in April 2026.*

*All © Rights Reserved. Shiksha Vikash Samiti, Odisha | Powered by: CTSPL*
