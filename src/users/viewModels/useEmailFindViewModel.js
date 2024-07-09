import { useState } from 'react';
import useForm from '../hooks/useForm'; 
import { emailFind } from '../api/userApi';

export function useEmailFindViewModel() {
  const { values, handleChange } = useForm({
    phone: '',
  });

  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setEmail(null);

    try {
      const result = await emailFind(values.phone);
      if (result.success) {
        setEmail(result.email);
        alert(`찾은 이메일: ${result.email}`);
        return result.email;
      } else {
        setError('이메일을 찾지 못했습니다.');
      }
    } catch (error) {
      console.error('이메일 찾기 실패:', error);
      setError('이메일 찾기 중 오류가 발생했습니다.');
    }
  };

  return {
    phone: values.phone,
    handleChange,
    handleSubmit,
    error,
    email,
  };
}