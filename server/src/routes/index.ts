import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// ^ auth 인증 미들웨어
router.use(verifyToken);

// * 라우터

// ^ 테스트트
// router.use('/quotes', quoteRoutes);

export default router;
