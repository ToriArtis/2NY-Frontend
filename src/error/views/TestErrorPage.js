import React from 'react';
import { useParams } from 'react-router-dom';
import useError from '../hooks/useError';
import ErrorPage from './ErrorPage';

function TestErrorPage() {
  const { code } = useParams();
  const { error, testError } = useError();

  React.useEffect(() => {
    testError(code);
  }, [code, testError]);

  if (error) {
    return <ErrorPage statusCode={error.statusCode} message={error.message} />;
  }

  return <div>테스트 중...</div>;
}

export default TestErrorPage;