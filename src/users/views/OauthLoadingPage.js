import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const Card = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
  margin: 0 auto 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled(Title)`
  color: #e74c3c;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const OauthLoadingPage = ({ error, onReturnToLogin }) => {
  if (error) {
    return (
      <Container>
        <Card>
          <ErrorTitle>로그인 에러</ErrorTitle>
          <Message>{error}</Message>
          <Button onClick={onReturnToLogin}>로그인 페이지로 돌아가기</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Spinner />
        <Title>소셜 로그인 처리중..</Title>
        <Message>잠시 기다려주시면 로그인이 진행됩니다.</Message>
      </Card>
    </Container>
  );
};

export default OauthLoadingPage;