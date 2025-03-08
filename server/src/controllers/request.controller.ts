import { Request, Response, NextFunction } from 'express';
import * as requestService from '../services/request.service';

// * 발주 요청
export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    const newRequest = await requestService.createRequest(req.body, userId);
    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};

// * 발주 요청 리스트 전체 조회 (페이지네이션)
export const getAllRequestList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10' } = req.query;

    const queryParams = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(limit as string, 10) || 10,
    };
    console.log('queryParams', queryParams);

    const result = await requestService.getAllRequestList(queryParams);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// * 발주 상세 조회
export const getRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = await requestService.getRequest(Number(req.params.id));
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

// * 발주 수정
export const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedRequest = await requestService.updateRequest(Number(req.params.id), req.body);
    res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
};

// * 발주 삭제
export const deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await requestService.deleteRequest(Number(req.params.id));
    res.status(200).json({ message: 'delete ok!' });
  } catch (error) {
    next(error);
  }
};
