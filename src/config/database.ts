import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority',
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
    }
    throw error; // Let the caller handle the error
  }
};

export default connectDB; 