import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { getQuotesListByRequest, getQuoteDetail, approveQuote } from '../../api/quote';
import Button from '../../components/Button';
import useAuthStore from '../../store/authStore';
import { FaArrowLeft } from 'react-icons/fa';

const QuotesList = () => {
  const { id } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getQuotesListByRequest(id);
        setQuotes(data.quotes);
        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchQuotes();
  }, [id]);

  const handleViewDetail = async (quoteId) => {
    try {
      const quoteDetail = await getQuoteDetail(quoteId);
      setSelectedQuote(quoteDetail);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApprove = async (quoteId) => {
    try {
      await approveQuote(quoteId);
      toast.success('견적 승인 성공!');
      // 승인 후 견적 상세 정보를 다시 불러옵니다.
      const quoteDetail = await getQuoteDetail(quoteId);
      setSelectedQuote(quoteDetail);
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-gray-500 mb-4 inline-flex items-center p-2 rounded">
        <FaArrowLeft className="mr-2" />
      </Link>
      <h2 className="text-2xl font-bold mb-4">견적 리스트</h2>
      {quotes.length === 0 ? (
        <p>견적이 없습니다.</p>
      ) : (
        <ul>
          {quotes.map((quote) => (
            <li key={quote.id} className="mb-4 p-4 border rounded shadow-sm">
              <p>예상 비용: {quote.estimatedCost}</p>
              <p>예상 소요 시간: {quote.estimatedTime}</p>
              <Button onClick={() => handleViewDetail(quote.id)} className="mt-2">
                상세 보기
              </Button>
            </li>
          ))}
        </ul>
      )}
      {selectedQuote && (
        <div className="mt-6 p-4 border rounded shadow-sm">
          <h3 className="text-xl font-bold mb-2">견적 상세 정보</h3>
          <p>예상 비용: {selectedQuote.estimatedCost}</p>
          <p>예상 소요 시간: {selectedQuote.estimatedTime}</p>
          <p>{selectedQuote.approved ? '승인됨' : '승인되지 않음'}</p>
          <p>생성일: {new Date(selectedQuote.createdAt).toLocaleString()}</p>
          <hr className="my-4" />
          {user && user.status === 'ORDERER' && !selectedQuote.approved && (
            <Button onClick={() => handleApprove(selectedQuote.id)} className="mt-4">
              견적 승인
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuotesList;
