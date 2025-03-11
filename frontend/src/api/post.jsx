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

// 금형제작 요청 게시글 작성
export const createPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/request`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 파일 업로드
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/request/upload`, formData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
