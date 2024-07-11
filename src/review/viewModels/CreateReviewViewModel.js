import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import { createReview, getReviewsByItemId } from '../api/reviewApi';

export function CreateReviewViewModel(itemId, userId, orderId) {
  const [error, setError] = useState(null);
  const { values, handleChange } = useForm({
    content: '',
    star: 0,
  });

   useEffect(() => {
    async function checkReviewExists() {
      try {
        const response = await getReviewsByItemId(itemId);
        const userReview = response.content.find(review => review.orderId === orderId);
        if (userReview) {
          alert('이미 이 주문에 대한 후기를 작성하셨습니다.');
          window.history.back();
        }
      } catch (error) {
        setError(error.message);
      }
    }
    checkReviewExists();
  }, [itemId, userId, orderId]);


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
    if (!itemId || !userId || !orderId) {
      setError('상품 정보, 사용자 정보 또는 주문 정보가 올바르지 않습니다.');
      return;
    }
    

    try {
      const reviewDTO = {
        itemId,
        userId,
        orderId,
        star: values.star,
        content: values.content,
      };
      await createReview(reviewDTO);
      alert('리뷰가 등록되었습니다.');
      window.location.href = '/mypage';

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