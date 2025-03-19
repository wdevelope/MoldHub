export const handleApiError = (error) => {
  return error.response?.data?.message || '요청 처리 중 오류가 발생했습니다.';
};
