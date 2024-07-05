import { useState, useEffect } from 'react';
import { createUser, isValidEmail, isValidPassword } from '../models/User';
import useForm from '../hooks/useForm';
import { modify } from '../api/userApi';  // signup을 modify로 변경

export function useModifyViewModel(initialValues) {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
    realName: '',
    nickName: '',
    address: '',
    detailAddress: '',
    phone: '',
  });

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues, setValues]);

  const validateForm = () => {
    if (!values.password || !isValidPassword(values.password)) {
      setError('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const user = createUser(
        values.email,
        values.realName,
        values.password,
        values.nickName,
        values.address,
        values.detailAddress,
        values.phone
      );
      await modify(user);
      // 성공 처리 로직 (예: 홈페이지로 리디렉션)
      alert('수정되었습니다.');
      window.location.href = '/';
    } catch (error) {
      setError(error.message || '수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...values,
    handleChange,
    handleSubmit,
    error,
    isSubmitting,
  };
}