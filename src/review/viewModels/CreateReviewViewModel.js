import { useState } from 'react';
import useForm from '../hooks/useForm';
import { createReview } from '../api/reviewApi';

export function CreateReviewViewModel(itemId, userId) {
  const [error, setError] = useState(null);
  const { values, handleChange } = useForm({
    content: '',
    star: 0,
  });

  const validateForm = () => {
    if (values.content.length < 10) {
      setError('리뷰 내용은 10자 이상이어야 합니다.');
      return false;
    }
    if (values.star < 1 || values.star > 5) {
      setError('별점을 선택해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
     // itemId와 userId가 유효한지 확인
    if (!itemId || !userId) {
      setError('상품 정보 또는 사용자 정보가 올바르지 않습니다.');
      return;
    }
    

    try {
      const reviewDTO = {
        itemId,
        userId,
        star: values.star,
        content: values.content,
      };
      await createReview(reviewDTO);
      alert('리뷰가 등록되었습니다.');
      window.location.href = '/review/user';

    } catch (error) {
      setError(error.message);
    }
  };

  const handleStarChange = (rating) => {
    handleChange('star', rating);
  };

  return {
    ...values,
    handleChange,
    handleSubmit,
    handleStarChange,
    error,
  };
}