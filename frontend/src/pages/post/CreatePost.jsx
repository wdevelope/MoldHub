import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { createPost, uploadFile } from '../../api/post';
import useAuthStore from '../../store/authStore';
import { FaArrowLeft } from 'react-icons/fa';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('설명을 입력해주세요.');
      return;
    }

    try {
      let fileUrl = '';
      if (file) {
        const uploadResponse = await uploadFile(file);
        fileUrl = uploadResponse.imageUrl;
      }

      const postData = {
        description,
        dueDate,
        fileUrl,
      };

      await createPost(postData);
      toast.success('게시글 작성 성공!');
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <main className="flex-grow w-full max-w-2xl">
        <Link to="/" className="text-gray-500 mb-4 inline-flex items-center p-2 rounded">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h2 className="text-2xl font-bold mb-4">금형제작 요청 게시글 작성</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            설명:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label className="mb-2">
            예상 납기일:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label className="mb-4">
            파일 업로드:
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded w-full" />
          </label>
          {user && user.status === 'ORDERER' ? (
            <Button type="submit" className="mt-4">
              작성
            </Button>
          ) : (
            <p className="text-red-500">발주사만 게시글을 작성할 수 있습니다.</p>
          )}
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
