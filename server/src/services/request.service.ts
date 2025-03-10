import { DB } from '../common/config/postgresql.config';
import { Request } from '../models/request.model';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { HttpError } from '../common/errors/HttpError';
import { uploadToS3 } from '../middlewares/file';

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

// * 설계도 파일 업로드 (s3)
export const uploadFile = async (file: Express.Multer.File) => {
  if (!file) {
    throw new HttpError(400, 'Blueprint File is required');
  }

  const imageUrl = await uploadToS3(file, 'Blueprint');
  return imageUrl;
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
export const getRequest = async (id: number, userId: number) => {
  // 상세조회시 유저의 status가 DOTCO일 경우, request의 status가 '등록됨'일 경우에만 status를 '검토중'으로 변경
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  if (user.status === 'DOTCO') {
    const request = await requestRepository.findOne({ where: { id } });
    if (!request) {
      throw new HttpError(404, 'Request not found');
    }

    if (request.status === '등록됨') {
      await requestRepository.update(id, { status: '검토 중' });
    }
  }

  const request = await requestRepository.findOne({ where: { id } });
  if (!request) {
    throw new HttpError(404, 'Request not found');
  }

  return request;
};

// * 해당 발주 요청된 견적 리스트 전체 조회
export const getQuotesListByRequest = async (id: number) => {
  const request = await requestRepository.findOne({
    where: { id: id },
    relations: ['quotes'],
  });
  if (!request) {
    throw new HttpError(404, 'Request not found');
  }
  return request;
};

// * 발주 수정 (내용, 첨부파일 등)
export const updateRequest = async (id: number, updateData: Partial<Request>, userId: number) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const request = await requestRepository.findOne({ where: { id }, relations: ['orderer'] });
  if (!request) {
    throw new HttpError(404, 'Request not found');
  }

  // 발주사만 수정 가능
  if (request.orderer.id !== userId) {
    throw new HttpError(403, 'Only the orderer can update the request');
  }

  await requestRepository.update(id, updateData);
  return await requestRepository.findOne({ where: { id } });
};

// * 발주 요청 승인 - 관리자
export const approveRequest = async (id: number) => {
  await requestRepository.update(id, { status: '승인됨' });
};

// * 발주 확정 후 발주 진행 처리 - 관리자
export const progressRequest = async (id: number) => {
  await requestRepository.update(id, { status: '진행 중' });
};

// * 발주 최종완료 처리 (발주사와 공급사 모두 해야함)
export const completeRequest = async (requestId: number, userId: number) => {
  const request = await requestRepository.findOne({ where: { id: requestId }, relations: ['orderer', 'supplier'] });
  if (!request) {
    throw new HttpError(404, 'Request not found');
  }

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  // 발주사 완료 처리
  if (user.id === request.orderer.id) {
    request.ordererCompleted = true;
  }

  // 공급사 완료 처리
  if (user.id === request.supplier.id) {
    request.supplierCompleted = true;
  }

  // 발주사와 공급사 모두 완료 처리한 경우 상태를 "완료됨"으로 변경
  if (request.ordererCompleted && request.supplierCompleted) {
    request.status = '완료됨';
  }

  return await requestRepository.save(request);
};

// * 발주 삭제
export const deleteRequest = async (requestId: number, userId: number) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const request = await requestRepository.findOne({ where: { id: requestId }, relations: ['orderer'] });
  if (!request) {
    throw new HttpError(404, 'Request not found');
  }

  // 발주사만 삭제 가능
  if (request.orderer.id !== userId) {
    throw new HttpError(403, 'Only the orderer can delete the request');
  }

  await requestRepository.delete(requestId);
};
