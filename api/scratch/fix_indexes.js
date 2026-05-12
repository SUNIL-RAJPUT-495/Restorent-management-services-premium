import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from '../src/models/App_Restaurant/Table.js';

dotenv.config();

const fixIndexes = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');

    const collection = mongoose.connection.collection('tables');
    const indexes = await collection.indexes();
    console.log('Current indexes on "tables" collection:', JSON.stringify(indexes, null, 2));

    // Check if number_1 index exists and is unique
    const badIndex = indexes.find(idx => idx.name === 'number_1' && idx.unique);
    if (badIndex) {
      console.log('Found incorrect unique index "number_1". Dropping it...');
      await collection.dropIndex('number_1');
      console.log('Dropped "number_1".');
    }

    // Ensure the correct compound index exists
    console.log('Ensuring compound unique index { number: 1, restId: 1 }...');
    await Table.syncIndexes();
    console.log('Indexes synchronized.');

    const finalIndexes = await collection.indexes();
    console.log('Final indexes:', JSON.stringify(finalIndexes, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error fixing indexes:', error);
    process.exit(1);
  }
};

fixIndexes();
