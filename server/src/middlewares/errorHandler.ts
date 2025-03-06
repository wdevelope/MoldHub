import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../common/errors/HttpError';

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || 500; // 상태 코드가 없으면 500 (서버 오류)
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
