import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { approveRequest, progressRequest, completeRequest } from '../../api/post';
import Button from '../../components/Button';

const AdminActions = () => {
  const { id } = useParams();

  const handleApprove = async () => {
    if (window.confirm('발주 요청을 승인하시겠습니까?')) {
      try {
        await approveRequest(id);
        toast.success('발주 요청 승인 성공!');
      } catch (error) {
        const errorMessage = error || '발주 요청 승인 실패!';
        toast.error(errorMessage);
      }
    }
  };

  const handleProgress = async () => {
    if (window.confirm('발주를 진행 처리하시겠습니까?')) {
      try {
        await progressRequest(id);
        toast.success('발주 진행 처리 성공!');
      } catch (error) {
        const errorMessage = error || '발주 진행 처리 실패!';
        toast.error(errorMessage);
      }
    }
  };

  const handleComplete = async () => {
    if (window.confirm('발주를 최종 완료 처리하시겠습니까?')) {
      try {
        await completeRequest(id);
        toast.success('발주 최종 완료 처리 성공!');
      } catch (error) {
        const errorMessage = error || '발주 최종 완료 처리 실패';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex space-x-4">
      <Button onClick={handleApprove} variant="primary">
        발주 요청 승인
      </Button>
      <Button onClick={handleProgress} variant="primary">
        발주 진행 처리
      </Button>
      <Button onClick={handleComplete} variant="primary">
        발주 최종 완료 처리
      </Button>
    </div>
  );
};

export default AdminActions;
