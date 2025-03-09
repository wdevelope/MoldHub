import express from 'express';
import * as userController from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// * 회원 가입
router.post('/signin', userController.createUser);

// * 로그인
router.post('/login', userController.login);

// * 로그아웃
router.post('/logout', verifyToken, userController.logout);

// * 내 정보 조회
router.get('/mypage', verifyToken, userController.getMyInfo);

// * 내 정보 수정
router.patch('/edit', verifyToken, userController.updateMyInfo);

// * 유저 탈퇴
router.delete('/signout', verifyToken, userController.deleteUser);

export default router;
