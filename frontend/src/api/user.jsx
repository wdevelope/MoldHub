import axios from 'axios';
import { handleApiError } from '../store/error';

const API_URL = import.meta.env.VITE_API_URL;

// 로그인
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 회원 가입
export const signup = async (name, email, password, status) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, { name, email, password, status });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 유저 정보 조회
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/mypage`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
