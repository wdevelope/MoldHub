import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import testRoutes from "./test.routes";

const router = Router();

// ^ auth 인증 미들웨어
router.use(verifyToken);

// * 라우터

// ^ 테스트트
router.use("/notice", testRoutes);

export default router;
