import mongoose from 'mongoose';
import { User } from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { config } from "dotenv";

config({
  path: "./config/config.env",
});

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/auction_platform';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Delete any existing Super Admin
    await User.deleteMany({ role: 'Super Admin' });
    console.log('Removed existing Super Admin accounts');

    // Create new Super Admin with fixed credentials
    const password = 'superadmin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const superAdmin = await User.create({
      userName: 'Super Admin',
      email: 'superadmin@admin.com',
      password: hashedPassword,
      phone: '12345678901',
      address: 'Admin Office',
      role: 'Super Admin',
      profileImage: {
        public_id: 'default_admin',
        url: 'https://res.cloudinary.com/dfnehlzbk/image/upload/v1/default_admin'
      }
    });

    console.log('\n===================================');
    console.log('Super Admin Created Successfully!');
    console.log('Use these credentials to login:');
    console.log('Email: superadmin@admin.com');
    console.log('Password: superadmin123');
    console.log('===================================\n');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createSuperAdmin();
