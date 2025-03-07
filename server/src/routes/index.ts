import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import userRoutes from './user.routes';

const router = Router();

// ^ auth 인증 미들웨어
router.use(verifyToken);

// * 라우터

// ^ 유저저
router.use('/user', userRoutes);

export default router;
