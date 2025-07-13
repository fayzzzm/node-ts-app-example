import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userService';
import catchAsync from '../utils/catchAsync';
import { AuthRequest } from '../types';

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);
  res.status(201).json(result);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);
  res.json(result);
});

export const getProfile = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  // Exclude password from response
  const { password, ...userProfile } = req.user.toObject();
  res.json(userProfile);
}); 