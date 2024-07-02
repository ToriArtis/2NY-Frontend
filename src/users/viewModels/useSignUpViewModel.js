import { createUser, isValidEmail, isValidPassword } from '../models/users';

export function useSignUpViewModel() {
    const [error, setError] = useState(null);
    const { values, handleChange } = useForm({
    email: '',
    password: '',
    });
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
    ...values,
    handleChange,
    handleSubmit,
    error,
  };
}