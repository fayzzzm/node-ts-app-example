import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import AppError from './utils/AppError';
import { cacheMiddleware } from './services/redisService';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes with caching
app.use('/api/users', cacheMiddleware(1), userRoutes); // Cache for 1 second

// Handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorHandler);

// Unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
}); 