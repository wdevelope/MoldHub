import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';

const PostDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 flex flex-col items-center">
        <Link to="/" className="text-blue-500 mb-4">
          ← 뒤로가기
        </Link>
        <h2 className="text-2xl font-bold mt-4">게시글 상세 페이지 {id}</h2>
        <p className="mt-2">게시글 상세 내용이 여기에 들어갑니다.</p>
        <Link to={`/post/${id}/submit`}>
          <Button className="mt-4">견적 제출</Button>
        </Link>
      </main>
    </div>
  );
};

export default PostDetail;
