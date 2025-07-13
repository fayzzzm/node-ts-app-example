import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../utils/AppError';

export const validateRequest = (schema: AnyZodObject, property: 'body' | 'query' | 'params' = 'body') => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[property]);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new AppError(error.errors[0].message, 400));
      }
      return next(new AppError('Validation failed', 400));
    }
  }; 