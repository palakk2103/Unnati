# Reports & Analytics Manual
## Understanding All Reports Available on the Platform

> This guide explains **every report available** to Admins and Sellers — what each report shows, how to read it, and how to use the data to make better business decisions.

---

## 📋 Table of Contents

1. [Who Has Access to Which Reports](#1-who-has-access)
2. [Sales Reports](#2-sales-reports)
3. [Order Reports](#3-order-reports)
4. [GST Reports](#4-gst-reports)
5. [Payment Reports](#5-payment-reports)
6. [Inventory Reports](#6-inventory-reports)
7. [POS Reports](#7-pos-reports)
8. [Return & Exchange Reports](#8-return--exchange-reports)
9. [Customer Reports](#9-customer-reports)
10. [Common Report Features](#10-common-report-features)

---

## 1. Who Has Access to Which Reports

| Report Type | Admin | Seller |
|-------------|-------|--------|
| Sales Summary | ✅ All sellers combined | ✅ Their own data only |
| Online Order Report | ✅ All | ✅ Own orders |
| Invoice Report | ✅ All | ✅ Own invoices |
| GST Sales Report | ✅ All | ✅ Own GST |
| GST Register | ✅ All | ✅ Own register |
| Payment Report | ✅ All | ✅ Own payments |
| Stock Summary | ✅ All | ✅ Own stock |
| Stock Balance | ✅ All | ✅ Own |
| Low Stock | ✅ All | ✅ Own |
| Out of Stock | ✅ All | ✅ Own |
| Loss Summary | ✅ All | ✅ Own |
| Purchase Report | ✅ All | ✅ Own |
| POS Report | ✅ All | ✅ Own |
| Return/Exchange Summary | ✅ All | ✅ Own |
| Stock Sales Summary | ✅ All | ✅ Own |
| Due Summary | ✅ All | ✅ Own |

---

## 2. Sales Reports

### 2a. Sales Summary (Quick Overview)

**Where:** Admin → Sales Summary / Seller → Sales Summary

**What it shows:**
A high-level snapshot of sales performance.

| Metric | Description |
|--------|-------------|
| Total Orders | Count of all orders in the selected period |
| Total Revenue | Sum of all order amounts |
| Average Order Value | Revenue ÷ Orders |
| Total Customers | Unique customers who ordered |
| Top Products | Best-selling products by quantity or revenue |
| Daily Trend | Bar or line chart of daily sales |

**Filters:**
- Today / This Week / This Month / Custom Date Range

**How to Use:**
- Check daily to see if sales are trending up or down.
- Compare this week vs. last week to spot patterns.
- Identify your best-selling products.

---

### 2b. Report Sales Summary (Detailed)

**Where:** Reports → Sales → Summary

**What it shows:**
A more detailed, row-by-row breakdown of sales, typically exportable.

Columns typically include:
- Date
- Order Number
- Customer Name
- Items Sold
- Subtotal
- Discount
- Tax
- Delivery Charge
- Total

**Use for:**
- Monthly audit of all sales.
- Cross-referencing with accountant records.
- Download as Excel for your own analysis.

---

### 2c. Online Order Report

**Where:** Reports → Order / Seller → Reports → Order

**What it shows:**
A report specifically for online orders placed through the customer app.

Columns:
- Order ID / Number
- Customer Name
- Phone
- Order Date
- Items (summary or count)
- Subtotal
- Discount Applied
- Coupon Used
- Tax
- Delivery Charge
- Grand Total
- Payment Method (COD / Online)
- Payment Status (Paid / Pending / Failed)
- Order Status
- Seller Name (Admin view)

**Filters:**
- Date range
- Order status
- Payment method
- Seller (Admin only)

**Use for:**
- Analyzing online sales separately from POS/in-store sales.
- Tracking payment collection for COD orders.
- Identifying orders with pending payment.

---

### 2d. Invoice Report

**Where:** Reports → Invoice

**What it shows:**
All generated customer invoices in one place.

Columns:
- Invoice Number
- Order Number
- Customer Name
- Invoice Date
- Amount
- GST Amount
- Grand Total
- Status (generated/downloaded)

**Actions:**
- Download individual invoice as PDF.
- Reprint any invoice.

**Use for:**
- Customer billing queries.
- Providing invoice copies on request.
- Bulk invoice management for accountants.

---

## 3. Order Reports

### Key Order Metrics Available:

The **Dashboard** already shows:
- Today's orders count
- Total orders
- Orders by status (pie/bar chart)

For detailed order lists by status, go to the **Orders** section (not Reports) and filter by status:
- Pending, Received, Processed, Shipped, Out for Delivery, Delivered, Cancelled.

Each view is exportable as a table.

---

## 4. GST Reports

### 4a. GST Sales Report

**Where:** Reports → GST Sales

**What it shows:**
A report specifically designed for GST compliance — required for filing your GST returns.

Columns:
- Date
- Invoice Number
- Customer Name
- Customer GSTIN (if provided)
- Product Name
- HSN Code
- Taxable Value (amount before tax)
- CGST Rate & Amount
- SGST Rate & Amount
- IGST Rate & Amount
- Total GST
- Invoice Total

**Filters:**
- Date range (by month, for monthly GST filing)
- Tax rate
- Seller (Admin view)

**How to Read:**
- CGST = Central GST (half the total GST, goes to central government)
- SGST = State GST (half the total GST, goes to state government)
- IGST = Integrated GST (for inter-state transactions, full rate)

**Use for:**
- Monthly GST return filing (GSTR-1 / GSTR-3B)
- Share with your CA/accountant
- Verify that GST is being correctly collected on all sales

---

### 4b. GST Register

**Where:** Reports → GST Register

**What it shows:**
A complete register of all GST-applicable transactions — both sales and purchases combined.

This is the formal record book for GST compliance.

---

## 5. Payment Reports

### 5a. Payment Report

**Where:** Reports → Payment

**What it shows:**
A breakdown of all payments by method.

Columns:
- Date
- Order Number
- Customer Name
- Payment Method (COD, UPI, Credit Card, Debit Card, Net Banking, Wallet)
- Amount Paid
- Payment Status
- Transaction ID (for online payments)
- Razorpay Payment ID

**Summary Cards at Top:**
- Total Collected (Online)
- Total COD Collected
- Total Pending

**Use for:**
- Reconciling payments with the Razorpay dashboard.
- Tracking which COD orders have been paid vs. pending.
- Resolving payment disputes.

---

### 5b. Payment List (Admin)

**Where:** Admin → Payment List

Similar to Payment Report but shows the raw payment transactions directly from the payment gateway.

---

## 6. Inventory Reports

### 6a. Stock Summary

**Where:** Inventory Reports → Stock Summary

**What it shows:**
A snapshot of the current stock level for every product.

Columns:
- Product Name
- Category
- Subcategory
- Variants
- Current Stock Quantity
- Low Stock Threshold
- Status (In Stock / Low Stock / Out of Stock)

**Use for:**
- Daily stock check.
- Planning purchase orders before running out.
- Identifying products that need restocking.

---

### 6b. Stock Balance Summary

**Where:** Inventory Reports → Stock Balance

**What it shows:**
A financial stock ledger showing:

| Column | Description |
|--------|-------------|
| Opening Stock | Quantity at the start of the period |
| Purchases | Stock added (from purchase entries) |
| Sales | Stock sold (from orders) |
| Adjustments | Manual corrections (losses, damage) |
| Closing Stock | Calculated: Opening + Purchases − Sales − Losses |

**Use for:**
- Month-end stock reconciliation.
- Comparing physical stock count with system records.
- Identifying discrepancies (shrinkage, theft, data errors).

---

### 6c. Low Stock Summary

**Where:** Inventory Reports → Low Stock

**What it shows:**
All products where current stock is **at or below** the low stock threshold.

Columns:
- Product Name
- Current Stock
- Low Stock Threshold
- Shortage (how many more needed)
- Category

**How to Use:**
- Review this report daily.
- Place purchase orders for products listed here before they go out of stock.
- Products with stock = 0 are listed here too (though also in Out of Stock).

---

### 6d. Out of Stock Summary

**Where:** Inventory Reports → Out of Stock

**What it shows:**
Products with **zero stock** — these are currently invisible to customers or shown as "Sold Out".

Columns:
- Product Name
- Category
- Last Date in Stock
- Days Out of Stock

**Use for:**
- Priority restocking decisions.
- Products out of stock for too long may need to be discontinued.

---

### 6e. Loss Summary

**Where:** Inventory Reports → Loss Summary

**What it shows:**
All recorded inventory losses — items that were damaged, expired, stolen, or otherwise lost.

Columns:
- Date
- Product Name
- Quantity Lost
- Reason (Damaged / Expired / Stolen / Other)
- Value of Loss
- Recorded By

**Use for:**
- Tracking shrinkage.
- Insurance claims.
- Identifying patterns in loss (same product keeps getting damaged → storage issue).

---

## 7. POS Reports

### 7a. POS Report

**Where:** POS → Report

**What it shows:**
A comprehensive summary of all **in-store sales** made through the POS system.

Key metrics:
- Total POS Sales (₹)
- Number of Bills
- Average Bill Value
- Sales by Payment Method (Cash / Card / UPI / Credit)
- Sales by Order Type (Retail / Wholesale)
- Top-selling POS products
- Daily sales chart

**Filters:**
- Date range
- Payment method
- Staff member
- Customer type

---

### 7b. POS Invoice Report

**Where:** Reports → Invoice (POS tab)

**What it shows:**
All individual bills/invoices generated through POS.

Columns:
- Bill Number
- Date & Time
- Customer Name
- Items Count
- Subtotal
- Discount
- Tax
- Total
- Payment Method
- Staff Name (who created the bill)

**Actions:**
- Reprint any bill.
- Download as PDF.

---

### 7c. POS Quotations Report

**Where:** POS → Quotations

**What it shows:**
All quotations that were saved but not converted to orders yet.

- See pending quotations and follow up with customers.
- Convert quotations to actual orders when customer confirms.

---

### 7d. Due Summary

**Where:** POS → Reports → Due Summary / Seller → Reports → Sales → Due Summary

**What it shows:**
All credit sales — where customers bought on credit (pay later) and still owe money.

Columns:
- Customer Name
- Phone Number
- Total Purchases
- Amount Paid
- Outstanding Due (what they still owe)
- Last Transaction Date

**Use for:**
- Following up with customers who owe you money.
- Managing credit limits.
- Cash flow planning.

---

## 8. Return & Exchange Reports

### 8a. Return/Exchange Summary

**Where:** Reports → Sales → Return/Exchange

**What it shows:**
All returns and replacements that have been processed.

Columns:
- Date
- Order Number
- Customer Name
- Product Returned
- Reason
- Type (Return / Replace)
- Status (Approved / Rejected / Pending)
- Refund Amount

**Use for:**
- Understanding why customers return products.
- Identifying products with high return rates (quality issues?).
- Tracking refund amounts for accounting.

---

### 8b. Stock Sales Summary

**Where:** Reports → Sales → Stock Sales

**What it shows:**
How much of each product was sold in the selected period.

Columns:
- Product Name
- Category
- Opening Stock
- Units Sold
- Revenue from Product
- Closing Stock
- Return Quantity

**Use for:**
- Identifying your best-selling products.
- Understanding product velocity (how fast items sell).
- Planning future inventory purchases.

---

## 9. Customer Reports

### Abandoned Cart Report (Admin Only)

**Where:** Admin → Customers → Abandoned Carts

**What it shows:**
Customers who added items to cart but didn't place an order.

Columns:
- Customer Name
- Phone / Email
- Cart Contents (products, quantities)
- Cart Value
- When Cart Was Created
- Time Since Last Activity

**Use for:**
- Running re-engagement campaigns.
- Understanding which products are commonly abandoned.
- Identifying checkout friction (cart value is high but customer didn't buy — maybe shipping cost was too high?).

---

## 10. Common Report Features

### Date Filters

Almost every report has date filtering options:

| Filter | Period Covered |
|--------|---------------|
| Today | Today only |
| Yesterday | Previous day |
| This Week | Current Monday to today |
| This Month | 1st of current month to today |
| Last Month | Previous full month |
| Custom Range | Any start and end date you choose |

### Search

Most reports have a **search bar** to find specific orders, customers, or products within the report results.

### Sorting

Click any column header to **sort** the results by that column (ascending or descending).

### Pagination

Reports show a set number of rows per page (typically 10, 25, or 50). Use the pagination controls at the bottom to navigate between pages. You can also change the number of rows per page.

### Export to Excel/PDF

Most reports have a **"Download"** or **"Export"** button that lets you:
- Download as **Excel (.xlsx)** — for further analysis in spreadsheets.
- Download as **PDF** — for sharing or printing.
- Some reports also have a **"Print"** button.

### Print Directly

Use the browser's **Ctrl+P** (or the Print button in the report) to print a report directly.

---

## 📊 Quick Guide: Which Report to Use?

| I want to know... | Use This Report |
|-------------------|----------------|
| How much did I sell today/this month? | Sales Summary |
| Which products sell the most? | Stock Sales Summary |
| What's my GST liability? | GST Sales Report |
| Which products are running out? | Low Stock Summary |
| Which COD orders have been paid? | Payment Report |
| How much do customers owe me? | Due Summary |
| Why are customers returning items? | Return/Exchange Summary |
| How much did each staff member bill? | Staff Bill Report |
| What's in-store vs online performance? | POS Report vs Online Order Report |
| Complete stock audit | Stock Balance Summary |
