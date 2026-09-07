# Promotions & Discounts Manual
## How All Deals, Coupons & Offers Work

> This guide explains every type of promotion and discount available on the Unnati platform — how they're created by the Admin and how customers experience them.

---

## 📋 Table of Contents

1. [Overview of Promotion Types](#1-overview-of-promotion-types)
2. [Coupon Codes](#2-coupon-codes)
3. [Flash Deals](#3-flash-deals)
4. [Deal of the Day](#4-deal-of-the-day)
5. [Featured Deals](#5-featured-deals)
6. [First Order Offer](#6-first-order-offer)
7. [Free Gift Rules (Cart Milestones)](#7-free-gift-rules)
8. [Promotional Banners](#8-promotional-banners)
9. [Promo Strip (Scrolling Messages)](#9-promo-strip)
10. [Lowest Prices Ever Section](#10-lowest-prices-ever)
11. [Bestseller Cards](#11-bestseller-cards)
12. [How Discounts Stack at Checkout](#12-how-discounts-stack-at-checkout)

---

## 1. Overview of Promotion Types

The platform supports **7 distinct types of promotions**, each working differently:

| Promotion | Who Controls It | When Customer Sees It |
|-----------|----------------|----------------------|
| **Coupon Codes** | Admin | At checkout, after entering code |
| **Flash Deals** | Admin | Home page timer section + dedicated page |
| **Deal of the Day** | Admin | Home page highlighted section |
| **Featured Deals** | Admin | Home page "Featured" section |
| **First Order Offer** | Admin | At checkout (auto-applied for new customers) |
| **Free Gift Rules** | Admin | In cart (auto-applied when threshold is met) |
| **Lowest Prices Ever** | Admin | Home page section |

---

## 2. Coupon Codes

**What it is:** A special code that customers type at checkout to get a discount.

### How Admin Creates a Coupon:

1. Go to **Admin → Coupon**.
2. Click **"Add Coupon"**.
3. Fill in the details:

| Field | Description | Example |
|-------|-------------|---------|
| **Coupon Code** | The code customers will type | `SAVE20` |
| **Discount Type** | Percentage off OR flat amount off | Percentage |
| **Discount Value** | How much off | 20 (meaning 20%) |
| **Minimum Order Value** | Minimum cart total to use the coupon | ₹500 |
| **Maximum Discount** | Cap on the discount (for % coupons) | ₹200 max |
| **Total Usage Limit** | How many times the coupon can be used by all customers combined | 100 times |
| **Per-User Limit** | How many times one customer can use it | 1 time |
| **Valid From / Till** | Start and end date | 1 Sept – 30 Sept |
| **Applicable On** | All products, specific categories, or specific products | All |

4. Save the coupon. It's now active.

### How Customer Uses a Coupon:

1. Add items to cart.
2. Go to Checkout.
3. Click **"Apply Coupon"**.
4. A slide-up panel shows **all available coupons** with their terms.
5. Customer can click a coupon to auto-apply, or manually type the code.
6. If valid, the discount is shown instantly.
7. If invalid (expired, wrong code, minimum not met), an error message explains why.

### Coupon Validation Rules:
- Cannot be used if cart total is below minimum order value.
- Cannot be used after expiry date.
- Cannot be used more times than the per-user or total limit.
- Some coupons may only apply to specific product categories.

---

## 3. Flash Deals

**What it is:** Time-limited sale offers that expire after a set time. Creates urgency with a countdown timer.

### How Admin Creates Flash Deals:

1. Go to **Admin → Promotion → Flash Deals**.
2. Click **"Add Flash Deal"**.
3. Fill in:
   - **Deal Title** (e.g., "Mega Flash Sale")
   - **Start Date & Time**
   - **End Date & Time**
   - **Products to include** (select from product list)
   - **Flash Price** for each product (the special discounted price during the deal)
4. Save and activate.

### What Customers See:

- On the **home page**, a "Flash Sale" banner appears with a countdown timer.
- Countdown shows hours, minutes, seconds remaining.
- Clicking the banner takes them to the **Flash Deals Page**.
- All flash deal products are shown with:
  - Original price (crossed out)
  - Flash deal price
  - Discount % badge
  - Time remaining

### When the Flash Deal Expires:
- Countdown reaches 00:00:00.
- Products return to their regular price.
- The flash deal banner disappears from the home page.

---

## 4. Deal of the Day

**What it is:** One or more products specially featured as the "Deal of the Day" — usually with a significant discount, shown prominently on the home page.

### How Admin Sets It Up:

1. Go to **Admin → Promotion → Deal of the Day**.
2. Select the products to feature.
3. The products appear in the **"Deal of the Day"** section on the home page.

**Alternatively:** Admin or Seller can mark any product as "Deal of Day" directly from the product edit page by toggling the **"Deal of Day"** switch.

### What Customers See:
- A special section on the home page with a highlighted card/banner.
- May include a countdown (if deal is time-limited to the day).
- Clicking takes them to the product detail page.

---

## 5. Featured Deals

**What it is:** A curated set of products highlighted by Admin as "Featured" — not time-limited, just specially promoted.

### How Admin Sets It Up:

1. Go to **Admin → Promotion → Featured Deal**.
2. Add products to the featured list.
3. They appear in the **"Featured Deals"** section on the home page.

### Difference from Flash Deals:
- Flash Deals are **time-limited** (hours/days) with a countdown.
- Featured Deals are **ongoing** until admin removes them.

---

## 6. First Order Offer

**What it is:** An automatic discount given to customers placing their **very first order** on the platform.

### How Admin Configures It:

1. Go to **Admin → Promotion → First Order Offer**.
2. Set:
   - **Enable/Disable** the offer.
   - **Discount Type:** Flat ₹ amount or Percentage.
   - **Discount Value** (e.g., ₹100 off or 15% off).
   - **Minimum Order Value** to qualify.
   - **Maximum Discount** (if using percentage).

### How Customers Experience It:

- When a new customer goes to checkout **for the very first time**, the discount is automatically shown.
- No coupon code needed — it's applied automatically.
- Appears in the price breakdown as "First Order Offer — ₹XXX off".
- Only applies once per customer account.

> 💡 **This is a powerful acquisition tool** — it encourages new users to place their first order by giving them an irresistible opening offer.

---

## 7. Free Gift Rules

**What it is:** A gamified reward system where customers unlock **free gifts** by reaching spending milestones in their cart.

### How It Works (Customer Perspective):

- Add items to cart.
- As you add more, a **progress bar** appears showing how close you are to the next gift.
- Example: "Add ₹200 more to unlock a FREE gift!"
- Once you reach the threshold, a free item is **automatically added** to your cart.
- Multiple tiers can be set (reach ₹500 → Gift 1, reach ₹1,000 → Gift 2).

### How Admin Sets Up Free Gift Rules:

1. Go to **Admin → Promotion → Free Gift Rules**.
2. Click **"Add Rule"**.
3. Fill in:

| Field | Description | Example |
|-------|-------------|---------|
| **Minimum Cart Value** | Cart must be at least this amount | ₹1,000 |
| **Free Gift Product** | The product given for free | Hand Sanitizer |
| **Quantity** | How many units of the gift | 1 |
| **Active** | Toggle on/off | Active |

4. Multiple rules can exist — each with a different threshold and gift.
5. Rules are applied in order — reaching a higher threshold also applies lower tiers.

### Example Setup:

| Threshold | Gift |
|-----------|------|
| ₹500 | 1 × Branded Pen |
| ₹1,000 | 1 × Hand Sanitizer |
| ₹2,000 | 1 × Notebook |

A customer spending ₹2,500 would get all three gifts!

### The Progress Bar:
- In the cart, customers see: 🎁 *"You're ₹200 away from a free Hand Sanitizer!"*
- Once unlocked: 🎁 *"You've unlocked a FREE Hand Sanitizer! Added to your cart."*

---

## 8. Promotional Banners

**What it is:** Image banners displayed on the home page — typically linking to sales, category pages, or external URLs.

### Types of Banners:

| Banner Type | Where It Appears | Purpose |
|------------|-----------------|---------|
| **Hero/Slider Banner** | Main sliding banner at top of home page | Big seasonal promotions |
| **Sub Banners** | Secondary spots below hero | Category highlights |
| **Popup Banner** | Appears as a popup when user visits the home page | Announce deals or new arrivals |

### How Admin Manages Banners:

1. Go to **Admin → Promotion → Banner Setup**.
2. Click **"Add Banner"**.
3. Upload a banner image.
4. Set the **link** (where clicking the banner takes the user).
5. Set the **position** (hero, sub-banner, popup).
6. Toggle **Active/Inactive**.
7. Set **display order** for multiple banners.

### Banner Best Practices:
- Use high-quality, visually striking images.
- Keep text on banners minimal and readable.
- Always link to a relevant page (not the homepage itself).
- Rotate banners seasonally (festivals, sales events).

---

## 9. Promo Strip

**What it is:** A scrolling horizontal text bar at the top or bottom of the customer app — showing short promotional messages.

### Examples:
- "🚚 Free delivery on orders above ₹299!"
- "🎁 New arrivals every Monday!"
- "💳 Extra 10% off on online payments!"

### How Admin Manages:

1. Go to **Admin → Promo Strip**.
2. Add multiple messages.
3. Each message can have:
   - Text content
   - An icon/emoji
   - Background color
   - A link (clicking the strip navigates somewhere)
4. Set the active/inactive status.
5. Multiple messages scroll in a loop automatically.

---

## 10. Lowest Prices Ever

**What it is:** A dedicated section on the home page showcasing products at their lowest historical price — great for deal hunters.

### How Admin Sets It Up:

1. Go to **Admin → Lowest Prices**.
2. Add products to this list.
3. These products appear in the **"Lowest Prices Ever"** section on the home page.
4. Customers can also visit the dedicated **Lowest Prices Ever** page from the menu.

---

## 11. Bestseller Cards

**What it is:** A visually distinct card layout on the home page showing the **top-selling** products.

### How Admin Manages:

1. Go to **Admin → Bestseller Cards**.
2. Add or rearrange products for the bestseller section.
3. These cards appear prominently on the home page.

---

## 12. How Discounts Stack at Checkout

When multiple promotions apply, here's how they work together:

### Checkout Price Calculation Order:

```
Cart Subtotal (Sum of all items at regular price)
    − Item-level Coupon Discount (if coupon applies to specific products)
    − Free Gift Offset (free gifts at ₹0 effectively reduce total)
    − First Order Offer Discount (auto-applied for new customers)
    − Bill-level Coupon Discount (if coupon applies to entire cart)
    + Delivery Charge (if applicable)
    + Platform Fee (if applicable)
    + Gift Packaging Fee (if selected)
    + Tip (if added)
    + Tax (for applicable items)
    = FINAL TOTAL
```

### Can Multiple Coupons Be Used?

**No** — only **one coupon code** can be applied per order. Customers should choose the coupon that gives the maximum benefit.

### Does First Order Offer + Coupon work together?

**Yes** — the First Order Offer is automatic and separate from coupons. A new customer can use BOTH a coupon code AND the first order offer on their first purchase.

### Does Free Gift + Coupon work together?

**Yes** — free gifts are cart-milestone rewards and are separate from coupon discounts. Both can apply to the same order.

---

## 🗓️ Promotion Calendar — Best Practices

| Event | Recommended Promotions |
|-------|----------------------|
| Diwali / Festivals | Flash Deals + Hero Banners + Special Coupons |
| New Product Launch | Featured Deals + Promo Strip announcement |
| Customer Acquisition | First Order Offer (always keep this active) |
| Slow Sales Period | Free Gift Rules to increase average order value |
| Weekend Sales | Flash Deals with short time window |
| Inventory Clearance | Lowest Prices Ever section + Coupons |
