import { DB } from '../common/config/postgresql.config';
import { Request } from '../models/request.model';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { HttpError } from '../common/errors/HttpError';

const requestRepository: Repository<Request> = DB.getRepository(Request);
const userRepository: Repository<User> = DB.getRepository(User);

// * 발주 요청 생성
export const createRequest = async (requestData: Partial<Request>, userId: number) => {
  const orderer = await userRepository.findOne({ where: { id: userId } });
  if (!orderer) {
    throw new HttpError(404, 'User not found');
  }

  const newRequest = requestRepository.create({
    ...requestData,
    orderer,
    status: '등록됨',
  });

  return await requestRepository.save(newRequest);
};

// * 발주 요청 리스트 전체 조회 (페이지네이션)
export const getAllRequestList = async ({ page, limit }: { page: number; limit: number }) => {
  const [requests, totalRequests] = await requestRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { createdAt: 'DESC' },
  });

  return {
    requests,
    totalRequests,
    totalPages: Math.ceil(totalRequests / limit),
    currentPage: page,
  };
};

// * 발주 상세 조회
export const getRequest = async (id: number) => {
  const request = await requestRepository.findOne({ where: { id } });
  if (!request) {
    throw new HttpError(404, 'Request not found');
  }
  return request;
};

// * 해당 발주 견적 전체 조회
export const getQuotesListByRequest = async (requestId: number) => {
  const request = await requestRepository.findOne({
    where: { id: requestId },
    relations: ['quotes'],
  });
  if (!request) {
    throw new HttpError(404, 'Request not found');
  }
  return request.quotes;
};

// * 발주 수정
export const updateRequest = async (id: number, updateData: Partial<Request>) => {
  await requestRepository.update(id, updateData);
  return await requestRepository.findOne({ where: { id } });
};

// * 발주 삭제
export const deleteRequest = async (id: number) => {
  await requestRepository.delete(id);
};
