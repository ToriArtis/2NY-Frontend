import { useState, useEffect, useCallback } from 'react';
import { createUser, isValidPassword } from '../models/User';
import useForm from '../hooks/useForm';
import { modify } from '../api/userApi';

export function useModifyViewModel(initialUserInfo) {
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
    postcode: '',
  });

  useEffect(() => {
    if (initialUserInfo) {
      setValues(prevValues => ({
        ...prevValues,
        ...initialUserInfo,
        password: '' // 보안을 위해 비밀번호 필드는 비워둡니다
      }));
    }
  }, [initialUserInfo, setValues]);

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
      alert('수정되었습니다.');
      window.location.href = '/';
    } catch (error) {
      setError(error.message || '수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDaumPostcode = useCallback((data) => {
    setValues(prev => ({
      ...prev,
      postcode: data.zonecode,
      address: data.roadAddress,
      detailAddress: '',
    }));
  }, [setValues]);

  return {
    values,
    handleChange,
    handleSubmit,
    handleDaumPostcode,
    error,
    isSubmitting,
  };
}