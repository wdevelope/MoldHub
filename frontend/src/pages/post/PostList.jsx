import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostList } from '../../api/post';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostList();
        setPosts(data.requests);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">금형제작 요청 리스트</h2>
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <div className="mb-4 p-4 cursor-pointer border rounded shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p>{post.description}</p>
              <p className="text-sm text-gray-500">작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">상태: {post.status}</p>
            </div>
          </div>
        </Link>
      ))}
      {/* 페이지네이션 추가 가능 */}
    </div>
  );
};

export default PostList;
