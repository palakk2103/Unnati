import dns from 'dns';
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

async function main() {
  console.log('Connecting to Mongo...');
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('Connected.');
  const db = mongoose.connection.db;
  if (!db) {
    console.error('Database connection not established');
    process.exit(1);
  }
  const cols = await db.listCollections().toArray();
  console.log('--- COLLECTION RECORD COUNTS ---');
  for (const c of cols.sort((a, b) => a.name.localeCompare(b.name))) {
    const count = await db.collection(c.name).countDocuments();
    console.log(`${c.name.padEnd(30)}: ${count}`);
  }
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
