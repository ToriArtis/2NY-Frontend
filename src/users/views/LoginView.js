import React, { useState } from "react";
import { Container, Typography, Grid, Link, Button } from '@mui/material';
import "../components/css/users.css";
import Input from "../components/common/Input";
import Footer from "../../component/Footer";
import { useLoginViewModel } from "../viewModels/useLoginViewModel";
// import { googleKey, naverKey, kakaoKey, redirectUri } from "../../Config";

function LoginView() {
  if(localStorage.getItem("ACCESS_TOKEN") ) {
    window.location.href = "/";
  }
  const {
    email,
    password,
    handleChange,
    handleSubmit,
    error,
  } = useLoginViewModel();

  const generateState = () => {
    return Math.random().toString(36).substring(2, 15);
  };

const handleSocialLogin = (provider) => {
  const state = Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('oauth_state', state);
  sessionStorage.setItem('oauth_provider', provider);

  let authUrl;
  // switch(provider) {
  //   case 'google':
  //     authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&state=${state}`;
  //     break;
  //   case 'naver':
  //     authUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}`;
  //     break;
  //   case 'kakao':
  //     authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}`;
  //     break;
  //   default:
  //     return;
  //   }
  //   window.location.href = authUrl;
   };


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
            회원가입 |
          </Link>
          
          &nbsp;
          <Link href="/emailFind" variant="body2" style={{ color: "#8A8A8A" }}>
            아이디/</Link>
          <Link href="/passwordFind" variant="body2" style={{ color: "#8A8A8A" }}>
          비밀번호 찾기</Link>
        </Grid>
      </Grid>

      <div className="hr-sect">&nbsp; 또는 &nbsp;</div>
       <div className="btns">
          {['kakao', 'naver', 'google'].map((provider) => (
            <Button 
              key={provider} 
              className={provider} 
              aria-label={provider}
              onClick={() => handleSocialLogin(provider)}
            >
              <img
                style={{ width: "60%", height: 'auto' }}
                src={`/assets/${provider}.png`}
                alt={`${provider} login`}
              />
            </Button>
          ))}
        </div>
      </Container>
      <Container sx={{ marginTop: "8%" }}></Container>
      <Footer />
    </>
  );
}

export default LoginView;