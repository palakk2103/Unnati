import dns from 'dns';
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Seller from '../models/Seller';
import Order from '../models/Order';
import Product from '../models/Product';
import Admin from '../models/Admin';
import Return from '../models/Return';
import CashCollection from '../models/CashCollection';
import InventoryLoss from '../models/InventoryLoss';
import GSTReportEntry from '../models/GSTReportEntry';
import WithdrawRequest from '../models/WithdrawRequest';
import WalletTransaction from '../models/WalletTransaction';
import Policy from '../models/Policy';
import FAQ from '../models/FAQ';
import Coupon from '../models/Coupon';
import FreeGiftRule from '../models/FreeGiftRule';
import Banner from '../models/Banner';
import HomeSection from '../models/HomeSection';
import PromoStrip from '../models/PromoStrip';
import BestsellerCard from '../models/BestsellerCard';
import LowestPricesProduct from '../models/LowestPricesProduct';
import VideoFind from '../models/VideoFind';
import Attribute from '../models/Attribute';
import VariationType from '../models/VariationType';
import Brand from '../models/Brand';
import StorageLocation from '../models/StorageLocation';
import Customer from '../models/Customer';
import Delivery from '../models/Delivery';
import Staff from '../models/Staff';
import Role from '../models/Role';
import AdminPurchaseEntry from '../models/AdminPurchaseEntry';
import SellerPurchaseEntry from '../models/SellerPurchaseEntry';
import SupplierLedger from '../models/SupplierLedger';
import CreditTransaction from '../models/CreditTransaction';
import Cart from '../models/Cart';

async function inspect() {
  console.log('Connecting to Mongo...');
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('MongoDB Connected successfully.\n');

  console.log('================ ADMIN & SELLER PROFILES ================');
  const admins = await Admin.find({});
  console.log(`Admins (${admins.length}):`, admins.map(a => `${a.email || a.mobile} (${a.role})`));

  const sellers = await Seller.find({});
  console.log(`Sellers (${sellers.length}):`);
  sellers.forEach(s => {
    console.log(` - ID: ${s._id} | Name: ${s.sellerName} | Store: ${s.storeName} | Mobile: ${s.mobile} | Status: ${s.status}`);
  });

  const testSeller = await Seller.findOne({ mobile: '9111966732' }) || sellers[0];
  console.log(`\nActive Test Seller: ${testSeller?.sellerName} (${testSeller?.mobile}) ID: ${testSeller?._id}`);

  console.log('\n================ ORDERS BREAKDOWN ================');
  const totalOrders = await Order.countDocuments({});
  console.log('Total Orders in DB:', totalOrders);

  const statuses = ['Pending', 'Received', 'Processed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'];
  console.log('Admin Order Status Breakdown:');
  for (const st of statuses) {
    const c = await Order.countDocuments({ status: st });
    console.log(`  - ${st.padEnd(20)}: ${c}`);
  }

  if (testSeller) {
    console.log(`\nSeller (${testSeller.storeName}) Order Status Breakdown:`);
    for (const st of statuses) {
      const c = await Order.countDocuments({ seller: testSeller._id, status: st });
      console.log(`  - ${st.padEnd(20)}: ${c}`);
    }
  }

  console.log('\n================ DATA STATUS BY DOMAIN ================');
  const collectionsToCheck: { name: string; model: mongoose.Model<any> }[] = [
    { name: 'Returns / Replacements', model: Return },
    { name: 'Cash Collections', model: CashCollection },
    { name: 'Inventory Losses', model: InventoryLoss },
    { name: 'GST Report Entries', model: GSTReportEntry },
    { name: 'Withdraw Requests', model: WithdrawRequest },
    { name: 'Wallet Transactions', model: WalletTransaction },
    { name: 'Policies', model: Policy },
    { name: 'FAQs', model: FAQ },
    { name: 'Coupons', model: Coupon },
    { name: 'Free Gift Rules', model: FreeGiftRule },
    { name: 'Banners', model: Banner },
    { name: 'Home Sections', model: HomeSection },
    { name: 'Promo Strips', model: PromoStrip },
    { name: 'Bestseller Cards', model: BestsellerCard },
    { name: 'Lowest Prices Products', model: LowestPricesProduct },
    { name: 'Video Finds', model: VideoFind },
    { name: 'Attributes', model: Attribute },
    { name: 'Variation Types', model: VariationType },
    { name: 'Brands', model: Brand },
    { name: 'Storage Locations', model: StorageLocation },
    { name: 'Customers', model: Customer },
    { name: 'Delivery Staff', model: Delivery },
    { name: 'Store Staff', model: Staff },
    { name: 'Admin Roles', model: Role },
    { name: 'Admin Purchase Entries', model: AdminPurchaseEntry },
    { name: 'Seller Purchase Entries', model: SellerPurchaseEntry },
    { name: 'Supplier Ledgers', model: SupplierLedger },
    { name: 'Credit Transactions', model: CreditTransaction },
  ];

  for (const item of collectionsToCheck) {
    const count = await item.model.countDocuments({});
    console.log(`${item.name.padEnd(25)}: ${count}`);
  }

  const abandonedCarts = await Cart.countDocuments({ 'items.0': { $exists: true } });
  console.log(`Abandoned Carts          : ${abandonedCarts}`);

  process.exit(0);
}

inspect().catch(err => {
  console.error('Inspection failed:', err);
  process.exit(1);
});
