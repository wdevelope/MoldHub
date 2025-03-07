import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';

const SubmitEstimate = () => {
  const { id } = useParams();
  const [estimate, setEstimate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 견적 제출 로직 추가
    console.log('견적 제출:', { id, estimate });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 flex flex-col items-center">
        <Link to={`/post/${id}`} className="text-blue-500 mb-4">
          ← 뒤로가기
        </Link>
        <h2 className="text-2xl font-bold mb-4">게시글 {id}에 대한 견적 제출</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
          <label className="mb-2">
            견적 내용:
            <textarea
              value={estimate}
              onChange={(e) => setEstimate(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <Button type="submit" className="mb-2">
            제출
          </Button>
        </form>
      </main>
    </div>
  );
};

export default SubmitEstimate;
