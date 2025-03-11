import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import useAuthStore from '../store/authStore';
import { logout } from '../api/user';

const Header = () => {
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex justify-between items-center mx-6 my-1 py-4 border-b border-gray-300">
      <Link to="/" className="text-2xl font-bold hover:text-blue-700 transition-colors">
        MoldHub
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/mypage">
              <Button className="mr-2">마이페이지</Button>
            </Link>
            <Button onClick={handleLogout} className="ml-1">
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="mr-2">로그인</Button>
            </Link>
            <Link to="/signup">
              <Button className="ml-1">회원가입</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
