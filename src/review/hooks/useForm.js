import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (nameOrEvent, value) => {
    if (typeof nameOrEvent === 'string') {
      // 직접 name과 value를 받는 경우
      setValues(prevValues => ({
        ...prevValues,
        [nameOrEvent]: value
      }));
    } else {
      // 이벤트 객체를 받는 경우
      const { name, value } = nameOrEvent.target;
      setValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
    }
  };

  return {
    values,
    handleChange,
    setValues
  };
};

export default useForm;