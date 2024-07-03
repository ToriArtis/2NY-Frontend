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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      // values가 undefined인 경우를 대비해 기본값 설정
      const { email = '', password = '', realName = '', 
        nickName = '', address = '', detailAddress = '', phone = '' } = values || {};

        console.log(email, password, realName, nickName, address, detailAddress, phone);
      if (!email || !isValidEmail(email)) {
        setError('유효하지 않은 이메일 주소입니다.');
        return;
      }
      if (!password || !isValidPassword(password)) {
        setError('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
        return;
      }
      if (!realName) {
        setError('이름을 입력해주세요.');
        return;
      }

      const user = createUser(email, realName, password, nickName, address, detailAddress, phone);
      await signup(user);
      // 성공 처리 로직 (예: 로그인 페이지로 리디렉션)
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    email: values?.email || '',
    password: values?.password || '',
    realName: values?.realName || '',
    nickName: values?.nickName || '',
    address: values?.address || '',
    detailAddress: values?.detailAddress || '',
    phone: values?.phone || '',
    handleChange,
    handleSubmit,
    error,
  };
}