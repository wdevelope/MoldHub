import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/user';
import useAuthStore from '../../store/authStore';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">마이페이지</h2>
      {userInfo && (
        <div className="p-4 border rounded shadow-sm">
          <p>이름: {userInfo.name}</p>
          <p>이메일: {userInfo.email}</p>
          <p>상태: {userInfo.status}</p>
        </div>
      )}
    </div>
  );
};

export default MyPage;
