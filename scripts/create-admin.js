import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from "dotenv";

// Load environment variables
config({ path: "./config/config.env" });

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/auction_platform');
        console.log('Connected to MongoDB');

        // Get the User model
        const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
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

        // Delete any existing Super Admin
        await User.deleteMany({ role: 'Super Admin' });
        console.log('Removed existing Super Admin accounts');

        // Create new Super Admin
        const password = 'Admin@123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            userName: 'Super Admin',
            email: 'admin@admin.com',
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
        console.log('Use these credentials to login:');
        console.log('Email:', 'admin@admin.com');
        console.log('Password:', 'Admin@123');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

createAdmin();
