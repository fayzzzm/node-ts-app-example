import { Request } from 'express';
import { Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  _id: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AuthRequest extends Request {
  user?: UserDocument;
}

export interface ValidationError {
  msg: string;
  param: string;
  location: string;
} 