import { useErrorViewModel } from '../viewModels/useErrorViewModel';

const useError = () => {
  const { error, handleError } = useErrorViewModel();

  return { 
    error, 
    testError: handleError 
  };
};

export default useError;