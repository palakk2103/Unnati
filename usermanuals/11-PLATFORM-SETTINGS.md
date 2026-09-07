# Platform Settings & Configuration Manual
## How to Configure and Customize the Unnati Platform

> This guide is for **Admins** who need to configure the platform settings — from colors and logos to delivery charges and payment gateways.

---

## 📋 Table of Contents

1. [Store Settings](#1-store-settings)
2. [App Settings (Platform-wide Configurations)](#2-app-settings)
3. [Theme Settings (Colors & Appearance)](#3-theme-settings)
4. [Delivery Settings](#4-delivery-settings)
5. [Payment Gateway Settings](#5-payment-gateway-settings)
6. [SMS Gateway Settings](#6-sms-gateway-settings)
7. [Product Display Settings](#7-product-display-settings)
8. [Policies — Terms & Conditions](#8-policies)
9. [Home Page Configuration](#9-home-page-configuration)
10. [Notification Settings](#10-notification-settings)

---

## 1. Store Settings

**Where:** Admin → Settings → Store Settings

These are the basic identity settings for your platform.

### What You Can Set:

| Setting | Description | Example |
|---------|-------------|---------|
| **Store Name** | The name displayed throughout the platform | "Unnati Bazaar" |
| **Store Logo** | Your brand/store logo image | Upload a PNG/JPG |
| **Contact Email** | Customer support email | support@unnati.com |
| **Contact Phone** | Customer support phone | +91 98765 43210 |
| **Physical Address** | Main business address | 123 Main Street, Mumbai |
| **City** | City where business operates | Mumbai |
| **State** | State | Maharashtra |
| **Pincode** | Postal code | 400001 |
| **Currency** | Currency used | ₹ (Indian Rupee) |
| **Timezone** | Timezone for correct timestamps | Asia/Kolkata (IST) |

### How to Update:
1. Go to Store Settings.
2. Modify the fields.
3. Click **"Save"**.
4. Changes take effect immediately across the platform.

---

## 2. App Settings

**Where:** Admin → App Settings

This is the most important configuration page — it controls how the shopping experience works for customers.

### Delivery & Shipping:

| Setting | What It Does | Example |
|---------|-------------|---------|
| **Delivery Charge** | Fixed charge added to every order | ₹40 |
| **Free Delivery Above** | Orders above this amount get free delivery | ₹299 — orders ≥ ₹299 get free delivery |
| **Minimum Order Value** | Customers cannot checkout below this amount | ₹100 |
| **Delivery Time** | Estimated delivery time shown to customers | "Same Day Delivery" |

### Payment Options:

| Setting | What It Does |
|---------|-------------|
| **Enable COD** | Toggle Cash on Delivery on/off |
| **Enable Online Payment** | Toggle Razorpay on/off |
| **Platform Fee** | Small additional fee charged on orders (e.g., ₹5 convenience fee) |

### Extra Features:

| Setting | What It Does |
|---------|-------------|
| **Gift Packaging** | Enable/disable gift wrapping option at checkout |
| **Gift Packaging Fee** | Extra charge for gift packaging (e.g., ₹30) |
| **Tip Feature** | Enable/disable tip option for delivery agents |
| **Tip Presets** | Set preset tip amounts shown (e.g., ₹10, ₹20, ₹50) |

### First Order Offer:

| Setting | What It Does |
|---------|-------------|
| **Enable First Order Offer** | Turn on/off automatic first-order discount |
| **Discount Type** | Flat amount (₹) or Percentage (%) |
| **Discount Value** | How much discount (e.g., ₹100 or 20%) |
| **Minimum Order Value** | Order must be at least this much |
| **Max Discount** | Cap for percentage discounts |

### GST / Tax:

| Setting | What It Does |
|---------|-------------|
| **Default GST Rate** | Default GST if product has no GST set |
| **Tax Inclusive** | Whether prices shown include tax or exclude it |

---

## 3. Theme Settings

**Where:** Admin → Settings → Theme Settings

Customize how the customer-facing website looks — without any coding required.

### Color Settings:

| Setting | What It Affects | Example |
|---------|----------------|---------|
| **Primary Color** | Buttons, highlights, nav bar, icons | `#16a34a` (Green) |
| **Secondary Color** | Accents, secondary buttons | `#0284c7` (Blue) |
| **Background Color** | Main page background | `#ffffff` (White) |
| **Text Color** | Primary text color | `#171717` (Dark) |

### Typography:

| Setting | What It Affects |
|---------|----------------|
| **Font Family** | The typeface used throughout the site (Google Fonts options) |
| **Font Size (Base)** | The base text size that scales everything else |

### How to Change Theme:

1. Go to Theme Settings.
2. Use the **color picker** to select your primary color.
3. Preview how it looks on the sample page (if available).
4. Click **"Save"**.
5. The entire customer website immediately updates with the new colors.

> 💡 **Tip:** Choose colors that match your business brand identity. The primary color appears on all buttons, links, and highlights — make sure it's readable and professional.

---

## 4. Delivery Settings

**Where:** Admin → Delivery Settings

Configure how the delivery system works.

### Delivery Zones:

You can set delivery charges based on **distance or zones**:

**Fixed Charge:**
- One flat charge for all deliveries regardless of distance.
- Simple to manage.

**Zone-based Charges (if configured):**
- Different charges for different areas.
- E.g., Within 5km = ₹30, 5–15km = ₹50.

### Delivery Time Slots (if enabled):

- Allow customers to choose preferred delivery time.
- E.g., Morning (9am–12pm), Afternoon (12pm–3pm), Evening (3pm–7pm).

### Express Delivery (if configured):

- Premium, faster delivery option.
- Higher delivery charge.
- Customers can opt in at checkout.

---

## 5. Payment Gateway Settings

**Where:** Backend configuration (`.env` file — Admin/Technical)

The platform uses **Razorpay** for online payments.

### Razorpay Configuration:

| Setting | Description |
|---------|-------------|
| **Razorpay Key ID** | Your Razorpay API public key |
| **Razorpay Key Secret** | Your Razorpay API secret key (kept secure) |
| **Currency** | INR (Indian Rupee) |
| **Payment Capture** | Automatic (instant capture) or Manual |

> ⚠️ **Security:** The Razorpay Key Secret should NEVER be shared or exposed publicly. It's stored securely on the backend server.

### Razorpay Dashboard:

For detailed payment analytics, refund management, and webhook configuration, use the **Razorpay Dashboard** at [dashboard.razorpay.com](https://dashboard.razorpay.com).

---

## 6. SMS Gateway Settings

**Where:** Admin → SMS Gateway

Configure SMS for OTP delivery and notifications.

### What SMS is Used For:

- **OTP verification** — when customers sign up or log in.
- **Order notifications** — SMS alerts for order updates.
- **Promotional SMS** — marketing messages.

### How to Configure:

1. Go to **Admin → SMS Gateway**.
2. Enter your SMS provider's:
   - **API Key**
   - **Sender ID** (the name/number that appears on the SMS)
   - **API Endpoint** (the URL to call for sending SMS)
3. Save settings.
4. Test with a test phone number.

> 💡 **Popular SMS Providers in India:** MSG91, Textlocal, 2Factor, Nexmo (Vonage).

---

## 7. Product Display Settings

**Where:** Admin → Product Display Settings / Seller → Product Display Settings

Control how products appear to customers.

### Settings Available:

| Setting | What It Does |
|---------|-------------|
| **Default Sort Order** | How products are sorted by default (Newest, Price: Low to High, Popularity) |
| **Products Per Page** | How many products show per page (e.g., 20, 40) |
| **Show Out of Stock** | Whether out-of-stock products are shown to customers |
| **Show MRP** | Show the original MRP (crossed out) alongside selling price |
| **Show Discount Badge** | Display the "X% OFF" badge on products |
| **Show Stock Count** | Show "Only 3 left!" type messages |
| **Image Ratio** | Square, portrait, or landscape product images |

---

## 8. Policies

### Customer App Policy

**Where:** Admin → Customer App Policy

Write your platform's:
- **Terms & Conditions**
- **Privacy Policy**
- **Return Policy**
- **Shipping Policy**

These appear in the **customer app's FAQ / About** sections.

**How to Edit:**
1. Go to Customer App Policy.
2. A rich-text editor appears (like a Word processor).
3. Write or paste your policy content.
4. Format with headings, bullet points, bold text.
5. Click **Save**.
6. The updated policy immediately appears in the customer app.

### Delivery App Policy

**Where:** Admin → Delivery App Policy

Similar to customer policy but for delivery agents:
- Terms for delivery agents.
- Payout policy.
- Code of conduct.
- Privacy policy for agents.

---

## 9. Home Page Configuration

**Where:** Admin → Home Section

Control what appears on the customer home page and in what order.

### Home Section Types You Can Manage:

| Section | What It Is | Toggle |
|---------|-----------|--------|
| **Banner Slider** | Main hero banner (rotating images) | On/Off |
| **Flash Sale** | Flash deal timer section | On/Off |
| **Deal of the Day** | Featured deal for the day | On/Off |
| **New Arrivals** | Recently added products | On/Off |
| **Category Tiles** | Quick category shortcuts | On/Off |
| **Featured Deals** | Curated promoted products | On/Off |
| **Lowest Prices Ever** | Best price products | On/Off |
| **Bestseller Cards** | Top-selling products | On/Off |
| **Promo Strip** | Scrolling text announcements | On/Off |
| **Video Finds** | Product videos | On/Off |

### Customizing Section Names:

- Each section's **heading/title** can be customized.
- E.g., Change "New Arrivals" to "Fresh Finds" or "Just In!".

### Reordering Sections (if supported):

- Drag and drop sections to change their order on the home page.

---

## 10. Notification Settings

### Firebase Push Notifications

The platform uses **Firebase Cloud Messaging (FCM)** for push notifications.

**What Notifications Are Sent:**

| Event | Who Gets Notified |
|-------|------------------|
| New order placed | Seller |
| Order status updated | Customer |
| New order assigned | Delivery agent |
| Return request filed | Seller, Admin |
| Withdrawal approved | Seller |
| Low stock alert | Seller (if configured) |
| Admin announcement | All users |

### Sending Bulk Notifications (Admin):

1. Go to **Admin → Notifications**.
2. Fill in:
   - **Title** — short notification headline
   - **Body** — the notification message
   - **Target Audience:** All / Customers only / Sellers only / Delivery Agents only
   - **Image** (optional) — notification image
3. Click **"Send Notification"**.
4. All targeted users receive the push notification instantly on their devices/browsers.

---

## ⚙️ Configuration Checklist (For Initial Setup)

Before going live with the platform, ensure these are configured:

**Essential:**
- [ ] Store Name and Logo set
- [ ] Razorpay Key ID and Secret configured
- [ ] Delivery charge and free delivery threshold set
- [ ] SMS Gateway configured (for OTPs)
- [ ] Firebase configured (for push notifications)
- [ ] At least one category created
- [ ] At least one seller approved
- [ ] Customer App Policy written

**Recommended:**
- [ ] Theme colors match your brand
- [ ] Home page banners uploaded
- [ ] FAQ populated with common questions
- [ ] First Order Offer configured (great for acquisition)
- [ ] At least one coupon created for launch promotion
