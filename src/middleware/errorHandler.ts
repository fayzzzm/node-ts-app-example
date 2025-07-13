import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    status: err.status || 'error',
    error: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler; 