import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// 로그인
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 회원 가입
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 유저 정보 조회
export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
