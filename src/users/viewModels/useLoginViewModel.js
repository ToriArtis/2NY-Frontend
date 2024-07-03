import { useState } from 'react';
import { login } from "../api/userApi";
import useForm from '../hooks/useForm'; 

export function useLoginViewModel() {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(values);
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      console.error('Login failed:', error);
    }
  };

  return {
    email: values.email,
    password: values.password,
    handleChange,
    handleSubmit,
    error,
  };
}