// React에서 상태 관리를 위한 useState 훅을 가져옵니다.
// by 현영^^ ~ 20240705 7:46 PM

import { useState } from 'react';

// useForm이라는 커스텀 훅을 만듭니다.
// 이 훅은 폼 입력값을 쉽게 관리할 수 있게 해줍니다.
const useForm = (initialState = {}) => {
  // useState 훅을 사용하여 폼의 값들을 관리합니다.
  // initialState는 폼의 초기값으로, 기본값은 빈 객체입니다.
  const [values, setValues] = useState(initialState);

  // handleChange 함수는 입력값이 변경될 때 호출됩니다.
  // 이 함수는 두 가지 방식으로 사용할 수 있습니다.
  const handleChange = (nameOrEvent, value) => {
    if (typeof nameOrEvent === 'string') {
      // 1. 직접 name과 value를 받는 경우
      // 예: handleChange('username', 'john')
      setValues(prevValues => ({
        ...prevValues,  // 기존의 모든 값을 유지하고
        [nameOrEvent]: value  // 새로운 값만 업데이트합니다.
      }));
    } else {
      // 2. 이벤트 객체를 받는 경우
      // 예: <input onChange={handleChange} />
      const { name, value } = nameOrEvent.target;
      setValues(prevValues => ({
        ...prevValues,  // 기존의 모든 값을 유지하고
        [name]: value  // 변경된 입력 필드의 값만 업데이트합니다.
      }));
    }
  };

  // 이 훅은 객체를 반환합니다. 이 객체에는:
  return {
    values,  // 현재 폼의 모든 값들
    handleChange,  // 입력값 변경을 처리하는 함수
    setValues  // 폼 값을 직접 설정할 수 있는 함수
  };
};

// 이 훅을 다른 파일에서 사용할 수 있도록 내보냅니다.
export default useForm;