import React, { useState } from "react";
import { Container, Typography, Grid, Link, Button } from '@mui/material';
import { useLoginViewModel } from "../viewModels/useLoginViewModel";
import "../components/css/users.css";
import Input from "../components/common/Input";
import Footer from "../../component/Footer";


function LoginView() {
  const {
    email,
    password,
    handleChange,
    handleSubmit,
    error,
  } = useLoginViewModel();

  return (
  <>
    <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
            <b>로그인</b>
          </Typography>
        </Grid>
      </Grid>

      <br />
      <form onSubmit={handleSubmit} >
        <Input
          label="이메일"
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
        <Input
          label="비밀번호"
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          required
        />
        <button className="login-button" type="submit">로그인</button>
      </form>

      {error && (
        <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>
      )}

      <Grid container justifyContent="flex-start" style={{ marginTop: '10px' }}>
        <Grid item>
          <Link href="/signup" variant="body2" style={{ color: "#8A8A8A" }}>
            회원가입
          </Link>
          &nbsp;
          <Link href="/find" variant="body2" style={{ color: "#8A8A8A" }}>
            아이디/비밀번호 찾기
          </Link>
        </Grid>
      </Grid>

      <div className="hr-sect">&nbsp; 또는 &nbsp;</div>

      <div className="btns">
        {['kakao', 'naver', 'google'].map((provider) => (
          <Button key={provider} className={provider} aria-label={provider}>
            <img
              style={{ width: "60%", height: 'auto' }}
              src={`/assets/${provider}.png`}
              alt={`${provider} login`}
              onClick={() => window.open(`https://${provider}.com`)}
            />
          </Button>
        ))}
      </div>
    </Container>
    <Footer />
    </>
  );
}

export default LoginView;