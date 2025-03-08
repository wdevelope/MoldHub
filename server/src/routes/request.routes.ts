import express from 'express';
import * as requestController from '../controllers/request.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// * 발주 요청
router.post('/', verifyToken, requestController.createRequest);

// * 발주 요청 리스트 전체 조회 (페이지네이션)
router.get('/all', requestController.getAllRequestList);

// * 발주 상세 조회
router.get('/:id', verifyToken, requestController.getRequest);

// * 해당 발주 견적 전체 조회
router.get('/quote-list', requestController.getQuotesListByRequest);

// * 발주 수정
router.patch('/:id', verifyToken, requestController.updateRequest);

// * 발주 삭제
router.delete('/:id', verifyToken, requestController.deleteRequest);

export default router;
