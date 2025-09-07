import { sendError } from '@/utils/apiResponse';
import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  sendError(res, err.message, 'An error occurred', err.status || 500);
};