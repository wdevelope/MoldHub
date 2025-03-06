import express from "express";
import * as testController from "../controllers/test.controller";

const router = express.Router();

// * test
router.post("/test", testController.testController);

export default router;
