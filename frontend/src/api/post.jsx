import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// 금형제작 요청 리스트 조회
export const getPostList = async () => {
  try {
    const response = await axios.get(`${API_URL}/request/all`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 금형제작 요청 상세 조회
export const getPostDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/request/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
