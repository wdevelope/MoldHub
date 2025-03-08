import express from 'express';
import * as quoteController from '../controllers/quote.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// * 공급사 견적 제출
router.post('/submit', verifyToken, quoteController.submitQuote);

// * 견적 상세 조회
router.get('/:id', verifyToken, quoteController.getQuote);

// * 견적 승인 (발주사만 가능)
router.patch('/:id/approve', verifyToken, quoteController.approveQuote);

export default router;
