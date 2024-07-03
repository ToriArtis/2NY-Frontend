import { useState } from 'react';
import { createUser, isValidEmail, isValidPassword } from '../models/User';
import { useForm } from 'react-hook-form';

// signup 함수를 import 하거나, 여기서 mock 함수로 정의합니다.
const signup = async (user) => {
  // 실제 signup 로직을 여기에 구현하거나 import 합니다.
  console.log('Signing up user:', user);
  // 예시: return api.signup(user);
};

export function useSignUpViewModel() {
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
      defaultValues: {
        email: '',
        password: '',
        username: '', // username 필드 추가
      }
    });
    
  const onSubmit = async (data) => {
    try {
      const { email, password, username } = data;
      if (!isValidEmail(email)) {
        setError('유효하지 않은 이메일 주소입니다.');
        return;
      }
      if (!isValidPassword(password)) {
        setError('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
        return;
      }
      const user = createUser(email, username, password);
      await signup(user);
      // 성공 처리
    } catch (error) {
      setError(error.message);
    }
  };
  
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
  };
}