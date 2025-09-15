import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from "dotenv";

// Configure environment
config({ path: "./config/config.env" });

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/auction_platform')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User Schema (simplified version)
const userSchema = new mongoose.Schema({
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
});

// Create User model
const User = mongoose.model('User', userSchema);

// Create Super Admin
async function createSuperAdmin() {
  try {
    // Delete existing Super Admin
    await User.deleteMany({ role: 'Super Admin' });
    console.log('Removed existing Super Admin accounts');

    // Create new Super Admin
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    
    const superAdmin = await User.create({
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

    console.log('\n============================');
    console.log('Super Admin Created Successfully!');
    console.log('Email: admin@test.com');
    console.log('Password: admin123456');
    console.log('============================\n');

  } catch (error) {
    console.error('Error creating Super Admin:', error);
  } finally {
    mongoose.disconnect();
  }
}

createSuperAdmin();
