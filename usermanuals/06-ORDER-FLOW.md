# Order Flow Manual
## How an Order Moves from Placement to Delivery

> This document explains the **complete lifecycle of an order** — from the moment a customer clicks "Buy" to the moment it's delivered at their door. Every role involved is covered.

---

## 📋 Table of Contents

1. [Overview — The Big Picture](#1-overview)
2. [Stage 1: Customer Places the Order](#2-stage-1-customer-places-the-order)
3. [Stage 2: Order Received by Seller](#3-stage-2-order-received-by-seller)
4. [Stage 3: Seller Processes the Order](#4-stage-3-seller-processes-the-order)
5. [Stage 4: Order Shipped / Ready for Pickup](#5-stage-4-order-shipped--ready-for-pickup)
6. [Stage 5: Delivery Agent Picks Up](#6-stage-5-delivery-agent-picks-up)
7. [Stage 6: Out for Delivery](#7-stage-6-out-for-delivery)
8. [Stage 7: Delivered with OTP](#8-stage-7-delivered-with-otp)
9. [What Happens with Payment](#9-what-happens-with-payment)
10. [Cancellation Flow](#10-cancellation-flow)
11. [Return & Replacement Flow](#11-return--replacement-flow)
12. [Order Status Reference](#12-order-status-reference)

---

## 1. Overview

```
CUSTOMER PLACES ORDER
        ↓
   ORDER RECEIVED (Seller notified)
        ↓
   SELLER PROCESSES ORDER (Packs items)
        ↓
   ORDER SHIPPED (Ready for pickup / Dispatched)
        ↓
   DELIVERY AGENT PICKS UP (Assigned & confirmed)
        ↓
   OUT FOR DELIVERY (Agent en route to customer)
        ↓
   DELIVERED (OTP verified — order complete)
        ↓
   PAYMENT SETTLED → Seller Wallet Credited
```

---

## 2. Stage 1: Customer Places the Order

**Who is involved:** Customer

**What happens:**

1. Customer visits the website and browses products.
2. Adds desired items to the **Shopping Cart**.
3. Goes to **Checkout**:
   - Selects or adds a delivery address.
   - Applies a coupon code (optional).
   - Adds gift packaging, tip, notes (optional).
   - Chooses payment method: Online (Razorpay) or Cash on Delivery.
4. Clicks **"Place Order"** or **"Pay Now"**.

**For Online Payment (Razorpay):**
- Customer is redirected to the Razorpay payment gateway.
- Enters UPI ID / Card details / Net Banking credentials.
- After successful payment, Razorpay confirms to the platform.
- The order is created with **payment status = Paid**.

**For Cash on Delivery:**
- No payment now.
- Order is created immediately with **payment status = Pending**.

**Result:**
- An order is created with a unique **Order Number** (e.g., ORD1234567890).
- Initial status: **"Received"**.
- Customer sees a **success screen** with confetti animation 🎉.
- Customer receives a **push notification** confirming the order.
- **Seller is notified** of a new order instantly.

---

## 3. Stage 2: Order Received by Seller

**Who is involved:** Seller

**What happens:**

1. Seller receives a **push notification**: "New Order Received!".
2. Seller goes to **Orders → Pending** in their portal.
3. Seller opens the order to review:
   - Customer name, phone, address.
   - List of all items ordered.
   - Payment method and status.
   - Special notes from customer.
4. Seller confirms they have the items in stock.

**Status:** "Received"

**If seller cannot fulfill the order:**
- Seller contacts customer (phone number available).
- Or cancels the order with a reason.
- If cancelled, online payment is refunded.

---

## 4. Stage 3: Seller Processes the Order

**Who is involved:** Seller

**What happens:**

1. Seller picks, packs, and prepares all items.
2. Ensures the packaging is safe and complete.
3. Attaches the invoice/packing slip inside the package.
4. In the portal, clicks **"Mark as Processed"**.

**Status:** "Processed"

**Customer is notified:** "Your order is being prepared."

---

## 5. Stage 4: Order Shipped / Ready for Pickup

**Who is involved:** Seller, Admin (for delivery assignment)

**What happens:**

**Option A — Platform Delivery (Internal Delivery Agent):**
1. Seller marks the order as ready.
2. Admin or the system assigns an available **delivery agent**.
3. The agent is notified of the pickup assignment.
4. Order status moves to **"Shipped"**.

**Option B — Third-Party Courier (Shiprocket):**
1. Seller generates a **Shiprocket shipping label**.
2. Enters the tracking number from the courier company.
3. Clicks **"Mark as Shipped"** with the tracking number.
4. Order status moves to **"Shipped"**.

**Status:** "Shipped"

**Customer is notified:** "Your order has been shipped."

---

## 6. Stage 5: Delivery Agent Picks Up

**Who is involved:** Delivery Agent

**What happens:**

1. Delivery agent receives a **push notification**: "New order assigned to you!"
2. Agent opens the order in their **Delivery App**.
3. Sees the seller's address and navigates to the seller's store.
4. Physically collects the packaged order.
5. Marks the order as **"Picked Up"** in the app.

**Status:** "Shipped" → delivery agent status: "Picked Up"

---

## 7. Stage 6: Out for Delivery

**Who is involved:** Delivery Agent, Customer

**What happens:**

1. Delivery agent starts driving toward the customer's address.
2. In the app, agent marks the order as **"Out for Delivery"** / "In Transit".
3. Order status updates to **"Out for Delivery"**.

**Customer experience:**
- Receives notification: "Your order is out for delivery!"
- Can open their **Order Detail** page and see:
  - The delivery agent's **name** and **phone number**.
  - A **live map** showing the agent's current location moving toward them.
  - Estimated time of arrival.

**Status:** "Out for Delivery"

---

## 8. Stage 7: Delivered with OTP

**Who is involved:** Delivery Agent, Customer

**What happens:**

1. Agent arrives at the customer's address.
2. Calls/knocks to meet the customer.
3. **If Cash on Delivery:** Collects the exact cash amount shown in the app.
4. Asks the customer for their **Delivery OTP**.
5. Customer opens their Order Detail page to find the 4-digit OTP.
6. Customer shares the OTP with the agent.
7. Agent enters the OTP in the delivery app.
8. System **verifies** the OTP.
9. If correct → order is marked **"Delivered"**.
10. Agent's earnings for this delivery are credited.

**Status:** "Delivered"

**Customer is notified:** "Your order has been delivered. Thank you for shopping!"

**What if OTP is wrong?**
- The system rejects the attempt.
- Agent cannot mark the order as delivered without the correct OTP.
- This prevents fake delivery confirmations.

**OTP Expired?**
- Customers can request a **new OTP** from the Order Detail page.
- A fresh OTP is generated and the old one is invalidated.

---

## 9. What Happens with Payment

### Online Payment (Razorpay):
- Customer paid at checkout.
- Payment is held by the platform.
- After successful delivery, the payment (minus commission) is settled to the **seller's wallet**.

### Cash on Delivery:
- Customer pays cash to the delivery agent at delivery.
- Agent's "Cash Balance" increases.
- Admin records the cash submission from the agent (Fund Transfer).
- Seller's earnings are credited to their wallet after verification.

### Commission:
- For every order, the platform deducts a **commission %** (set by admin per seller).
- The remaining amount goes to the seller's wallet.
- **Example:** Order total ₹1,000, commission 10% → Seller receives ₹900.

---

## 10. Cancellation Flow

**Cancellation Before Shipping (By Customer):**
1. Customer goes to **My Orders → Order Detail**.
2. Clicks **"Cancel Order"**.
3. Selects a cancellation reason.
4. Confirms cancellation.
5. If online payment was made → **full refund** is initiated.
6. Seller is notified of the cancellation.

**Cancellation by Seller:**
1. Seller cannot fulfill the order (out of stock, unavailable, etc.).
2. Seller cancels from their order management page with a reason.
3. Customer is notified.
4. If paid online → refund is initiated.

**Cancellation by Admin:**
- Admin can cancel any order from the Admin portal.
- Refund is processed accordingly.

**Refund Timeline:**
- For Razorpay payments: Typically 3–7 business days to reflect in the customer's bank account.
- For COD: No refund needed as cash was not paid.

---

## 11. Return & Replacement Flow

### Return Flow (Customer wants money back):

```
Customer Requests Return
        ↓
  Uploads photo of item + reason
        ↓
  Seller/Admin Reviews Request
        ↓
  Approved → Delivery agent sent to pick up item
           → Customer hands over item
           → Agent confirms pickup
        ↓
  Refund Processed to Customer
        ↓
  Item goes back to seller's stock
```

**Rejected Return:**
- Admin/seller rejects with a reason.
- Customer is notified.
- No refund issued.

**Return Window:**
- Returns are only valid if requested within the **return window** (product-specific: 7, 15, or 30 days).
- After the window, return requests cannot be filed.

### Replacement Flow (Customer wants same item again):

Same as return, except at the end:
- Customer receives a **replacement item** (the same product, new/working condition).
- No money is refunded.
- A new delivery is created for the replacement.

---

## 12. Order Status Reference

| Status | Meaning | Who Sets It |
|--------|---------|-------------|
| **Received** | Order placed, seller notified | Automatic |
| **Pending** | Seller reviewing/preparing | Seller |
| **Processed** | Order packed and ready | Seller |
| **Shipped** | Dispatched or ready for pickup | Seller/Auto |
| **Out for Delivery** | Delivery agent en route | Delivery Agent |
| **Delivered** | Successfully delivered (OTP verified) | Delivery Agent |
| **Cancelled** | Order cancelled | Customer/Seller/Admin |
| **Rejected** | Seller rejected the order | Seller |
| **Returned** | Order returned after delivery | Admin/Seller |

---

## 📱 Notification Timeline (What Each Person Receives)

### Customer Receives:
- ✅ Order placed successfully
- 📦 Order is being prepared
- 🚚 Order shipped
- 🛵 Order out for delivery
- ✔️ Order delivered
- ❌ Order cancelled
- 💸 Refund initiated

### Seller Receives:
- 🛒 New order placed
- ↩️ Customer requested return/replacement
- ❌ Order cancelled by customer

### Delivery Agent Receives:
- 📦 New order assigned for pickup
- ↩️ Return task assigned

### Admin Receives:
- (Monitoring role — can see all activity on dashboard)

---

## ⏱️ Typical Order Timeline

| Stage | Typical Duration |
|-------|----------------|
| Order placed → Received | Instant |
| Received → Processed | 30 minutes to 2 hours |
| Processed → Picked Up | 30 minutes to 1 hour |
| Picked Up → Delivered | 30 minutes to 2 hours (local delivery) |
| **Total** | **1–6 hours** (same day delivery typical) |

> Note: Timelines vary based on seller, distance, delivery agent availability, and order complexity.
