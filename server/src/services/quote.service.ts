import { DB } from '../common/config/postgresql.config';
import { Quote } from '../models/quote.model';
import { Repository } from 'typeorm';

const quoteRepository: Repository<Quote> = DB.getRepository(Quote);

// * 공급사 견적 제출
export const submitQuote = async (quoteData: Partial<Quote>) => {
  const newQuote = quoteRepository.create(quoteData);
  return await quoteRepository.save(newQuote);
};

// * 특정 요청에 대한 모든 견적 조회
export const getQuotesByRequest = async (requestId: number) => {
  return await quoteRepository.find({ where: { request: { id: requestId } }, order: { createdAt: 'DESC' } });
};

// * 견적 상세 조회
export const getQuote = async (id: number) => {
  const quote = await quoteRepository.findOne({ where: { id } });
  if (!quote) {
    throw new Error('Quote not found');
  }
  return quote;
};

// * 견적 승인 (발주사만 가능)
export const approveQuote = async (id: number) => {
  const quote = await quoteRepository.findOne({ where: { id } });
  if (!quote) {
    throw new Error('Quote not found');
  }
  quote.approved = true;
  return await quoteRepository.save(quote);
};
