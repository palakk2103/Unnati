# Unnati Platform — Complete Project Overview

> **A User Manual for Clients**
> This document explains what the Unnati platform is, who uses it, and how all the pieces fit together.

---

## 🌟 What is Unnati?

**Unnati** is a full-featured, multi-role e-commerce and retail management platform. It is designed to serve the entire commerce ecosystem — from the customer who shops online, to the seller who manages their store, to the delivery person who delivers packages, to the admin who oversees everything.

Think of it as an all-in-one digital marketplace solution similar to Amazon or Flipkart — but built for local/regional businesses where sellers, delivery agents, and customers are all part of the same community.

---

## 👥 Who Uses This Platform?

The platform has **four types of users**, each with their own separate app/portal:

| User Type | What They Do | Where They Log In |
|-----------|-------------|-------------------|
| 🛒 **Customer** | Browses products, places orders, tracks deliveries | Main website (home page) |
| 🏪 **Seller** | Lists products, manages stock, runs a POS billing system | `/seller` portal |
| 🚚 **Delivery Person** | Picks up and delivers orders, tracks earnings | `/delivery` portal |
| 👨‍💼 **Admin** | Manages everything — sellers, products, orders, reports | `/admin` portal |
| 👔 **Staff** | Helps sellers at the billing counter (POS) | Staff login |

---

## 🏗️ How the Platform is Structured

```
Unnati Platform
│
├── 🛒 Customer App  →  Shop, Cart, Checkout, Orders, Wishlist
│
├── 🏪 Seller App    →  Dashboard, Products, POS Billing, Wallet, Reports
│
├── 🚚 Delivery App  →  Orders, Delivery Tracking, Earnings
│
└── 👨‍💼 Admin App    →  All Management, Analytics, Reports, Settings
```

---

## 🔑 Key Features at a Glance

### For Customers
- Browse products by category, brand, or search
- Flash Deals, Deal of the Day, Featured Deals
- Add to Cart & Wishlist
- Multiple payment options (online + cash on delivery)
- Live order tracking with OTP-verified delivery
- Return & replacement requests
- Coupon codes and first-order discounts
- Video product finds

### For Sellers
- Full product management (add, edit, stock)
- **POS (Point of Sale)** billing system for in-store customers
- Online order management (pending → received → shipped → delivered)
- Wallet with earnings & withdrawal requests
- Detailed sales, GST, stock, and purchase reports
- Barcode printing and scanning
- Supplier management & purchase entries
- Category and subcategory management

### For Delivery Agents
- See pending orders assigned to them
- Navigate to seller and customer locations
- Mark orders as picked up, in transit, delivered
- Collect cash, update earnings
- Handle return/replacement orders

### For Admins
- Manage all sellers, delivery boys, customers
- View complete analytics dashboard
- Approve/reject sellers
- Manage promotions (banners, flash deals, coupons)
- Configure the entire platform (taxes, delivery settings, themes)
- Generate comprehensive business reports

---

## 📁 User Manual Index

The following manuals cover each part of the platform in detail:

| File | What It Covers |
|------|---------------|
| `01-CUSTOMER-MANUAL.md` | Shopping, orders, wishlist, returns |
| `02-SELLER-MANUAL.md` | Products, orders, POS, wallet, reports |
| `03-DELIVERY-MANUAL.md` | Order delivery, earnings, profile |
| `04-ADMIN-MANUAL.md` | Full platform management |
| `05-POS-BILLING-SYSTEM.md` | In-store billing system details |
| `06-ORDER-FLOW.md` | How an order moves from placement to delivery |
| `07-PROMOTIONS-DISCOUNTS.md` | Coupons, flash deals, free gifts |
| `08-REPORTS-ANALYTICS.md` | All reports available in the platform |
| `09-STOCK-INVENTORY.md` | Stock management, barcode, bulk import |
| `10-WALLET-PAYMENTS.md` | Payments, wallet, withdrawals |

---

## 🌐 Platform URLs

| Portal | URL |
|--------|-----|
| Customer Shopping | `/` (home page) |
| Seller Login | `/seller/login` |
| Seller Signup | `/seller/signup` |
| Delivery Login | `/delivery/login` |
| Admin Login | `/admin/login` |
| Staff Login | `/admin/staff-login` or `/seller/staff-login` |

---

## 📱 Technology

- The platform works on **web browsers** (mobile & desktop friendly)
- Real-time notifications are delivered via **Firebase push notifications**
- Payments are handled via **Razorpay** (online payment gateway)
- Shipping is managed via **Shiprocket** integration
- Products can be found using **AI-powered semantic search**
- Location-based filtering shows products available near the customer

---

*This is a living document. For detailed flows of each section, refer to the individual manual files listed above.*
