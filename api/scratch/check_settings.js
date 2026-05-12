import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Setting from '../src/models/App_Restaurant/Setting.js';

dotenv.config();

const checkSettings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const restId = "6a016a97cd6594d976545609";
    const settings = await Setting.findOne({ restId });
    console.log(`Settings for restId ${restId}:`, settings);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkSettings();
