import { Request, Response, NextFunction } from 'express';
import * as userServices from '../services/user.service';
import { cookieOptions } from '../common/config/cookieConfig';

// * 회원 가입
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const newUser = await userServices.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// * 로그인
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userServices.login(email, password);

    // 쿠키 생성
    res.cookie('dotco-access-token', token, cookieOptions);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// * 로그아웃
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  쿠키 만료시간을 0로 설정하여 쿠키 삭제
    res.cookie('dotco-access-token', '', { ...cookieOptions, maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// * 내 정보 조회
export const getMyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    const user = await userServices.getMyInfo(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// * 내 정보 수정
export const updateMyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    const updateData = req.body;
    const updatedUser = await userServices.updateMyInfo(userId, updateData);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// * 유저 삭제
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    await userServices.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
