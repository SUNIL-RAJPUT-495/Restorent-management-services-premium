import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from '../src/models/App_Restaurant/Table.js';

dotenv.config();

const checkTables = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const restId = "6a016a97cd6594d976545609";
    const tables = await Table.find({ restId });
    console.log(`Found ${tables.length} tables for restId ${restId}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkTables();
