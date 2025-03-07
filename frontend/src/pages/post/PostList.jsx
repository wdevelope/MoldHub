import React from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">금형제작 요청 리스트</h2>
      <Link to="/post/1">
        <div className="mb-4 p-4 cursor-pointer border rounded shadow-sm hover:shadow-md transition-shadow">
          <div>
            <p>게시글 제목 1</p>
            <p className="text-sm text-gray-500">작성자: 홍길동 | 날짜: 2025-03-08</p>
          </div>
        </div>
      </Link>
      <Link to="/post/2">
        <div className="mb-4 p-4 cursor-pointer border rounded shadow-sm hover:shadow-md transition-shadow">
          <div>
            <p>게시글 제목 2</p>
            <p className="text-sm text-gray-500">작성자: 김철수 | 날짜: 2025-03-08</p>
          </div>
        </div>
      </Link>
      {/* 페이지네이션 추가 가능 */}
    </div>
  );
};

export default PostList;
