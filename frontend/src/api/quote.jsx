import axios from 'axios';

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
    throw error.response.data;
  }
};
