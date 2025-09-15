import mongoose from 'mongoose';
import { User } from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { config } from "dotenv";
////////

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function createAdmin() {
    await mongoose.connect('mongodb://127.0.0.1:27017/auction_platform');
    
    const User = mongoose.model('User', new mongoose.Schema({
        userName: String,
        email: String,
        password: String,
        phone: String,
        address: String,
        role: String,
        profileImage: {
            public_id: String,
            url: String
        }
    }));

    // Delete existing admin
    await User.deleteMany({ role: 'Super Admin' });

    // Create new admin
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    
    await User.create({
        userName: 'Super Admin',
        email: 'admin@test.com',
        password: hashedPassword,
        phone: '12345678901',
        address: 'Admin Office',
        role: 'Super Admin',
        profileImage: {
            public_id: 'default',
            url: 'https://res.cloudinary.com/dfnehlzbk/image/upload/v1/default'
        }
    });
    
    console.log('Super Admin created successfully!');
    console.log('Email: admin@test.com');
    console.log('Password: admin123456');
    
    mongoose.disconnect();
}

createAdmin().catch(console.error);
////////
config({
  path: "./config/config.env",
});

const SUPER_ADMIN_EMAIL = 'admin@test.com';
const SUPER_ADMIN_PASSWORD = 'admin123456';

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Delete existing Super Admin if exists
    await User.deleteOne({ role: 'Super Admin' });
    console.log('Cleaned up existing Super Admin');

    // Create new super admin with fixed credentials
    const password = 'Admin@123';  // Fixed password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const superAdmin = await User.create({
      userName: 'Super Admin',
      email: 'superadmin@primebid.com',  // Fixed email
      password: hashedPassword,
      phone: '12345678901',
      address: 'PrimeBid HQ',
      role: 'Super Admin',
      profileImage: {
        public_id: 'default_admin',
        url: 'https://res.cloudinary.com/dfnehlzbk/image/upload/v1/MERN_AUCTION_PLATFORM_USERS/default_admin'
      }
    });

    console.log('Super Admin created successfully');
    console.log('Email: admin@primebid.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createSuperAdmin();
