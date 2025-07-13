import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';
import { AuthRequest } from '../types';
import { User } from '../models/User';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Not authorized to access this route', 401));
  }
}; 