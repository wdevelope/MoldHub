import { DB } from '../common/config/postgresql.config';
import { Request } from '../models/request.model';
import { Repository } from 'typeorm';

const requestRepository: Repository<Request> = DB.getRepository(Request);

// * 발주 요청 생성
export const createRequest = async (requestData: Partial<Request>) => {
  const newRequest = requestRepository.create(requestData);
  return await requestRepository.save(newRequest);
};

interface QueryParams {
  search?: string;
  searchBy?: string;
  page?: number;
  limit?: number;
}

// * 발주 요청 리스트 전체 조회 (페이지네이션 + 검색)
export const getRequestList = async ({ search, searchBy, page = 1, limit = 10 }: QueryParams) => {
  const query: any = {};

  if (search && searchBy) {
    if (searchBy === 'all') {
      query.where = [{ description: `%${search}%` }, { status: `%${search}%` }];
    } else if (searchBy === 'description' || searchBy === 'status') {
      query.where = { [searchBy]: `%${search}%` };
    }
  }

  const [requests, totalRequests] = await requestRepository.findAndCount({
    where: query.where,
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
    throw new Error('Request not found');
  }
  return request;
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
