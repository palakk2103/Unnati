# Quick Reference Card
## At-a-Glance Guide for All Roles

> A fast reference for daily tasks — bookmark this page!

---

## 🛒 CUSTOMER — Quick Actions

| I want to... | Where to go |
|--------------|-------------|
| Sign up / Create account | `/signup` |
| Log in | `/login` |
| Browse products | Home page → Categories |
| Search for a product | Search bar (top of any page) |
| See product details | Click any product card |
| Add to cart | Product page → "Add to Cart" |
| Apply coupon | Checkout → "Apply Coupon" |
| Place an order | Cart → Checkout → Place Order |
| Track my order | My Account → Orders → Click order |
| See delivery on map | Order Detail → Map section |
| Cancel my order | Order Detail → Cancel Order |
| Return an item | Order Detail → Return Item |
| Save a product | Click ❤️ heart icon on any product |
| View wishlist | Account → Wishlist |
| Manage addresses | Account → Addresses |
| View all my orders | Account → My Orders |

---

## 🏪 SELLER — Quick Actions

| I want to... | Where to go |
|--------------|-------------|
| Log in | `/seller/login` |
| See today's overview | Seller Dashboard |
| Add a new product | Products → Add Product |
| Edit a product | Products → Product List → Edit |
| Update stock | Products → Stock Management |
| Update stock for many products | Products → Bulk Edit |
| See new orders | Orders → Pending |
| Process an order | Orders → Click order → Mark Processed |
| Create a store bill | POS → Orders |
| Print a bill | POS → After placing order → Print |
| See my earnings | Wallet |
| Withdraw money | Wallet → Withdraw |
| View sales report | Reports → Sales |
| View GST report | Reports → GST Sales |
| Check low stock | Inventory Reports → Low Stock |
| Add a supplier | POS → Suppliers → Add |
| Record stock purchase | POS → Purchase mode |
| Manage staff | Manage Staff |
| Change store settings | Account Settings |

---

## 🚚 DELIVERY — Quick Actions

| I want to... | Where to go |
|--------------|-------------|
| Log in | `/delivery/login` |
| See today's pending orders | Dashboard |
| Go online / offline | Profile → Toggle |
| See all assigned orders | Orders tab |
| View order details | Orders → Click order |
| Navigate to address | Order Detail → Navigate button |
| Mark order as delivered | Order Detail → Enter OTP → Confirm |
| See return orders | Orders → Return Orders tab |
| View my earnings | Menu → Earnings |
| See sellers nearby | Menu → Sellers in Range |
| Update my profile | Menu → Profile |

---

## 👨‍💼 ADMIN — Quick Actions

| I want to... | Where to go |
|--------------|-------------|
| Log in | `/admin/login` |
| See platform overview | Admin Dashboard |
| Approve a new seller | Manage Sellers → Seller List → Approve |
| Approve a delivery agent | Delivery → Manage → Approve |
| See all orders | Orders → All Orders |
| Approve a return request | Return Requests → Approve |
| Send notification to all users | Notifications → Send |
| Add a promo banner | Promotion → Banner Setup → Add |
| Create a flash deal | Promotion → Flash Deals → Add |
| Create a coupon code | Coupon → Add Coupon |
| Change theme color | Settings → Theme |
| Change delivery charge | App Settings → Delivery Charge |
| Add a new category | Category → Add |
| View GST report | Reports → GST Sales |
| See abandoned carts | Customers → Abandoned Carts |
| Approve seller withdrawal | Wallet → Withdrawal Requests |
| Record delivery agent cash submission | Delivery → Fund Transfer |
| Configure SMS gateway | SMS Gateway |
| Set commission for a seller | Manage Sellers → Edit Seller → Commission |

---

## 📊 ORDER STATUSES — Quick Reference

```
Received → Pending → Processed → Shipped → Out for Delivery → Delivered
                                                                    ↓
                                                            Payment Settled
                                                                    ↓
                                                          Seller Wallet Credited
```

| Status | Plain English |
|--------|--------------|
| Received | Order placed, seller knows |
| Pending | Seller is reviewing |
| Processed | Order packed and ready |
| Shipped | On its way |
| Out for Delivery | Delivery agent has it, coming to you |
| Delivered | You got it! |
| Cancelled | Cancelled before delivery |
| Returned | Sent back after delivery |

---

## 💰 PAYMENT TYPES — Quick Reference

| Payment | When Used | Who Gets Money |
|---------|-----------|----------------|
| Razorpay (Online) | Customer pays at checkout | Platform → Seller (after commission) |
| COD (Cash) | Customer pays at delivery | Delivery Agent → Admin → Seller (after commission) |
| POS Cash | Walk-in customer pays cash | Seller directly |
| POS UPI | Walk-in customer pays via UPI | Seller directly |
| POS Credit | Walk-in customer pays later | Tracked as due, seller collects later |

---

## 🔑 ALL LOGIN URLS

| Role | Login URL | Signup URL |
|------|-----------|-----------|
| Customer | `/login` | `/signup` |
| Seller | `/seller/login` | `/seller/signup` |
| Delivery Agent | `/delivery/login` | `/delivery/signup` |
| Admin | `/admin/login` | (Admin adds manually) |
| Staff (Admin) | `/admin/staff-login` | (Admin/Seller adds manually) |
| Staff (Seller) | `/seller/staff-login` | (Seller adds manually) |

---

## 📁 USER MANUAL FILE INDEX

| File | What It Covers |
|------|---------------|
| `00-PROJECT-OVERVIEW.md` | What is Unnati, who uses it |
| `01-CUSTOMER-MANUAL.md` | Shopping, orders, wishlist, returns |
| `02-SELLER-MANUAL.md` | Products, orders, POS, wallet, reports |
| `03-DELIVERY-MANUAL.md` | Delivery workflow, earnings, profile |
| `04-ADMIN-MANUAL.md` | Complete platform management |
| `05-POS-BILLING-SYSTEM.md` | In-store billing, purchase entries |
| `06-ORDER-FLOW.md` | Full order lifecycle from placement to delivery |
| `07-PROMOTIONS-DISCOUNTS.md` | All deal types, coupons, free gifts |
| `08-REPORTS-ANALYTICS.md` | Every report explained |
| `09-STOCK-INVENTORY.md` | Stock management, barcodes, bulk import |
| `10-WALLET-PAYMENTS.md` | Money flow, wallet, withdrawals |
| `11-PLATFORM-SETTINGS.md` | Admin configurations, theme, policies |
| `12-QUICK-REFERENCE.md` | This file — at-a-glance shortcuts |

---

## ❓ COMMON TROUBLESHOOTING

| Problem | Likely Cause | Solution |
|---------|-------------|---------|
| Customer can't add to cart | Not logged in | Ask them to log in |
| Product not visible to customers | Product is Inactive or stock = 0 | Enable product / restock |
| Seller can't see orders | Account disabled | Admin: enable seller account |
| OTP not received | SMS gateway issue | Check SMS gateway settings |
| Payment failed but money deducted | Payment processing lag | Razorpay will auto-refund in 5–7 days |
| Delivery agent not receiving orders | Agent is Offline | Agent: go Online in profile |
| Coupon not applying | Expired / minimum not met / used up | Check coupon validity in Admin |
| Seller wallet not receiving money | Commission rate 100% / order not delivered | Check commission settings & order status |
| Barcode scanner not working | Wrong browser/permissions | Use Chrome, allow camera access |
| Theme color not changing | Cache not cleared | Clear browser cache (Ctrl+Shift+R) |
