# Admin User Manual
## How to Manage the Entire Unnati Platform

> This guide is for the **Platform Admin** — the person(s) responsible for running and managing the entire Unnati platform.

---

## 📋 Table of Contents

1. [Admin Login](#1-admin-login)
2. [Admin Dashboard](#2-admin-dashboard)
3. [Managing Sellers](#3-managing-sellers)
4. [Managing Delivery Boys](#4-managing-delivery-boys)
5. [Managing Customers](#5-managing-customers)
6. [Order Management](#6-order-management)
7. [Product & Category Management](#7-product--category-management)
8. [Promotions & Marketing](#8-promotions--marketing)
9. [Financial Management](#9-financial-management)
10. [Reports & Analytics](#10-reports--analytics)
11. [Platform Settings](#11-platform-settings)
12. [POS Management](#12-pos-management)
13. [Staff & System Users](#13-staff--system-users)
14. [Content Management](#14-content-management)

---

## 1. Admin Login

1. Go to `/admin/login`.
2. Enter your **admin email** and **password**.
3. Click **"Login"** — you are taken to the **Admin Dashboard**.

> 🔒 The admin portal is completely separate from the customer-facing website and is only accessible to authorized admin users.

---

## 2. Admin Dashboard

The **Admin Dashboard** is your command centre — giving you a real-time bird's eye view of the entire platform.

### Key Performance Indicators (KPI Cards):

| Card | What It Shows |
|------|--------------|
| **Total Orders** | All-time total orders placed |
| **Today's Orders** | Orders placed today |
| **Total Revenue** | All-time revenue generated |
| **Today's Revenue** | Revenue generated today |
| **Total Sellers** | Number of registered sellers |
| **Total Customers** | Number of registered customers |
| **Total Delivery Boys** | Number of delivery agents |
| **Total Products** | Total products listed on the platform |

### Charts & Analytics:

- **Sales Line Chart** — Shows revenue trends over days/weeks/months (you can toggle the time period).
- **Order Analytics Chart** — Shows order count trends.
- **Top Sellers** — Ranked list of sellers by revenue.
- **Sales by Location** — Breakdown of sales by city/area.
- **Today's Sales Summary** — Quick view of today's performance.
- **Recent Orders Table** — The most recent orders with customer name, amount, and status.

### Store Link / App Sharing
- The dashboard has a **"Share Store Link"** button.
- This generates a WhatsApp/social media sharing message with your store URL — handy for promoting the platform.

---

## 3. Managing Sellers

This is one of the most important admin functions — you control who can sell on your platform.

### Viewing All Sellers

Go to **Manage Sellers → Seller List**.

You see a complete table with:
- Seller name & store name
- Email and phone
- City
- Commission rate
- Balance in their wallet
- Registration date
- Status (Approved / Pending / Rejected)
- Action buttons

### Approving a New Seller

When a seller signs up, they appear in the list with **"Pending"** status.

1. Find the seller in the list.
2. Review their details (documents, bank info, location, etc.).
3. Click the **Approve** button — the seller is now active and can start selling.
4. Or click **Reject** with a reason.

### Editing Seller Details

1. Click the **Edit** icon next to any seller.
2. Modify any field (commission, service radius, permissions, etc.).
3. Save changes.

### Enable/Disable a Seller

- The **Enable/Disable** toggle activates or suspends a seller.
- A **disabled seller** cannot accept new orders and sees a warning on their dashboard.
- Use this if a seller violates policies or needs to be temporarily suspended.

### Seller Permissions (Per Seller)

You can control what each seller can do:
| Permission | Description |
|-----------|-------------|
| **Require Product Approval** | All products this seller adds must be approved by Admin before going live |
| **Can View Customer Details** | Whether seller can see full customer contact info |
| **Can Create Categories** | Whether seller can create their own product categories |

### Adding a Seller Manually

Go to **Manage Sellers → Add Seller** to create a seller account yourself (instead of waiting for them to sign up).

Fill in all seller details, location, bank info, and submit.

### Seller Transactions

Go to **Manage Sellers → Transactions** to see all financial transactions for all sellers — wallet credits, debits, and settlements.

### Seller Location Map

Go to **Manage Location → Seller Location** to see all sellers plotted on a map. This helps you visualize your seller network geographically.

### User Limit per Seller

Go to **Manage Sellers → User Limit** to set how many users/sub-accounts each seller can create.

---

## 4. Managing Delivery Boys

### Viewing All Delivery Agents

Go to **Delivery Boy → Manage**.

See a table with:
- Name, phone, email
- Vehicle type & number
- Current status (Online/Offline)
- Today's deliveries
- Total earnings
- Cash balance (cash they've collected)
- Account status (Active/Inactive)

### Adding a New Delivery Boy

Go to **Delivery Boy → Add**.

Fill in:
- Personal details (name, phone, email)
- Vehicle information
- Password
- Upload documents

### Approving Delivery Agents

Similar to sellers — new delivery agents are in "Pending" status until admin approves them.

### Fund Transfer (Cash Settlement)

Go to **Delivery Boy → Fund Transfer**.

- When a delivery agent submits their collected cash, record it here.
- Select the delivery agent, enter the amount submitted.
- This clears their "Cash Balance" by the recorded amount.

### Cash Collection Report

Go to **Delivery Boy → Cash Collection** to see:
- Which agents collected how much cash.
- Which amounts have been submitted and which are pending.
- Full audit trail of cash flow.

---

## 5. Managing Customers

### Viewing All Customers

Go to **Customers** from the sidebar.

See all registered customers with:
- Name, phone, email
- Registration date
- Total orders
- Total spent
- Wallet balance

### Customer Actions

- **View customer details** — full profile and order history.
- **Block/unblock** a customer if needed.

### Abandoned Carts

Go to **Customers → Abandoned Carts**.

- See all customers who added items to cart but didn't place an order.
- This is useful for identifying lost sales and running re-engagement campaigns.
- You can see the cart contents and when it was abandoned.

---

## 6. Order Management

The admin can see and manage ALL orders from ALL sellers on the platform.

### All Orders View

Go to **Orders → All Orders**.

A comprehensive list with:
- Order number
- Customer name
- Seller name
- Order total
- Payment method & status
- Order status
- Date

Filter by:
- Date range
- Order status
- Seller
- Payment method

### Filtered Order Views

Quickly navigate to specific order stages:
- **Pending Orders** — New orders not yet processed
- **Received Orders** — Acknowledged orders
- **Processed Orders** — Packed and ready
- **Shipped Orders** — Dispatched via courier
- **Out for Delivery** — With delivery agent
- **Delivered Orders** — Successfully delivered
- **Cancelled Orders** — Cancelled for any reason

### Order Detail Page

Click any order to see:
- Complete customer information
- Delivery address on map
- All items ordered (products, quantities, prices)
- Price breakdown (subtotal, tax, shipping, discount, coupon, total)
- Payment details
- Assigned delivery boy
- Order status timeline
- Options to:
  - Update order status
  - Add admin notes
  - Assign/reassign delivery boy
  - Cancel order
  - Process return/refund

### Return Requests

Go to **Return Requests** — see all return requests from all customers.

For each request:
- Customer details
- Order and product information
- Reason for return
- Customer's photos
- Status (Pending / Approved / Rejected / Completed)

Actions you can take:
- **Approve** the return → triggers refund process
- **Reject** with explanation
- **Assign delivery** agent to pick up the return item

### Replace Requests

Go to **Replace Requests** — same as return requests but for replacements.

---

## 7. Product & Category Management

### Categories

Go to **Category** to manage the main product categories on the platform.

- Add, edit, or delete categories.
- Upload category images.
- Each category gets a unique page on the customer side.

### Header Categories

Go to **Category → Header Category** to manage the categories shown in the **navigation bar** at the top of the website.

- These are the "featured" or "highlighted" categories.
- Drag and reorder them.
- Set banners for each header category.
- Link to a category page or custom page.

### Subcategories

Go to **Subcategory** to manage subcategories under each category.

- Add, edit, delete subcategories.
- Assign them to parent categories.
- Set display order.

### Subcategory Order

Go to **Subcategory Order** to drag-and-drop rearrange the order subcategories appear in.

### Brands

Go to **Brand** to manage brands.

- Add new brands with logo and name.
- Edit or delete existing brands.
- Brands appear as filter options on the customer app.

### Product List / Stock Management

Go to **Product → Product List** to see ALL products from ALL sellers.

- Filter by seller, category, status.
- Edit any product.
- Change status (Active/Inactive/Pending/Rejected).
- View stock levels.

### Product Approval

If any seller has **"Require Product Approval"** enabled:
- New products from that seller appear with **"Pending"** status.
- Admin reviews and clicks **"Approve"** or **"Reject"** (with reason).
- Only approved products are visible to customers.

### Taxes

Go to **Product → Taxes** to manage GST/tax slabs.

- Create tax categories (e.g., 5% GST, 12% GST, 18% GST, 28% GST).
- These are available when sellers add products.

### Attributes & Variation Types

Go to **Product → Attributes** and **Product → Variation Types**.

- Create reusable product attributes (e.g., "Material", "Colour").
- Create variation types (e.g., "Size", "Weight") that sellers use when adding product variants.

### Storage Location Setup

Go to **Product → Storage Location** to set up the warehouse/storage structure.

- Define cities, warehouses, rooms, and rack numbers.
- Sellers can assign their products to these locations.

---

## 8. Promotions & Marketing

This section is where you create all the deals, discounts, and promotional content.

### Banners

Go to **Promotion → Banner Setup**.

- **Banner Management** — Add, edit, and manage promotional banners.
- Each banner has:
  - Image
  - Link (where clicking takes the user)
  - Position (home page hero, side banner, etc.)
  - Active/inactive toggle

### Flash Deals

Go to **Promotion → Flash Deals**.

- Create time-limited deals that expire at a specific time.
- Add products to the flash deal with a special discounted price.
- Set start and end date/time.
- A countdown timer shows on the customer app during the deal.

### Deal of the Day

Go to **Promotion → Deal of the Day**.

- Feature one or more products as "Deal of the Day".
- Set the special deal price.
- It's highlighted prominently on the home page.

### Featured Deal

Go to **Promotion → Featured Deal**.

- Manually curate a set of featured/promoted products.
- These appear in a special "Featured Deals" section on the home page.

### First Order Offer

Go to **Promotion → First Order Offer**.

- Configure a special discount for customers placing their **very first order**.
- Set the discount type (flat ₹ off, or % off).
- Set the minimum order value to qualify.

### Free Gift Rules

Go to **Promotion → Free Gift Rules**.

- Create automatic free gift offers based on cart value.
- Example: "Spend ₹1,000 and get a free item worth ₹50".
- Multiple tiers can be set (₹500 → Gift A, ₹1,000 → Gift B, ₹2,000 → Gift C).
- When customers add items to cart and reach the threshold, the gift is automatically added.

### Coupons

Go to **Coupon** to manage discount coupons.

**Creating a Coupon:**
- Coupon Code (e.g., "SAVE20")
- Discount Type: Percentage or Fixed Amount
- Discount Value (e.g., 20% or ₹100)
- Minimum Order Value to apply
- Maximum Discount Cap (for percentage coupons)
- Usage Limit (how many times total)
- Per-User Limit (how many times one customer can use it)
- Expiry Date
- Applicable Products/Categories (or "All")

### Promo Strip

Go to **Promo Strip** to manage the scrolling promotional banner.

- A horizontal scrolling bar on the customer app showing short text messages.
- E.g., "Free delivery on orders above ₹299!" or "New arrivals this week!"
- Add, edit, or delete promo strip messages.

### Bestseller Cards

Go to **Bestseller Cards** to manually curate products to appear in the "Bestsellers" section on the home page.

### Home Section

Go to **Home Section** to manage the layout and content of the main home page sections.

- Control which sections appear and in what order.
- Enable/disable individual sections.
- Title customization for each section.

### Lowest Prices

Go to **Lowest Prices** to manage the "Lowest Prices Ever" section on the home page.

- Manually add products that should appear in this section.

### Shop by Store

Go to **Shop by Store** to manage the "Shop by Store" section.

- Curate products or stores that appear in the "Shop by Store" section.
- Useful for highlighting specific sellers or exclusive store collections.

---

## 9. Financial Management

### Admin Wallet

Go to **Wallet** to see and manage the platform's central wallet.

- View total platform earnings.
- See all seller transactions.
- Approve/reject seller withdrawal requests.

### Seller Transactions

Go to **Manage Sellers → Transactions** for a complete ledger of all money movements between the platform and sellers.

### Payment List

Go to **Payment List** to see all payment transactions from customers (online payments via Razorpay).

- Payment ID
- Customer
- Amount
- Date
- Status (Paid/Pending/Failed/Refunded)

### Payment Report

Go to **Reports → Payment** for a detailed payment analytics report filtered by date range.

---

## 10. Reports & Analytics

The admin has access to the most comprehensive set of reports on the platform.

### Sales Reports

| Report | Location | What It Shows |
|--------|----------|--------------|
| **Sales Summary** | Reports → Sales Summary | High-level sales performance |
| **Sales Report Detail** | Reports → Sales → Summary | Detailed period-wise breakdown |
| **Online Order Report** | Reports → Order | Online orders with all details |
| **Invoice Report** | Reports → Invoice | All generated invoices |
| **Payment Report** | Reports → Payment | Payment gateway transactions |

### GST Reports

| Report | Location | What It Shows |
|--------|----------|--------------|
| **GST Sales Report** | Reports → GST Sales | Sales with GST breakdown |
| **GST Register** | Reports → GST Register | Complete GST compliance register |

### Inventory Reports

| Report | Location | What It Shows |
|--------|----------|--------------|
| **Stock Summary** | Reports → Inventory → Stock Summary | Overview of all product stock |
| **Stock Balance** | Reports → Inventory → Stock Balance | Opening − Sold + Purchased = Closing |
| **Low Stock Summary** | Reports → Inventory → Low Stock | Products below threshold |
| **Out of Stock** | Reports → Inventory → Out of Stock | Zero-stock products |
| **Loss Summary** | Reports → Inventory → Loss Summary | Damaged/lost inventory |

### Business Summary Reports

| Report | Location | What It Shows |
|--------|----------|--------------|
| **Return & Exchange Summary** | Reports → Sales → Return/Exchange | All returns and exchanges |
| **Stock Sales Summary** | Reports → Sales → Stock Sales | Sales volume per product |
| **Due Summary** | Reports → Sales → Due Summary | Outstanding dues from credit customers |
| **Purchase Report** | Purchase Report | All supplier purchase entries |

### POS Reports

| Report | Location | What It Shows |
|--------|----------|--------------|
| **POS Report** | POS → Report | Summary of all in-store POS sales |
| **POS Invoice Report** | Reports → Invoice | All POS-generated bills |
| **POS Quotations** | POS → Quotations | All quotations created in POS |

---

## 11. Platform Settings

### Store Settings

Go to **Settings → Store Settings**.

- **Store Name** — the name shown to customers
- **Store Logo** — your brand logo
- **Store Contact** — email and phone for customer support
- **Address** — physical address
- **Currency** — currency used on the platform (₹ INR)

### App Settings

Go to **App Settings** to configure platform-wide settings:

| Setting | Description |
|---------|-------------|
| **Delivery Charge** | Flat delivery charge added to orders |
| **Free Delivery Above** | Minimum order amount for free delivery |
| **Platform Fee** | Convenience fee charged to customers |
| **Minimum Order Value** | Minimum cart value to place an order |
| **COD Available** | Whether Cash on Delivery is enabled |
| **Razorpay Enabled** | Whether online payments are enabled |
| **Gift Packaging Fee** | Extra charge for gift wrapping |
| **Tip Options** | Preset tip amounts shown at checkout |
| **First Order Offer** | Enable/disable first-order discounts |

### Delivery Settings

Go to **Delivery Settings** to configure how delivery works:

- Set delivery areas and zones.
- Configure delivery charges by distance or zone.
- Set delivery time slots.
- Enable/disable express delivery.

### Theme Settings

Go to **Settings → Theme** to customize the look and feel of the platform:

- **Primary Color** — the main brand color used throughout the app.
- **Secondary Color** — accent color.
- **Font** — the typeface used on the website.
- Changes apply to the **entire customer-facing website** in real time.

### Barcode Settings

Go to **Barcode Settings** to configure how barcodes are generated and printed across the platform.

### Product Display Settings

Go to **Product Display Settings** to control how products are shown to customers:
- Default sorting order
- Number of products per page
- Which information fields to show/hide

### SMS Gateway

Go to **SMS Gateway** to configure the SMS/notification service.
- Enter API credentials for your SMS provider.
- Used for OTP delivery and order notifications.

### Customer App Policy

Go to **Customer App Policy** to write the **Terms & Conditions** and **Privacy Policy** shown to customers.
- Uses a rich text editor.
- Updates are immediately reflected in the customer app.

### Delivery App Policy

Go to **Delivery App Policy** to write the terms and guidelines for delivery agents.

---

## 12. POS Management

The Admin has their own **POS (Point of Sale)** system — separate from seller POS but with the same functionality.

Go to **POS → Orders** to use the admin POS.

**Admin POS is used for:**
- Direct in-office sales
- Demo/testing purposes
- Billing on behalf of sellers

Other POS management features for Admin:
- **POS Customers** — Manage POS-specific customers
- **POS Suppliers** — Manage product suppliers
- **POS Report** — Admin-level POS sales report
- **POS Quotations** — All saved quotations
- **POS Bill Settings** — Customize bill appearance

---

## 13. Staff & System Users

### Managing Staff

Go to **Manage Staff** to create and manage staff accounts.

Staff are employees who help with POS billing. They have limited access — they can only access the POS billing terminal.

**Adding Staff:**
1. Click "Add Staff".
2. Enter name, email, phone, password.
3. Assign to a seller/shop.
4. Save.

### Staff Bill Report

Go to **Staff Bill Report** to see all bills created by each staff member.

- Filter by staff member and date.
- Track individual staff performance.

### System Users

Go to **System Users** to manage admin-level sub-users.

- These are people who help manage the admin panel.
- You can create different system users with different levels of access.

### Users (Registered)

Go to **Users** to see all registered users across all roles (customers, sellers, delivery agents).

---

## 14. Content Management

### Video Management

Go to **Video Finds** to manage product videos shown on the customer app.

- Add video URLs (YouTube/embedded videos).
- Link each video to a product.
- Arrange the order of videos.
- Toggle videos on/off.

### FAQ Management

Go to **FAQ** to manage Frequently Asked Questions.

- Add, edit, or delete FAQ entries.
- Organize by category/topic.
- These appear in the **FAQ** section on the customer app.

### Notification Management

Go to **Notifications** to send bulk push notifications to users.

- Select target audience: All, Customers, Sellers, Delivery Agents.
- Write notification title and message.
- Send immediately or schedule.
- Useful for announcing new offers, platform updates, etc.

---

## 🗺️ Admin Left Sidebar Navigation Structure

```
DASHBOARD
├── Dashboard

PRODUCTS
├── Category
│   └── Header Category
├── Subcategory
│   └── Subcategory Order
├── Brand
└── Product
    ├── Taxes
    ├── Attribute Setup
    ├── Variation Types
    ├── Storage Location
    └── Product List / Stock Management

SELLERS
├── Manage Sellers
│   ├── Seller List
│   ├── Add Seller
│   ├── Transactions
│   └── User Limit
└── Seller Location

DELIVERY
├── Delivery Boys
│   ├── Manage
│   ├── Add Delivery Boy
│   ├── Fund Transfer
│   └── Cash Collection
└── Delivery Settings

ORDERS
├── All Orders
├── Pending
├── Received
├── Processed
├── Shipped
├── Out for Delivery
├── Delivered
├── Cancelled
├── Return Requests
└── Replace Requests

PROMOTIONS
├── Banner Setup
├── Flash Deals
├── Deal of the Day
├── Featured Deal
├── First Order Offer
└── Free Gift Rules

CUSTOMERS
├── Manage Customers
└── Abandoned Carts

FINANCIAL
├── Wallet
├── Coupon
├── Payment List
└── Sales Summary

REPORTS
├── Sales → Summary / Return-Exchange / Stock-Sales / Due Summary
├── Inventory → Stock Summary / Balance / Low Stock / Out of Stock / Loss
├── GST Sales Report
├── GST Register
├── Payment Report
├── Online Order Report
└── Invoice Report

POS
├── POS Orders
├── POS Customers
├── POS Suppliers
├── POS Report
├── POS Quotations
└── POS Bill Settings

CONTENT
├── Home Section
├── Bestseller Cards
├── Promo Strip
├── Lowest Prices
├── Shop by Store
├── Video Finds
└── FAQ

SETTINGS
├── Store Settings
├── App Settings
├── Theme Settings
├── Delivery Settings
├── Product Display Settings
├── Barcode Settings
├── Customer App Policy
├── Delivery App Policy
└── SMS Gateway

USERS
├── System Users
├── Users
└── Manage Staff

NOTIFICATIONS
└── Notifications
```

---

## ❓ Common Admin Questions

**Q: A seller is not receiving orders. What should I check?**
A: 
1. Check if the seller's account status is "Approved" and "Enabled".
2. Check if the seller has products in their categories.
3. Check if the seller's location is correctly set.

**Q: How do I refund a customer's money?**
A: Go to the order → Return Request → Approve the return. The refund is processed through the original payment method (Razorpay for online orders).

**Q: How do I change the platform's color theme?**
A: Go to Settings → Theme Settings → Change the primary color → Save. It takes effect immediately.

**Q: A product is showing to customers even though it's out of stock. What to do?**
A: Go to Product List → Find the product → Update its stock to 0 OR set its status to Inactive.

**Q: How do I add a new promotional banner for a festival?**
A: Go to Promotion → Banner Setup → Add Banner → Upload image → Set the link → Activate.
