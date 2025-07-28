import { Request, Response, NextFunction } from 'express';
import { UserDataLog } from '../services/userDataLog';

export const getAllUserDataLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logs = await UserDataLog.find();
    res.json(logs);
  } catch (error) {
    next(error);
  }
}; 