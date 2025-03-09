import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DB } from '../common/config/postgresql.config';
import { Repository } from 'typeorm';
import { HttpError } from '../common/errors/HttpError';
import { User } from '../models/user.model';

const userRepository: Repository<User> = DB.getRepository(User);

// * 토큰 검증 미들웨어
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['dotco-access-token'];

    if (!token) {
      throw new HttpError(403, 'No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as jwt.JwtPayload;

    res.locals.user = {
      id: decoded.userId,
      name: decoded.userName,
    };

    next();
  } catch (error) {
    throw new HttpError(401, 'Invalid token.');
  }
};

// * 관리자 권한 검증 미들웨어
export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['dotco-access-token'];

    if (!token) {
      throw new HttpError(403, 'No token provided.');
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw new HttpError(404, 'User not found.');
    }

    // DOTCO 유저이거나, ACCESS LEVEL이 3이 아닌 경우 권한 없음
    if (user.status !== 'DOTCO' || user.accessLevel !== 3) {
      throw new HttpError(403, 'Permission denied.');
    }

    res.locals.user = {
      id: user.id,
      name: user.name,
    };

    next();
  } catch (error) {
    throw new HttpError(401, 'Permission denied.');
  }
};
