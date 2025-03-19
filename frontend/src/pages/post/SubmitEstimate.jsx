import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { submitQuote } from '../../api/quote';
import { FaArrowLeft } from 'react-icons/fa';

const SubmitEstimate = () => {
  const { id } = useParams();
  const [estimatedCost, setEstimatedCost] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitQuote(id, estimatedCost, estimatedTime);
      toast.success('견적 제출 성공!');
      navigate(`/post/${id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <main className="flex-grow w-full max-w-2xl">
        <Link to={`/post/${id}`} className="text-gray-500 mb-4 inline-flex items-center  p-2 rounded">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h2 className="text-2xl font-bold mb-4">견적 제출</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            예상 비용:
            <input
              type="number"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label className="mb-4">
            예상 소요 시간:
            <input
              type="text"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <Button type="submit" className="mt-4">
            제출
          </Button>
        </form>
      </main>
    </div>
  );
};

export default SubmitEstimate;
