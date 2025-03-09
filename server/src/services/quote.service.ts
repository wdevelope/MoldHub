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
    throw new HttpError(404, 'Request not found');
  }

  // request가 승인됨 상태일 경우에만 견적 제출 가능
  if (request.status !== '승인됨') {
    throw new HttpError(400, 'Request must be in approved status to submit a quote');
  }

  const newQuote = quoteRepository.create({
    ...quoteData,
    supplier,
    request,
  });

  const savedQuote = await quoteRepository.save(newQuote);

  // 발주 상태를 "견적 요청됨"으로 변경
  request.status = '견적 요청됨';
  await requestRepository.save(request);

  return savedQuote;
};

// * 견적 상세 조회
export const getQuote = async (id: number, userId: number) => {
  const quote = await quoteRepository.findOne({ where: { id }, relations: ['request'] });

  if (!quote) {
    throw new HttpError(404, 'Quote not found');
  }

  // 일단 유저 정보 조회
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  // 해당 견적의 발주사가 조회한 경우에는, 견적 상태를 "견적 접수 중"으로 변경
  const request = await requestRepository.findOne({ where: { id: quote.request.id }, relations: ['orderer'] });

  if (request && request.orderer.id === userId && request.status === '견적 요청됨') {
    request.status = '견적 접수 중';
    await requestRepository.save(request);
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

  const quote = await quoteRepository.findOne({ where: { id }, relations: ['request'] });
  if (!quote) {
    throw new HttpError(404, 'Quote not found');
  }

  // 견적 승인
  quote.approved = true;
  await quoteRepository.save(quote);

  // 발주 상태를 "발주 확정됨"으로 변경
  const request = quote.request;
  request.status = '발주 확정됨';
  await requestRepository.save(request);

  return quote;
};
