import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuotesListByRequest } from '../../api/post';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const QuotesList = () => {
  const { id } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getQuotesListByRequest(id);
        setQuotes(data.quotes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [id]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-gray-500 mb-4 inline-flex items-center  p-2 rounded">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuotesList;
