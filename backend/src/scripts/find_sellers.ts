import dns from 'dns';
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import mongoose from "mongoose";
import dotenv from "dotenv";
import Seller from "../models/Seller";

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const sellers = await Seller.find({ mobile: '9111966732' });
  console.log(`Found ${sellers.length} sellers with mobile 9111966732:`);
  sellers.forEach(s => console.log(`ID: ${s._id}, storeName: ${s.storeName}, createdAt: ${s.createdAt}`));

  if (sellers.length > 1) {
    console.log("Removing duplicate test sellers, keeping the primary one...");
    const primary = sellers[0];
    for (let i = 1; i < sellers.length; i++) {
      await Seller.deleteOne({ _id: sellers[i]._id });
    }
  }

  process.exit(0);
}

main().catch(console.error);
