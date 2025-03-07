import { Router } from 'express';
import userRoutes from './user.routes';
import requestRoutes from './request.routes';
import quoteRoutes from './quote.routes';

const router = Router();

// * 라우터
router.use('/user', userRoutes); // 유저
router.use('/request', requestRoutes); // 발주
router.use('/quote', quoteRoutes); // 견적

export default router;
