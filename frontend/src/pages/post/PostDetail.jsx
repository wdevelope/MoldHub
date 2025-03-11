import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { getPostDetail } from '../../api/post';
import { FaArrowLeft } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostDetail(id);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col">
      <main className="flex-grow p-6 flex flex-col">
        <Link to="/" className="text-gray-500 mb-4 inline-flex items-centerp-2">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h2 className="text-2xl font-bold mt-4 mb-4">게시글 상세 페이지 {id}</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg font-medium">
              예상 납기일: {post.dueDate} //  {post.status}
            </p>
          </div>
          <Link to={`/post/${id}/submit`}>
            <Button className="ml-4">견적 제출</Button>
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          파일:{' '}
          <a href={post.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            다운로드
          </a>
        </p>
        <hr className="my-4" />
        <div className="mb-10">
          <p className="text-lg font-medium">설명:</p>
          <p className="mt-2">{post.description}</p>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
