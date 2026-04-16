# P-07 · Books Allocation, Management & Supply Chain

**Module Code:** P-07  
**Priority:** 🟡 High  
**Estimated Effort:** 4–5 Weeks  
**Team:** 1 Backend Developer + 1 Frontend Developer  
**Depends On:** P-11 (RBAC), P-04 (Communication for dispatch notifications), Accounts Module  

---

## 1. Module Overview

The Prakashan module currently records book orders but has no supply chain functionality — no real-time inventory, no dispatch tracking, no delivery notes, no billing integration. Schools receive books without formal documentation, leading to disputes. Head Office has no consolidated view of Prakashan revenue or outstanding dues.

This module transforms the Prakashan module into a **Full Supply Chain Management System** covering the complete journey from school order to warehouse dispatch to school receipt.

---

## 2. Functional Requirements

### 2.1 Book/Item Master Catalogue

Head Office manages the master catalogue of books and publications available for order:

**Catalogue Entry Fields:**
- Item Code (auto-generated)
- Title
- Category: Textbook / Workbook / Patrika (Magazine) / Supplementary / Stationery
- Class/Grade (applicable to)
- Language (Odia / English / Hindi / Sanskrit)
- Author / Publication Year
- Price (per unit, with GST breakdown)
- Unit (copy, set, bundle)
- Available Stock (linked to warehouse inventory)
- Is Active (Y/N — can schools order this?)

### 2.2 Warehouse Inventory Management

Real-time inventory tracking at the Head Office warehouse:

**Inventory Records:**
- Opening stock per item per academic year
- Stock received (from printer/supplier): quantity, date, supplier invoice reference
- Stock dispatched (per school order): quantity, date
- Stock returned (from schools): quantity, date, reason
- Closing stock (computed: opening + received − dispatched + returned)

**Inventory Alerts:**
- Low stock alert: when stock falls below a configurable threshold per item (e.g., 100 copies)
- Zero stock alert: when stock hits 0 — further orders for this item are blocked until restocked
- Dashboard shows current stock level for all items with colour indicators (green/yellow/red)

### 2.3 School Order Workflow

**Step 1: Order Placement (SSVM)**
- SSVM submits order via structured form
- Select Academic Year, Class (if applicable), items from catalogue with quantity
- System checks availability: if requested qty > available stock, warning shown; SSVM can reduce qty or place partial order
- Order submitted → confirmation with Order ID sent to SSVM

**Step 2: Order Review (Head Office / Sambhag)**
- Incoming orders visible in an order management queue
- Order can be: Confirmed (stock reserved), Modified (quantity adjusted with reason), Held (pending stock), Rejected (with reason)
- Consolidated view: all orders for a specific book across all SSVMs — for production/reprint planning

**Step 3: Dispatch**
- Order confirmed → Dispatch team packs and dispatches
- Dispatch entry: Dispatch Date, Mode (courier / SVS vehicle / school pickup), Tracking Number (if courier), Dispatcher Name
- Delivery Note auto-generated (PDF): Order ID, SSVM name and address, item list with quantities, dispatch date, transporter details
- Stock automatically decremented on dispatch

**Step 4: Delivery Confirmation (SSVM)**
- SSVM receives delivery note PDF via in-app notification
- SSVM confirms receipt: Received Date, Condition (Good / Partial Damage / Short Quantity)
- If short quantity or damaged: SSVM raises a dispute against the order
- Dispute goes to Head Office for review and resolution

### 2.4 Billing and Payment

- Invoice auto-generated on dispatch: SSVM name, items, quantities, unit prices, total, GST breakdown
- Invoice linked to SSVM account for payment tracking
- Payment against invoice: online or offline (cheque/DD)
- Outstanding balance per SSVM: unpaid invoices by age (30 days / 60 days / 90+ days)

**Financial Summary (Head Office):**
- Total Prakashan revenue by period (month/year)
- Revenue by book title
- Outstanding dues by SSVM, Sambhag
- Revenue vs. cost (if cost data available) for profitability by title

### 2.5 Return Management

