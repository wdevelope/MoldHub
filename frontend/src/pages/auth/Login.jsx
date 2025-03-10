import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 추가
    console.log('로그인:', { email, password });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
          <label className="mb-2">
            이메일:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label className="mb-4">
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <Button type="submit" className="mb-2">
            로그인
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Login;
