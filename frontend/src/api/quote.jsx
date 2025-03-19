import axios from 'axios';
import { handleApiError } from '../store/error';
const API_URL = import.meta.env.VITE_API_URL;

// 견적 제출
export const submitQuote = async (requestId, estimatedCost, estimatedTime) => {
  try {
    const response = await axios.post(
      `${API_URL}/quote/submit`,
      { requestId, estimatedCost, estimatedTime },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 견적 리스트 전체 조회
export const getQuotesListByRequest = async (requestId) => {
  try {
    const response = await axios.get(`${API_URL}/request/${requestId}/quote-list`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 견적 상세 조회
export const getQuoteDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/quote/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 견적 승인
export const approveQuote = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/quote/${id}/approve`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
