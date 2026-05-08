import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import SuperAdmin from './src/models/Super_Admin/Super.admin.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await SuperAdmin.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await SuperAdmin.create({
      name: 'Super Admin',
      email: 'adminSuper@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('Admin seeded: adminSuper@gmail.com / admin123');


  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 
