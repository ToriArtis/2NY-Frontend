import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    // 입력값이 변경되면 해당 필드의 에러를 지웁니다
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = (onSubmit) => (event) => {
    event.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length === 0) {
      // 폼이 유효하면 onSubmit 콜백을 호출합니다
      onSubmit(values);
    } else {
      // 유효성 검사 오류가 있으면 errors 상태를 업데이트합니다
      setErrors(newErrors);
    }
  };

  const validate = (formValues) => {
    let errors = {};
    Object.keys(formValues).forEach(key => {
      if (!formValues[key]) {
        errors[key] = '이 필드는 필수입니다.';
      }
    });
    return errors;
  };

  const reset = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset
  };
};

export default useForm;