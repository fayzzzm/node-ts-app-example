import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { clearCache } from './redisService';
import AppError from '../utils/AppError';
import { sendUserEvent } from './kafkaService';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').trim(),
  email: z.string().email('Invalid email format').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').trim(),
  password: z.string()
});

export type LoginInput = z.infer<typeof loginSchema>;

export async function registerUser(data: RegisterInput) {
  const existingUser = await User.findOne({
    $or: [
      { email: data.email },
      { username: data.username }
    ]
  });
  if (existingUser) {
    throw new AppError(existingUser.email === data.email ? 'Email already registered' : 'Username already taken', 409);
  }
  const user = await User.create(data);
  await clearCache('users');
  // Send Kafka event for registration
  await sendUserEvent('user.registered', {
    userId: user._id,
    timestamp: new Date().toISOString(),
  });
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: '24h' }
  );
  return {
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
}

export async function loginUser(data: LoginInput) {
  const user = await User.findOne({ email: data.email }) as import('../types').UserDocument | null;
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }
  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: '24h' }
  );
  // Send Kafka event for login
  await sendUserEvent('user.logged_in', {
    userId: user._id,
    timestamp: new Date().toISOString(),
  });
  return {
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
}

export async function getUserProfile(token: string) {
  if (!token) {
    throw new AppError('No token provided', 401);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key') as { userId: string };
  const user = await User.findById(decoded.userId).select('-password') as import('../types').UserDocument | null;
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
} 