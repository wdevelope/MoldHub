import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { approveRequest, progressRequest, completeRequest } from '../../api/post';
import Button from '../../components/Button';

const AdminActions = () => {
  const { id } = useParams();

  const handleApprove = async () => {
    try {
      await approveRequest(id);
      toast.success('발주 요청 승인 성공!');
    } catch (err) {
      toast.error('발주 요청 승인 실패!');
    }
  };

  const handleProgress = async () => {
    try {
      await progressRequest(id);
      toast.success('발주 진행 처리 성공!');
    } catch (err) {
      toast.error('발주 진행 처리 실패!');
    }
  };

  const handleComplete = async () => {
    try {
      await completeRequest(id);
      toast.success('발주 최종 완료 처리 성공!');
    } catch (err) {
      toast.error('발주 최종 완료 처리 실패!');
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
