import { Request, Response, NextFunction } from 'express';
import * as quoteService from '../services/quote.service';

// * 공급사 견적 제출
export const submitQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    const { requestId, estimatedCost, estimatedTime } = req.body;
    const newQuote = await quoteService.submitQuote(userId, requestId, { estimatedCost, estimatedTime });
    res.status(201).json(newQuote);
  } catch (error) {
    next(error);
  }
};

// * 견적 상세 조회
export const getQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.user.id;

    const quote = await quoteService.getQuote(id, userId);
    res.status(200).json(quote);
  } catch (error) {
    next(error);
  }
};

// * 견적 승인 (발주사만 가능)
export const approveQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.user.id;

    const approvedQuote = await quoteService.approveQuote(id, userId);
    res.status(200).json(approvedQuote);
  } catch (error) {
    next(error);
  }
};
