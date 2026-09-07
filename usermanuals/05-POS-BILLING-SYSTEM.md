# POS (Point of Sale) Billing System Manual
## How to Use the In-Store Billing System

> This guide covers the **POS (Point of Sale)** system — used by **Sellers**, **Admin**, and **Staff** to bill walk-in customers at the physical store.

---

## 📋 Table of Contents

1. [What is POS?](#1-what-is-pos)
2. [Opening the POS Screen](#2-opening-the-pos-screen)
3. [POS Screen Layout](#3-pos-screen-layout)
4. [Creating a Bill — Step by Step](#4-creating-a-bill-step-by-step)
5. [Managing Multiple Bills](#5-managing-multiple-bills)
6. [Payment Methods](#6-payment-methods)
7. [Applying Discounts](#7-applying-discounts)
8. [Printing a Bill](#8-printing-a-bill)
9. [Saving as Quotation](#9-saving-as-quotation)
10. [POS Customers](#10-pos-customers)
11. [POS Suppliers & Purchase Entry](#11-pos-suppliers--purchase-entry)
12. [POS Reports](#12-pos-reports)
13. [Barcode Scanning](#13-barcode-scanning)

---

## 1. What is POS?

**POS (Point of Sale)** is a digital billing counter — like a computerized cash register. It allows the seller or their staff to:

- Quickly search and add products to a bill.
- Apply discounts.
- Accept payment from walk-in customers.
- Print or share a receipt/invoice.
- Track all in-store sales separately from online orders.

**In simple words:** POS is for billing customers who come to your shop directly, not through the online app.

---

## 2. Opening the POS Screen

**For Sellers:**
1. Log in to the Seller portal.
2. Click **POS → Orders** in the left sidebar.
3. The POS billing screen opens.

**For Admin:**
1. Log in to the Admin portal.
2. Click **POS → POS Orders** in the sidebar.

**For Staff:**
1. Go to the **Staff Login** page (`/seller/staff-login`).
2. Enter your staff credentials.
3. You are taken directly to the **POS billing screen** (staff can only access POS).

---

## 3. POS Screen Layout

The POS screen is split into two main sections:

```
┌─────────────────────────────┬─────────────────────────────┐
│                             │                             │
│   LEFT PANEL                │   RIGHT PANEL               │
│   Product Search &          │   Current Bill / Cart       │
│   Product List              │                             │
│                             │  Customer Info              │
│   [ Search by name/barcode ]│  Items List                 │
│                             │  Subtotal, Discounts        │
│   Category Filter           │  Total                      │
│                             │  Payment Method             │
│   Product Cards (Grid)      │  Place Order Button         │
│                             │                             │
└─────────────────────────────┴─────────────────────────────┘

Top Bar: Bill tabs (Bill 1, Bill 2, Bill 3...) + Utilities
```

---

## 4. Creating a Bill — Step by Step

### Step 1: Search for a Product

- Use the **search bar** (top of left panel) to find a product.
- Type the product name or scan a barcode.
- Products matching your search appear in the grid below.
- You can also **filter by category** using the category dropdown.

### Step 2: Add a Product to the Bill

- Click on a product card to add it.
- If the product has **variants** (e.g., different sizes or weights), a popup appears asking you to select the variant.
- The product is added to the right panel (the current bill).

### Step 3: Adjust Quantity

- In the right panel (bill), each product shows a **quantity field**.
- Click the **+** or **−** buttons, or type the quantity directly.

### Step 4: Select Order Type

At the top of the bill panel, choose:
- **Retail** — prices shown to regular walk-in customers.
- **Wholesale** — lower prices for bulk/wholesale buyers.

### Step 5: Add a Customer (Optional)

- Click the **Customer Search** field.
- Search by name or phone number.
- Select an existing customer from the dropdown.
- Or click **"New Customer"** to add a new one on the spot (enter name and phone).
- Adding a customer links the bill to them — useful for tracking and credit sales.

### Step 6: Apply Discounts (if any)

- **Item-level discount:** Click on a product in the bill → adjust the discount % or ₹ for that specific item.
- **Bill-level discount:** Scroll to the bottom of the bill → enter a discount on the total (% or flat ₹).

### Step 7: Choose Payment Method

Select how the customer is paying:
- **Cash** — customer pays cash
- **Card** — customer pays by credit/debit card
- **UPI** — customer pays via UPI (PhonePe, GPay, Paytm, etc.)
- **Credit** — customer buys on credit (pay later) — linked to their customer account
- **Online (Razorpay)** — process an online payment

For **Credit sales**, the amount is added to the customer's "Due" balance.

### Step 8: Place the Order / Generate Bill

- Click **"Place Order"** (or **"Charge"** button).
- The bill is created and saved.
- You're taken to the **Success Page** where you can print the bill.

---

## 5. Managing Multiple Bills

One of POS's most useful features is handling **multiple customers at once** — like having multiple billing counters.

### How to Create Multiple Bills:

- At the top of the POS screen, you see **Bill tabs** (Bill 1, Bill 2, etc.).
- Click **"+ Add Bill"** (or the **+** icon) to open a new bill for a different customer.
- Switch between bills by clicking the tabs.
- Each bill is completely independent.

**Example scenario:**
- Bill 1: You're billing a grocery customer (still adding items).
- Bill 2: Another customer walks in — create Bill 2 for them.
- You can finish Bill 2 first and come back to Bill 1.

### Naming Bills

- You can rename each bill tab (e.g., "Table 1", "Customer A") for easier identification.

---

## 6. Payment Methods

### Cash Payment

- Select **Cash** as payment method.
- The system shows the **total amount due**.
- Enter the **amount received** from customer.
- The system automatically calculates the **change to return**.

### UPI Payment

- Select **UPI**.
- A QR code or UPI details appear for the customer to scan.
- Confirm payment received and complete the bill.

### Credit (Pay Later)

- Select **Credit**.
- The amount is added to the customer's outstanding dues.
- The customer can pay later.
- You can track all credit sales in the **Due Summary** report.

### Online via Razorpay

- Select **Online**.
- A Razorpay payment link/QR is generated.
- Customer scans and pays.
- After payment confirmation, the bill is auto-completed.

### Mixed Payment

- Some setups allow partial payment in cash + partial via UPI.
- The system handles the split and tracks each part.

---

## 7. Applying Discounts

### Item-Level Discount (On a Single Product)

1. Click on the product in the bill panel.
2. An inline editor appears.
3. Enter discount as:
   - **Percentage (%)** — e.g., 10% off this item.
   - **Flat Amount (₹)** — e.g., ₹20 off this item.
4. The price updates in real time.

### Bill-Level Discount (On the Entire Bill)

1. Scroll to the bottom of the bill.
2. In the **"Bill Discount"** field, enter the discount.
3. Choose **%** or **₹**.
4. The total updates automatically.

### Custom Price (Override Price)

- You can directly type a **custom selling price** for any item, overriding the listed price.
- Useful for negotiated prices with customers.

---

## 8. Printing a Bill

After completing an order, the **Print Bill** screen appears.

### Bill Contains:
- Store name and logo (from Bill Settings)
- Bill number
- Date and time
- Customer name and phone (if added)
- Seller/staff name
- List of items: product name, variant, quantity, rate, amount
- Discounts applied
- Tax breakdown (GST)
- Total amount
- Payment method
- Footer message (customizable)

### Print Options:
- **Print** — sends to connected printer (thermal printer or regular).
- **Download PDF** — saves the bill as a PDF file.
- **Share via WhatsApp** — sends the bill directly to the customer's phone.
- **New Bill** — clears and starts a fresh bill.

### Configuring Bill Appearance

Go to **Seller → Bill Settings** to customize:
- Store logo on bill
- Store header (name, address, phone, GSTIN)
- Footer text (e.g., "Thank you for shopping with us!")
- Bill number format (prefix + running number)
- Paper size (A4, A5, thermal 58mm, thermal 80mm)

---

## 9. Saving as Quotation

A **Quotation** is a bill that's not yet finalized — you share it with a customer as a price estimate.

### How to Save a Quotation:

1. Add products to the bill as normal.
2. Instead of clicking "Place Order", click **"Save as Quotation"**.
3. Give the quotation a reference name/number.
4. It's saved and you can:
   - Print or share it.
   - Convert it to a real order later when the customer confirms.

### Viewing All Quotations:

Go to **POS → Quotations** to see all saved quotations.
- Filter by date.
- Open any quotation, edit it, and convert to order.

---

## 10. POS Customers

The POS system maintains its own **customer database** — separate from online customers.

### Viewing POS Customers

Go to **POS → Customers** to see all customers who have bought from your store.

Each customer record shows:
- Name, phone
- Total orders
- Total spent
- Outstanding due/credit

### Customer Detail Page

Click any customer to see:
- Complete purchase history
- All bills ever created for this customer
- Total amount spent
- Outstanding dues
- Credit transactions

### Adding a Customer

- From the POS screen, type a new customer name in the customer field.
- Click "New Customer".
- Enter name and phone.
- The customer is added to your POS database.

---

## 11. POS Suppliers & Purchase Entry

When you buy stock from suppliers (vendors), you record it in the **Supplier / Purchase Entry** section.

### What is a Purchase Entry?

A purchase entry records:
- **What you bought** — which products and how many.
- **From whom** — the supplier.
- **At what cost** — the purchase price.
- **When** — the date.

This helps you track:
- How much stock came in.
- Cost of goods.
- Money owed to suppliers.

### Managing Suppliers

Go to **POS → Suppliers** to see all your product suppliers.

**Adding a Supplier:**
1. Click "Add Supplier".
2. Fill in:
   - Supplier name
   - Phone & address
   - GSTIN
   - Opening balance (if they owe you money or you owe them)
3. Save.

**Supplier Detail Page:**
- Shows all purchase entries from this supplier.
- Shows the total amount owed to this supplier.
- Full transaction ledger.

### Creating a Purchase Entry

1. Open the POS screen.
2. Click the **"Purchase"** tab or button (usually at the top).
3. Select the supplier.
4. Add the products you purchased:
   - Search for the product.
   - Enter quantity purchased.
   - Enter the purchase price (what you paid per unit).
   - Enter the batch number, manufacturing date, expiry date (for FMCG/pharma).
   - Enter the barcode (if getting new barcodes).
5. Set the **payment mode:**
   - **Cash** — paid immediately in cash.
   - **Credit** — to be paid later.
   - **Online** — paid via bank transfer/online.
6. Add the **total bill amount** with any discount or tax.
7. Click **"Save Purchase Entry"**.

**What Happens After Saving:**
- Stock quantities of all purchased products are automatically increased.
- If paid via credit, the amount is added to the supplier's outstanding balance.
- The purchase entry appears in the **Purchase Report**.

---

## 12. POS Reports

### POS Report

Go to **POS → Report** to see a comprehensive summary of all POS sales.

Filters available:
- Date range (today, this week, this month, custom)
- Payment method
- Staff member (who made the sale)
- Order type (retail/wholesale)

Shows:
- Total sales amount
- Number of bills generated
- Breakdown by payment method
- Top products sold
- Sales trends chart

### POS Invoice Report

Shows all individual bills/invoices with:
- Bill number
- Customer name
- Date
- Items count
- Total amount
- Payment method

Each bill can be reprinted from this report.

### Staff Bill Report

Go to **Staff Bill Report** to see which staff member created which bills.

- Useful for tracking accountability and performance.
- Filter by date range and staff member.

---

## 13. Barcode Scanning

The POS supports **barcode scanning** to quickly add products.

### How Barcode Scanning Works:

**Option 1: Using a Physical Barcode Scanner**
- Plug in a USB barcode scanner to the computer.
- Click the Search field in POS.
- Scan the product barcode with the scanner.
- The product is automatically found and added to the bill.

**Option 2: Using Phone Camera (QR/Barcode Scanner)**
- Click the **"Scan"** (camera) icon in the search bar.
- A camera viewfinder opens.
- Point at the product barcode.
- The product is found and added.

### Generating Barcodes for Products

Go to **Barcode Settings** to:
- Generate barcodes for products that don't have them.
- Print barcode labels in bulk (choose label paper size).
- Configure barcode format.

### Supported Barcode Formats:
- QR Code
- EAN-13
- EAN-8
- Code-128
- Code-39

---

## 🔑 POS Keyboard Shortcuts (Quick Reference)

| Action | Shortcut |
|--------|---------|
| Focus search | Click search bar or press any letter |
| Increase quantity | Click + or type number |
| Remove item | Click × on item |
| New bill | Click + tab at top |
| Switch bills | Click bill tab |

---

## ❓ POS Common Questions

**Q: What if I accidentally add a wrong product?**
A: Click the × (remove) icon next to that product in the bill panel to remove it.

**Q: Can I modify a completed bill?**
A: Once completed, bills are saved as records. However, Admin can edit order items if needed. Always double-check before completing.

**Q: What is the difference between Retail and Wholesale mode?**
A: Retail mode uses the regular selling price (MRP minus discount). Wholesale mode uses the lower wholesale price meant for bulk buyers or resellers.

**Q: How do I handle a customer who wants to pay partly in cash and partly via UPI?**
A: Check if "Mixed Payment" is available in your POS settings. If not, use whichever method covers the larger amount and note the split manually.

**Q: My thermal printer is not printing. What to do?**
A: Make sure the printer is connected and set as the default printer in your computer's printer settings. Use the browser's print dialog.
