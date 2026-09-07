# Wallet & Payments Manual
## How Money Flows Through the Platform

> This guide explains **how payments work** for every role — how customers pay, how sellers receive their earnings, and how the Admin manages the financial ecosystem.

---

## 📋 Table of Contents

1. [Overview — The Money Flow](#1-overview)
2. [Customer Payments](#2-customer-payments)
3. [Seller Wallet & Earnings](#3-seller-wallet--earnings)
4. [Admin Wallet & Financial Control](#4-admin-wallet--financial-control)
5. [Delivery Agent Cash Management](#5-delivery-agent-cash-management)
6. [Withdrawal Process](#6-withdrawal-process)
7. [Refunds & Cancellations](#7-refunds--cancellations)
8. [Commission System](#8-commission-system)
9. [Credit Sales (Pay Later)](#9-credit-sales-pay-later)

---

## 1. Overview — The Money Flow

```
CUSTOMER PAYS
      ↓
      ├── Online (Razorpay) → Platform collects payment
      │                       Platform deducts commission
      │                       Seller wallet is credited (net amount)
      │
      └── Cash on Delivery → Delivery agent collects cash
                              Delivery agent submits cash to Admin
                              Admin records fund transfer
                              Seller wallet is credited (net of commission)
```

**In simple terms:**
1. Customer pays (online or cash).
2. Platform takes its **commission** cut.
3. Remaining amount goes to the **Seller's wallet**.
4. Seller can **withdraw** from their wallet to their bank account.

---

## 2. Customer Payments

### Payment Methods Available to Customers

| Method | How It Works |
|--------|-------------|
| **Razorpay (Online)** | Secure gateway — UPI, credit card, debit card, net banking, mobile wallets |
| **Cash on Delivery (COD)** | Pay in cash when the delivery agent arrives |

### Online Payment via Razorpay

**How the customer pays:**
1. At checkout, customer selects "Razorpay" as payment method.
2. Clicks "Pay Now".
3. A Razorpay payment screen opens (secure, hosted by Razorpay).
4. Customer chooses their preferred sub-method:
   - **UPI** (Google Pay, PhonePe, Paytm, BHIM)
   - **Credit Card**
   - **Debit Card**
   - **Net Banking**
   - **EMI** (for eligible cards)
   - **Wallet** (Paytm wallet, etc.)
5. Completes payment.
6. Razorpay confirms success to the platform.
7. Order is confirmed and payment status = **Paid**.

**What if payment fails?**
- Order is not confirmed.
- Customer can retry from the checkout page.
- No money is deducted on a failed payment.

**What if payment debited but order not confirmed?**
- This is rare but can happen due to network issues.
- Razorpay will auto-refund within 5–7 business days.
- Customer can also contact support with their Razorpay transaction ID.

### Cash on Delivery (COD)

- No money is collected at the time of order placement.
- Order is confirmed immediately.
- Cash is collected when the delivery agent delivers the package.
- The exact amount due is shown on the delivery agent's app.

### Payment Status Tracking

At any time, customers can see the payment status of their order:

| Payment Status | Meaning |
|---------------|---------|
| **Pending** | Payment not yet received (COD or failed online) |
| **Paid** | Successfully paid online |
| **Failed** | Online payment attempt failed |
| **Refunded** | Money returned to customer after cancellation/return |

---

## 3. Seller Wallet & Earnings

### How the Seller Wallet Works

The **Seller Wallet** is a virtual account on the platform that holds the seller's earnings from orders.

Think of it like a **digital piggy bank** — money accumulates here from orders, and you can withdraw it to your real bank account.

### Wallet Dashboard

Go to **Seller → Wallet** to see:

| Balance Type | Description |
|-------------|-------------|
| **Available Balance** | Money you can withdraw right now |
| **Total Earnings** | All-time earnings (before any withdrawals) |
| **Pending Settlement** | Earnings from recent orders not yet released |
| **Total Withdrawn** | How much you've already withdrawn |

### How Earnings Get Into Your Wallet

1. **Customer places an order** and pays.
2. **Order is delivered** successfully.
3. **Platform deducts commission** (set by Admin).
4. **Net amount is credited** to your wallet.

**Example:**
- Order Total: ₹1,000
- Platform Commission: 10% = ₹100
- **Amount credited to seller wallet: ₹900**

### Wallet Transaction History

Go to **Wallet → Transactions Tab** to see every credit and debit:

| Column | Description |
|--------|-------------|
| Date | When the transaction happened |
| Type | Credit (money coming in) or Debit (money going out) |
| Amount | Transaction amount |
| Description | Why this transaction happened (e.g., "Order ORD123 settled") |
| Reference | Order ID or withdrawal request ID |
| Status | Completed / Pending / Failed |

### Wallet Earnings Tab

Go to **Wallet → Earnings Tab** for order-level earnings breakdown:

- Which order earned how much
- Gross amount, commission deducted, net earning
- Settlement status (Settled / Pending)

---

## 4. Admin Wallet & Financial Control

The Admin has an overarching **admin wallet** that represents the platform's own financial position.

### What Admin Can See:

1. **All Seller Wallets** — the balance each seller has.
2. **All Seller Transactions** — every credit and debit for every seller.
3. **Withdrawal Requests** — pending requests from sellers wanting to withdraw.
4. **Total Platform Revenue** — all commissions earned.

### Admin Financial Actions:

| Action | Description |
|--------|-------------|
| **Approve Withdrawals** | Review and approve seller withdrawal requests |
| **Reject Withdrawals** | Reject with a reason if something is wrong |
| **Fund Transfer** | Record delivery agent cash submissions |
| **Cash Collection** | Monitor which agents collected how much cash |
| **Seller Commission** | Set/change commission rate per seller |

---

## 5. Delivery Agent Cash Management

When delivery agents collect cash from COD orders, that money needs to reach the seller/platform.

### The Cash Flow:

```
Customer pays cash to Delivery Agent
         ↓
Delivery Agent's "Cash Balance" increases
         ↓
Agent submits cash to Admin (physically)
         ↓
Admin records "Fund Transfer" in the system
         ↓
Agent's Cash Balance decreases by the submitted amount
         ↓
Seller's wallet is credited for their COD orders
```

### For Delivery Agents:

- **Dashboard shows Cash Balance** — total cash currently in hand (not yet submitted).
- **Daily Collection** — cash collected today specifically.
- Submit cash to the admin/collection point as per your schedule.

### For Admin (Recording Cash Submission):

1. Go to **Delivery Boy → Fund Transfer**.
2. Select the delivery agent.
3. Enter the amount they submitted.
4. Add a note (date, reference).
5. Save.

This clears the agent's cash balance by the recorded amount.

### Cash Collection Report

Go to **Delivery Boy → Cash Collection** to see:
- Which agent collected what amount
- Which amounts have been submitted
- Outstanding cash balance per agent

---

## 6. Withdrawal Process

### How a Seller Requests a Withdrawal

1. Go to **Seller → Wallet**.
2. Check **Available Balance** — you can only withdraw up to this amount.
3. Click **"Withdraw"** button.
4. A form appears:

**Fill in:**
- **Amount** to withdraw
- **Payment Method:**
  - Bank Transfer (enter bank details)
  - UPI (enter UPI ID)

**Bank Transfer Details:**
- Account Holder Name
- Bank Name
- Branch Name
- Account Number
- IFSC Code

5. Click **"Submit Request"**.
6. Your withdrawal request is sent to the Admin.

### Withdrawal Request Status

| Status | Meaning |
|--------|---------|
| **Pending** | Admin has not reviewed yet |
| **Approved** | Admin approved — processing payment |
| **Completed** | Money has been transferred to your account |
| **Rejected** | Admin rejected with a reason |

### How Admin Processes Withdrawals

1. Go to **Admin → Wallet**.
2. See all pending withdrawal requests.
3. Review each request:
   - Check if the amount is correct.
   - Verify bank/UPI details.
4. **Approve** → transfer the money to the seller's account via NEFT/IMPS/UPI.
5. Mark as **Completed** after transfer.

**Or Reject:**
- Click Reject.
- Enter the reason.
- Seller is notified and their balance is restored.

### Withdrawal Timeline:

- Request submitted by Seller → **Instant**
- Admin review → **Within 1–2 business days** (depends on Admin)
- Bank transfer processing → **1–3 business days**

---

## 7. Refunds & Cancellations

### When is a Refund Triggered?

1. Customer cancels an **online-paid order** before delivery.
2. Admin/Seller cancels an order that was paid online.
3. A return request is **approved** for an online-paid order.

### How Refunds Work:

**For Razorpay (Online) Payments:**
1. Admin processes the refund through the system.
2. Razorpay initiates the refund.
3. Money is returned to the **original payment method**:
   - Credit/Debit card → back to the card (3–7 business days)
   - UPI → back to the bank account (1–3 business days)
   - Wallet → back to the wallet (instant)

**For COD (Cash on Delivery) Payments:**
- If order is cancelled before delivery: No money was collected, so no refund needed.
- If order is cancelled after delivery (return): The seller/admin arranges cash refund to the customer directly.

### Refund Tracking:

Customers can see refund status in their **Order Detail** page:
- "Refund Initiated — expected within 5–7 business days."
- "Refund Completed."

---

## 8. Commission System

The **commission** is the platform's revenue — a percentage deducted from every seller's sale.

### How Commission is Set:

1. Admin goes to **Manage Sellers → Edit Seller**.
2. Sets the **Commission %** for that specific seller.
3. Each seller can have a different commission rate.

### How Commission is Deducted:

- Happens **automatically** when an order is marked as delivered.
- The system calculates: `Order Total × Commission % = Commission Amount`.
- The remaining amount is credited to the seller's wallet.

### Example:

| | Amount |
|-|--------|
| Order Total | ₹1,500 |
| Commission (10%) | ₹150 |
| **Seller Receives** | **₹1,350** |

### Viewing Commission in Reports:

- **Seller Earnings Tab (Wallet):** Shows commission deducted per order.
- **Admin Seller Transaction Report:** Complete commission audit.

---

## 9. Credit Sales (Pay Later)

In the **POS system**, sellers can sell to customers on **credit** — meaning the customer takes the goods now and pays later.

### How Credit Sales Work:

1. In POS, set payment method to **"Credit"**.
2. Assign the purchase to a specific customer (customer must be in the system).
3. The amount is added to the customer's **outstanding due**.
4. Bill is generated as usual.

### Tracking Credit Customers:

Go to **POS → Customers** → select a customer → see:
- All purchases made on credit.
- Total outstanding amount owed.
- Payment history.

### When Customer Pays Back:

1. Open the customer's record in POS.
2. Record the payment received.
3. The outstanding balance decreases accordingly.

### Due Summary Report:

Go to **Reports → Sales → Due Summary** to see:
- All customers with outstanding dues.
- Total amount owed by each.
- Helps with cash flow management and follow-up collections.

---

## 💡 Financial Best Practices

| Practice | Why It Matters |
|----------|---------------|
| Check wallet daily | Know your available balance |
| Withdraw regularly | Don't let large amounts sit in wallet |
| Record all purchases | Accurate stock and expense tracking |
| Follow up on credit dues | Cash flow management |
| Verify commissions | Ensure you're charged the agreed rate |
| Keep COD records | Match collected cash with system records |
| Check refund status | Ensure cancelled orders are fully refunded |
