import { DB } from '../common/config/postgresql.config';
import { Repository } from 'typeorm';

import { Quote } from '../models/quote.model';
import { User } from '../models/user.model';
import { Request } from '../models/request.model';
import { HttpError } from '../common/errors/HttpError';

const quoteRepository: Repository<Quote> = DB.getRepository(Quote);
const requestRepository: Repository<Request> = DB.getRepository(Request);
const userRepository: Repository<User> = DB.getRepository(User);

// * 공급사 견적 제출
export const submitQuote = async (userId: number, requestId: number, quoteData: Partial<Quote>) => {
  const supplier = await userRepository.findOne({ where: { id: userId } });

  if (!supplier) {
    throw new HttpError(404, 'Supplier not found');
  }
  const request = await requestRepository.findOne({ where: { id: requestId } });

  if (!request) {
    throw new HttpError(404, 'request not found');
  }

  const newQuote = quoteRepository.create({
    ...quoteData,
    supplier,
    request,
  });

  const savedQuote = await quoteRepository.save(newQuote);

  // 발주 테이블에 견적 ID 추가
  request.quotes = [...(request.quotes || []), savedQuote];
  await requestRepository.save(request);

  return savedQuote;
};

// * 견적 상세 조회
export const getQuote = async (id: number) => {
  const quote = await quoteRepository.findOne({ where: { id } });
  if (!quote) {
    throw new HttpError(404, 'Quote not found');
  }
  return quote;
};

// * 견적 승인 (발주사만 가능)
export const approveQuote = async (id: number, userId: number) => {
  // 발주사인지 확인
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user || user.status !== 'ORDERER') {
    throw new HttpError(403, 'Buyer only');
  }

  const quote = await quoteRepository.findOne({ where: { id } });
  if (!quote) {
    throw new HttpError(404, 'Quote not found');
  }
  quote.approved = true;
  return await quoteRepository.save(quote);
};
