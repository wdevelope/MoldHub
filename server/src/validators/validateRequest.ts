import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../common/errors/HttpError";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(400, `${errors.array()[0].msg}`);
  }
  next(); // next
};
