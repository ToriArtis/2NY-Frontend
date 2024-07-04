import { useState } from 'react';
import { createUser, isValidEmail, isValidPassword } from '../models/User';
import useForm from '../hooks/useForm';
import { signup } from '../api/userApi';

export function useSignUpViewModel() {
  const [error, setError] = useState(null);
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    realName: '',
    nickName: '',
    address: '',
    detailAddress: '',
    phone: '',
  });

  const validateForm = () => {
    if (!values.email || !isValidEmail(values.email)) {
      setError('유효하지 않은 이메일 주소입니다.');
      return false;
    }
    if (!values.password || !isValidPassword(values.password)) {
      setError('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return false;
    }
    if (!values.realName) {
      setError('이름을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

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
      await signup(user);
      // 성공 처리 로직 (예: 로그인 페이지로 리디렉션)
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    ...values,
    handleChange,
    handleSubmit,
    error,
  };
}