import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import AppError from './utils/AppError';
import { cacheMiddleware } from './services/redisService';
import redis from './services/redisService';
import mongoose from 'mongoose';
import { startUserEventConsumer } from './services/kafkaService';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();

// Connect to database
connectDB();

// Start Kafka consumer for analytics events
startUserEventConsumer().catch((err) => {
  console.error('Failed to start Kafka consumer:', err);
});

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

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

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  await redis.quit();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown); 