import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { getPostDetail } from '../../api/post';
import { FaArrowLeft } from 'react-icons/fa';
import AdminActions from './AdminActions';
import useAuthStore from '../../store/authStore';
import { toast } from 'react-toastify';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAuthStore((state) => state.user);

  const fetchPostDetail = async () => {
    try {
      const data = await getPostDetail(id);
      setPost(data);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || '게시글 정보를 불러오는 데 실패했습니다.';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
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
        <Link to="/" className="text-gray-500 mb-4 inline-flex items-center p-2 rounded">
          <FaArrowLeft className="mr-2" />
        </Link>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-md font-medium">예상 납기일: {post.dueDate}</p>
            <p className="text-md font-medium">상태: {post.status}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Link to={`/post/${id}/submit`}>
              <Button className="ml-4">견적 제출</Button>
            </Link>
            <Link to={`/post/${id}/quotes`}>
              <Button className="ml-4">견적 리스트</Button>
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          파일:{' '}
          <a
            href={post.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
            download={post.fileUrl.split('/').pop()}
          >
            보기
          </a>
        </p>
        <hr className="my-4" />
        <div className="mb-10" style={{ minHeight: '150px' }}>
          <p className="mt-2">{post.description}</p>
        </div>
        {user && user.status === 'DOTCO' && <AdminActions fetchPostDetail={fetchPostDetail} />}
      </main>
    </div>
  );
};

export default PostDetail;
