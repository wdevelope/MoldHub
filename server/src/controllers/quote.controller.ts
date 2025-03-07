import { Request, Response, NextFunction } from 'express';
import * as quoteService from '../services/quote.service';

// * 공급사 견적 제출
export const submitQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newQuote = await quoteService.submitQuote(req.body);
    res.status(201).json(newQuote);
  } catch (error) {
    next(error);
  }
};

// * 특정 요청에 대한 모든 견적 조회
export const getQuotesByRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotes = await quoteService.getQuotesByRequest(Number(req.params.requestId));
    res.status(200).json(quotes);
  } catch (error) {
    next(error);
  }
};

// * 견적 상세 조회
export const getQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quote = await quoteService.getQuote(Number(req.params.id));
    res.status(200).json(quote);
  } catch (error) {
    next(error);
  }
};

// * 견적 승인 (발주사만 가능)
export const approveQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approvedQuote = await quoteService.approveQuote(Number(req.params.id));
    res.status(200).json(approvedQuote);
  } catch (error) {
    next(error);
  }
};
