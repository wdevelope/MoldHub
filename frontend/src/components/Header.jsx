import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Header = () => {
  return (
    <header className="flex justify-between items-center mx-6 my-1 py-4 border-b border-gray-300">
      <Link to="/" className="text-2xl font-bold hover:text-blue-700 transition-colors">
        MoldHub
      </Link>
      <div>
        <Link to="/login">
          <Button className="mr-2">로그인</Button>
        </Link>
        <Link to="/signup">
          <Button className="ml-1">회원가입</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
