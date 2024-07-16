import { useState, useCallback } from 'react';
import { testError } from '../api/errorApi';
import { ErrorModel } from '../models/Error';

export const useErrorViewModel = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback(async (code) => {
    const result = await testError(code);
    if (result) {
      setError(new ErrorModel(result.statusCode, result.message));
    }
  }, []);

  return { error, handleError };
};