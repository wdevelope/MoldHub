import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { signup } from '../../api/user';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('ORDERER');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password, status);
      toast.success('회원가입 성공!');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || '회원가입에 실패했습니다.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
          <label className="mb-2">
            이름:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
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
          <label className="mb-2">
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label className="mb-4">
            상태:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="ORDERER">발주사</option>
              <option value="SUPPLIER">공급사</option>
              <option value="DOTCO">닷코</option>
            </select>
          </label>
          <Button type="submit" className="mb-2">
            회원가입
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
