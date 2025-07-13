import { Request, Response } from 'express';
import { registerUser, loginUser, getUserProfile } from '../services/userService';
import catchAsync from '../utils/catchAsync';

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);
  
  res.status(201).json(result);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  res.json(result);
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = await getUserProfile(token || '');

  res.json(user);
}); 