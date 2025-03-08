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
    const id = Number(req.params.id);
    const userId = res.locals.user.id;

    const request = await requestService.getRequest(id, userId);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

// * 해당 발주 견적 전체 조회
export const getQuotesListByRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotes = await requestService.getQuotesListByRequest(Number(req.query.requestId as string));
    res.status(200).json(quotes);
  } catch (error) {
    next(error);
  }
};

// * 발주 수정 (내용, 첨부파일 등)
export const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const updatedRequest = await requestService.updateRequest(id, req.body);
    res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
};

// & 발주 요청 승인 - 관리자
export const approveRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    await requestService.approveRequest(id);
    res.status(200).json({ message: 'approve ok!' });
  } catch (error) {
    next(error);
  }
};

// & 발주 확정 후 발주 진행 처리 - 관리자
export const progressRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    await requestService.progressRequest(id);
    res.status(200).json({ message: 'progress ok!' });
  } catch (error) {
    next(error);
  }
};

// * 발주 요청 상태 완료 처리
export const completeRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestId = Number(req.params.id);
    const userId = res.locals.user.id;
    const updatedRequest = await requestService.completeRequest(requestId, userId);
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
