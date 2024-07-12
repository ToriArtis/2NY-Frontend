import { useState } from 'react';
import { createUser, isValidEmail, isValidPassword } from '../models/User';
import { signup } from '../api/userApi';

export function useSignUpViewModel() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    realName: '',
    nickName: '',
    phone: '',
  });

  const [address, setAddress] = useState({
    postcode: '',
    roadAddress: '',
    jibunAddress: '',
    detailAddress: '',
    extraAddress: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleDaumPostcode = (data) => {
    setAddress({
      postcode: data.zonecode,
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
      extraAddress: data.buildingName ? `(${data.buildingName})` : '',
      detailAddress: '',
    });
  };

  const validateForm = () => {
    if (!isValidEmail(values.email)) {
      setError('유효하지 않은 이메일 주소입니다.');
      return false;
    }
    if (!isValidPassword(values.password)) {
      setError('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return false;
    }
    if (!values.realName) {
      setError('이름을 입력해주세요.');
      return false;
    }
    if (!address.postcode || !address.roadAddress) {
      setError('주소를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    console.log(address);
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    try {
      const user = createUser(
        values.email,
        values.realName,
        values.password,
        values.nickName,
        address.roadAddress,
        address.detailAddress,
        values.phone
      );
      await signup(user);
      // 성공 처리 로직 (예: 로그인 페이지로 리디렉션)
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    values,
    address,
    handleChange,
    handleAddressChange,
    handleDaumPostcode,
    handleSubmit,
    error,
  };
}