- SSVM can initiate return for: Defective copies, Excess stock (end of year), Wrong item sent
- Return form: Order reference, item, quantity, reason, condition
- Head Office approves return → Generates Return Authorisation Number
- On receipt of returned stock at warehouse, inventory incremented

---

## 3. Data Models

### 3.1 Catalogue Table
```
prakashan_items
├── item_code (PK)
├── title
├── category (ENUM)
├── applicable_class
├── language
├── price_per_unit
├── gst_rate
├── is_active (BOOL)
└── created_at
```

### 3.2 Inventory Table
```
prakashan_inventory
├── inventory_id (UUID, PK)
├── item_code (FK)
├── academic_year
├── opening_stock
├── received_qty
├── dispatched_qty
├── returned_qty
├── current_stock (computed)
├── low_stock_threshold
└── last_updated_at
```

### 3.3 Orders Table
```
prakashan_orders
├── order_id (UUID, PK)
├── ssvm_code
├── academic_year
├── status (ENUM: SUBMITTED, CONFIRMED, DISPATCHED, DELIVERED, DISPUTED, CANCELLED)
├── order_date
├── confirmed_at (nullable)
├── dispatched_at (nullable)
├── delivered_at (nullable)
└── notes
```

### 3.4 Order Items Table
```
prakashan_order_items
├── order_item_id (UUID, PK)
├── order_id (FK)
├── item_code (FK)
├── qty_ordered
├── qty_confirmed (nullable)
├── qty_dispatched (nullable)
├── qty_received (nullable)
├── unit_price
└── line_total
```

### 3.5 Invoices Table
```
prakashan_invoices
├── invoice_id (UUID, PK)
├── order_id (FK)
├── ssvm_code
├── invoice_date
├── subtotal
├── gst_amount
├── total_amount
├── status (ENUM: UNPAID, PARTIAL, PAID)
└── due_date
```

---

## 4. Implementation Plan

### Phase 1 — Catalogue & Inventory (Weeks 1–2)
- [ ] Build item catalogue management (CRUD for Head Office)
- [ ] Build warehouse inventory tracker with stock-in/stock-out records
- [ ] Implement low stock and zero stock alerts

### Phase 2 — Order Workflow (Weeks 2–3)
- [ ] Build SSVM order form with catalogue selector and stock availability check
- [ ] Build order management queue for Head Office (confirm, modify, hold, reject)
- [ ] Implement dispatch entry and delivery note PDF generation
- [ ] Implement SSVM delivery confirmation and dispute raising

### Phase 3 — Billing & Financials (Week 3–4)
- [ ] Build invoice auto-generation on dispatch
- [ ] Build payment recording (online and offline)
- [ ] Build outstanding balance and ageing report
- [ ] Build Prakashan revenue and profitability dashboard

### Phase 4 — Returns & Testing (Week 5)
- [ ] Build return management workflow
- [ ] Test full order lifecycle: order → confirm → dispatch → delivery note → confirm receipt
- [ ] Test stock decrement accuracy and low-stock alerts

---

## 5. Acceptance Criteria

- [ ] Placing an order for a book with 0 stock shows a warning and blocks submission
- [ ] On dispatch, delivery note PDF is generated and sent to SSVM via in-app notification
- [ ] SSVM delivery confirmation with "Short Quantity" status automatically creates a dispute record
- [ ] Invoice is auto-generated on dispatch and reflected in SSVM's outstanding balance
- [ ] Head Office inventory dashboard shows real-time stock after each dispatch
- [ ] Outstanding dues report correctly shows SSVMs with invoices > 60 days unpaid

---

## 6. Developer Notes

- Inventory `current_stock` should be computed from transactions, not stored as a mutable field — avoids race conditions when multiple orders are processed concurrently
- Delivery note PDF should include a QR code linking to the online order record for easy verification on receipt
- For large orders (>1,000 copies), implement split-dispatch: a single order can have multiple dispatch records
- Price per unit at time of order must be locked (stored in order_items) — catalogue price changes should not affect historical orders
