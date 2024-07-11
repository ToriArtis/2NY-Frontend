import { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import { modifyReview, getReview } from '../api/reviewApi';

export function ModifyReviewViewModel(reviewId) {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { values, handleChange, setValues } = useForm({
    content: '',
    star: 0,
  });

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const reviewData = await getReview(reviewId);
        setValues({
          content: reviewData.content,
          star: reviewData.star,
        });
        setIsLoading(false);
      } catch (error) {
        setError('리뷰 정보를 불러오는데 실패했습니다.');
        setIsLoading(false);
      }
    };

    fetchReviewData();
  }, [reviewId, setValues]);

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

  const handleStarChange = (newStar) => {
    handleChange('star', newStar);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const reviewDTO = {
        content: values.content,
        star: values.star,
      };
      await modifyReview(reviewId, reviewDTO);
      alert('리뷰가 수정되었습니다.');
      window.location.href = '/mypage';

    } catch (error) {
      setError(error.message || '리뷰 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    handleChange,
    handleStarChange, 
    handleSubmit,
    error,
    isSubmitting,
    isLoading,
  };
}