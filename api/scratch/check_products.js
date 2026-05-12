import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/App_Restaurant/Product.js';

dotenv.config();

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const restId = "6a016a97cd6594d976545609";
    const products = await Product.find({ restId });
    console.log(`Found ${products.length} products for restId ${restId}`);
    if (products.length > 0) {
      console.log('Sample product:', products[0]);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkProducts();
