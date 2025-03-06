import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// * 토큰 검증 미들웨어
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["cookie-name"];
    if (!token) {
      return res.status(403).send({ message: "No token provided." });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as jwt.JwtPayload;

    res.locals.user = {
      id: decoded.id,
      name: decoded.userName,
    };

    next();
  } catch (error) {
    return res.status(401).send({ message: "Permission denied" });
  }
};
