import express from 'express';
import * as requestController from '../controllers/request.controller';
import { verifyToken, verifyAdmin } from '../middlewares/auth';

const router = express.Router();

// * 발주 요청
router.post('/', verifyToken, requestController.createRequest);

// * 발주 요청 리스트 전체 조회 (페이지네이션)
router.get('/all', requestController.getAllRequestList);

// * 발주 상세 조회
router.get('/:id', verifyToken, requestController.getRequest);

// TODO 해당 발주 견적 전체 조회
router.get('/quote-list', requestController.getQuotesListByRequest);

// * 발주 수정 (내용, 첨부파일 등)
router.patch('/:id', verifyToken, requestController.updateRequest);

// & 발주 요청 승인 - 관리자
router.patch('/:id/approve', verifyToken, verifyAdmin, requestController.approveRequest);

// & 발주 확정 후 발주 진행 처리 - 관리자
router.patch('/:id/progress', verifyToken, verifyAdmin, requestController.progressRequest);

// TODO 발주 요청 상태 완료 처리 (발주사와 공급사 모두 가능)
router.put('/complete/:id', verifyToken, requestController.completeRequest);

// * 발주 삭제
router.delete('/:id', verifyToken, requestController.deleteRequest);

export default router;
