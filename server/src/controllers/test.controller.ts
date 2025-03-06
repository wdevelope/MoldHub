import { Request, Response, NextFunction } from "express";
import * as testServices from "../services/test.service";

// * test
export const testController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await testServices.testServices();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
