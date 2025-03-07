import { Request, Response, NextFunction } from 'express';
import * as requestService from '../services/request.service';

// * 발주 요청
export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newRequest = await requestService.createRequest(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};

// * 발주 요청 리스트 전체 조회 (페이지네이션 + 검색)
export const getRequestList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, searchBy, page = '1', limit = '10' } = req.query;

    const queryParams = {
      search: search as string,
      searchBy: searchBy as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    };

    const result = await requestService.getRequestList(queryParams);
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
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
