# Stock & Inventory Management Manual
## How to Manage Products, Stock, Barcodes & Bulk Operations

> This guide covers **everything related to managing your product inventory** — adding stock, tracking levels, bulk updates, barcode printing, and storage locations.

---

## 📋 Table of Contents

1. [Understanding Stock in This Platform](#1-understanding-stock)
2. [Viewing Current Stock](#2-viewing-current-stock)
3. [Updating Stock Manually](#3-updating-stock-manually)
4. [Bulk Stock Edit (Spreadsheet View)](#4-bulk-stock-edit)
5. [Bulk Stock Import (Excel Upload)](#5-bulk-stock-import)
6. [Stock Alerts — Low Stock & Out of Stock](#6-stock-alerts)
7. [Storage Locations — Organizing Your Warehouse](#7-storage-locations)
8. [Barcode Management](#8-barcode-management)
9. [Purchase Entries — Recording What You Buy](#9-purchase-entries)
10. [Inventory Loss — Recording Damaged/Expired Items](#10-inventory-loss)
11. [Stock Reports (Quick Reference)](#11-stock-reports)

---

## 1. Understanding Stock in This Platform

### How Stock is Tracked

Every product on the platform has **stock tracked at the variant level**. This means:

- A product "Wheat Flour" with two variants (1kg, 5kg) has **separate stock** for each variant.
- Stock for "Wheat Flour 1kg" = 50 units
- Stock for "Wheat Flour 5kg" = 20 units

**Stock decreases when:**
- An online order is placed (items are reserved).
- A POS sale is made.

**Stock increases when:**
- You manually update the stock quantity.
- You record a purchase entry from a supplier.
- A return is processed (item comes back to your stock).

### Stock Status Labels

| Status | Meaning |
|--------|---------|
| **In Stock** | Stock > Low Stock Threshold |
| **Low Stock** | Stock ≤ Low Stock Threshold (but > 0) |
| **Out of Stock** | Stock = 0 |

When a product is **Out of Stock:**
- Customers see "Out of Stock" on the product page.
- They cannot add it to their cart.
- It may be hidden from search results (depending on settings).

---

## 2. Viewing Current Stock

### For Sellers:

1. Go to **Products → Stock Management** in the sidebar.
2. A table lists all your products with:
   - Product name and image
   - Category and subcategory
   - Variant name
   - Current stock quantity
   - Low stock threshold
   - Stock status badge (In Stock / Low Stock / Out of Stock)
   - Last updated date

**Filtering Options:**
- By category
- By subcategory
- By stock status (show only Low Stock / show only Out of Stock)
- Search by product name

### For Admin:

Same as above but covers **all products from all sellers**. Additional filter:
- By seller name

---

## 3. Updating Stock Manually

### Single Product Stock Update:

1. Go to **Stock Management**.
2. Find the product you want to update.
3. Click the **edit/pencil icon** next to the stock number.
4. Enter the new stock quantity in the field.
5. Press Enter or click **Save**.
6. The stock is updated instantly.

> ⚠️ **Important:** Entering a new number **replaces** the current stock, it does not add to it.
> - If stock is 10 and you want to add 20 more, enter **30** (not 20).

### Updating from Product Edit Page:

1. Go to **Product List**.
2. Click **Edit** on a product.
3. Under each variant, update the **Stock** field.
4. Save the product.

---

## 4. Bulk Stock Edit

**What it is:** An Excel-like grid view where you can edit stock (and prices) for many products at once without opening each one individually.

### How to Use Bulk Edit:

1. Go to **Products → Bulk Edit** (Seller) or equivalent in Admin.
2. A spreadsheet-style table loads with all your products.
3. Each row represents one **product variant**.
4. You can directly click and edit:
   - Stock quantity
   - Retail price
   - Wholesale price
   - Purchase price
   - Discount price
5. Navigate between cells using Tab or arrow keys.
6. After making all changes, click **"Save All"** at the top.

### What Can Be Edited in Bulk Edit:
- Stock quantity
- Selling price (retail)
- Wholesale price
- Purchase/cost price
- Discount price (MRP for display)

### Tips for Bulk Edit:
- Make your edits, then save — don't close the tab without saving.
- The system highlights changed cells before you save.
- For large inventories (100+ products), scroll to find specific products or use the search/filter.

---

## 5. Bulk Stock Import

**What it is:** Upload an Excel file to update stock for many products at once — the fastest way to do a large stock update.

### Step-by-Step:

1. Go to **Products → Bulk Import** (Seller) or equivalent.

2. **Download the template:**
   - Click **"Download Template"**.
   - An Excel file (.xlsx) downloads to your computer.
   - The template has the correct column headers already set up.

3. **Fill in the template:**
   Open the Excel file. You'll see columns like:
   - Product ID (do not change this)
   - Product Name (for reference, do not change)
   - Variant Name (for reference)
   - Barcode (for reference)
   - New Stock Quantity ← **This is the column you fill in**
   - Purchase Price (optional)
   - Selling Price (optional)

   Fill in the quantities for all products you want to update.

4. **Upload the filled template:**
   - Click **"Upload File"**.
   - Select your saved Excel file.
   - Click **"Import"**.

5. **Review and confirm:**
   - The system shows a preview of the changes.
   - Review for errors.
   - Click **"Confirm Import"** to apply.

### Notes:
- Only update the rows for products whose stock changed.
- Leave quantity blank (or 0) for products you don't want to change.
- Do NOT change the Product ID column — it's used to match records.

---

## 6. Stock Alerts

### Low Stock Alert

Each product has a **Low Stock Threshold** — a number that triggers a warning when stock falls at or below it.

**Setting the threshold:**
- When adding/editing a product, set the **"Low Stock Quantity"** field (default is 5).
- Example: Set to 10 → when only 10 units remain, the product shows as "Low Stock".

**Where you see low stock warnings:**
- **Stock Management page** — products highlighted in orange/yellow.
- **Low Stock Summary Report** — dedicated report for all low-stock items.
- **Dashboard widget** (if configured).
- **Push notification** (if admin has configured low-stock alerts).

### Out of Stock

- When stock = 0, the product automatically becomes **Out of Stock**.
- Customer app hides or shows it as unavailable.
- Seller should restock immediately.

---

## 7. Storage Locations — Organizing Your Warehouse

**What is a Storage Location?**
A system for tracking exactly where in your physical warehouse each product is stored.

### Structure:
```
City → Warehouse → Room → Rack Number
```

**Example:**
- City: Mumbai
- Warehouse: Main Warehouse
- Room: Room A
- Rack: Rack-3, Shelf-2

### Setting Up Storage Locations:

**For Admin:**
1. Go to **Product → Storage Location**.
2. Add your cities, warehouses, rooms, and rack numbers.

**For Seller:**
1. Go to **Products → Storage Location**.
2. Set up your local storage structure.

### Assigning a Product to a Location:

When adding or editing a product:
- Scroll to the **Storage Location** section.
- Select: City → Warehouse → Room → Rack Number.
- Save.

When editing variants:
- Each variant can have its own rack number (since different sizes might be in different spots).

### Why is This Useful?

- **Faster picking:** Staff can find products instantly without searching the entire store.
- **Organized warehouse:** Everything has a designated place.
- **Training new staff:** New employees can find products easily using the rack number on the order/POS.
- **POS integration:** When using POS, the rack number is shown alongside the product — helping the billing person tell the warehouse staff exactly where to get the item.

---

## 8. Barcode Management

### What are Barcodes Used For?

- **Scanning at POS:** Instead of typing the product name, just scan the barcode — the product is added instantly.
- **Labeling products:** Stick barcodes on your products for easy identification.
- **Stock management:** Scan barcodes to update stock quickly.

### Assigning Barcodes to Products

When adding or editing a product variant:
- Enter the barcode number in the **Barcode** field.
- Multiple barcodes can be added to one variant (useful if the product has both a manufacturer barcode and your own barcode).

### Generating New Barcodes

If your product doesn't have a barcode:
1. Go to **Barcode Settings**.
2. Select products to generate barcodes for.
3. The system generates unique barcodes for each variant.
4. These are then printed as labels.

### Printing Barcode Labels

1. Go to **Barcode Settings** (Seller or Admin).
2. Select the products/variants you want to print labels for.
3. Choose the **label size:**
   - Small (for tiny products)
   - Standard (most common)
   - Large (for bigger boxes)
   - Thermal roll format (for thermal printers)
4. Click **"Print"** — the labels open in a printable layout.
5. Print on label paper or regular paper.

### What a Barcode Label Shows:
- Store name / logo (optional)
- Product name
- Variant/size
- MRP (retail price)
- Barcode lines
- Barcode number (digits below the lines)

### Scanning Barcodes at POS

Two methods:
1. **USB barcode scanner:** Plug in, click the POS search bar, scan — product auto-added.
2. **Phone camera:** Click the scan icon in the POS, point camera at barcode, auto-added.

---

## 9. Purchase Entries — Recording What You Buy

When you buy products from suppliers/vendors, you record it as a **Purchase Entry**.

### Why Record Purchase Entries?

1. **Stock is automatically increased** when you record a purchase.
2. **Purchase price** is tracked for profit calculation.
3. **Supplier ledger** shows what you owe each supplier.
4. **GST input credit** — purchase records help claim GST input credit.
5. **Stock Balance report** shows correct Opening + Purchases = Closing.

### How to Record a Purchase Entry:

1. Go to **POS → Orders** (POS screen).
2. Click the **"Purchase"** mode button at the top.
3. Select or add the **Supplier**.
4. Add each product purchased:
   - Search for the product.
   - Enter quantity purchased.
   - Enter purchase price per unit.
   - Enter batch number, manufacturing date, expiry date (for FMCG/pharma).
   - Enter/verify barcode.
5. Add any bill-level discount from supplier.
6. Set payment mode: Cash / Credit / Online.
7. Save the purchase entry.

**After saving:**
- Stock quantity of each product increases by the purchased amount.
- If credit payment: Supplier's outstanding balance increases.
- Purchase entry appears in the Purchase Report.

### Purchase Entry for New Products

If you're buying a **new product** that doesn't exist in the system:
1. First, add the product to your product list.
2. Then record the purchase entry.

---

## 10. Inventory Loss — Recording Damaged/Expired Items

Sometimes products get damaged, expire, or go missing. You should record these as **losses**.

### How to Record a Loss:

1. Go to **Inventory Reports → Loss Summary** (or similar section in POS/Stock Management).
2. Click **"Record Loss"**.
3. Fill in:
   - Product name
   - Variant
   - Quantity lost
   - Reason (Damaged / Expired / Stolen / Other)
   - Date of loss
   - Notes (any additional information)
4. Save.

**After recording:**
- Stock is **decreased** by the lost quantity.
- Loss appears in the **Loss Summary Report**.
- The total value of loss is calculated and tracked.

### Why Recording Losses is Important:

- **Accurate stock:** Without recording losses, the system shows more stock than you actually have.
- **Profitability:** Losses reduce your profit — tracking them helps identify costly patterns.
- **Insurance:** If you have business insurance, documented losses support claims.
- **Tax:** Losses may be tax-deductible (consult your CA).

---

## 11. Stock Reports (Quick Reference)

| Report | Found At | What It Shows | When to Use |
|--------|----------|--------------|-------------|
| **Stock Summary** | Inventory Reports | Current stock of all products | Daily stock check |
| **Stock Balance** | Inventory Reports | Opening + Purchases − Sales = Closing | Month-end audit |
| **Low Stock** | Inventory Reports | Products below threshold | Reorder planning |
| **Out of Stock** | Inventory Reports | Zero-stock products | Emergency restocking |
| **Loss Summary** | Inventory Reports | Damage/expiry/theft records | Monthly loss audit |
| **Stock Sales Summary** | Reports → Sales | How many units of each product sold | Sales velocity analysis |
| **Purchase Report** | Seller → Purchase Report | All purchase entries from suppliers | Supplier audit |
| **Due Summary** | Reports → Sales | Credit customer outstanding balances | Collections follow-up |

---

## ✅ Daily Stock Checklist (Recommended)

1. ☐ Check **Low Stock Summary** — identify products needing reorder.
2. ☐ Check **Out of Stock Summary** — these need urgent attention.
3. ☐ Verify any **purchase entries** received today are recorded.
4. ☐ Record any **damaged or expired items** found.
5. ☐ Check POS sales from yesterday — ensure stock deducted correctly.
