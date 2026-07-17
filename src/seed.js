import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from './models/Product.js';
import { SEED_PRODUCTS } from './data/seedProducts.js';

// Wipes the products collection and re-inserts the bootstrap catalogue.
// Run with: npm run seed
const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Reseeding products…');

  await Product.deleteMany({});
  const created = await Product.insertMany(SEED_PRODUCTS);

  console.log(`Seeded ${created.length} products.`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
