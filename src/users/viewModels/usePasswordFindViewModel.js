import { useState } from 'react';
import { login } from "../api/userLoginApi";
import useForm from '../hooks/useForm'; 
import { isValidPassword, loginUser } from '../models/User';
import { passwordFind } from '../api/userApi';

export function usePasswordFindViewModel() {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!values.email ) {
      setError('유효하지 않은 이메일 주소입니다.');
      return false;
    }
    if (!values.password || !isValidPassword(values.password)) {
      setError('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return false;
    }
    if (!values.passwordCheck || values.passwordCheck !== values.password) {
      setError('비밀번호를 확인해야 합니다.');
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
        const user = loginUser(
          values.email,
          values.password
        )
        await passwordFind(values);
      
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      console.error('failed:', error);
      alert('이메일을 찾지 못했습니다.');
    }
  };

  return {
    email: values.email,
    password: values.password,
    passwordCheck: values.passwordCheck,
    handleChange,
    handleSubmit,
    error,
  };
}