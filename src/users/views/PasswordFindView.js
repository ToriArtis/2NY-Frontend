import React, { useState } from "react";
import { Container, Typography, Grid, Link, Button } from '@mui/material';
import Input from "../components/common/Input";
import Footer from "../../component/Footer";
import { usePasswordFindViewModel } from "../viewModels/usePasswordFindViewModel";
import WhiteButton from "../../component/WhiteButton";
import BlueButton from "../../component/BlueButton";


function PassWordFind() {
  if(localStorage.getItem("ACCESS_TOKEN") ) {
    window.location.href = "/";
  }
  const {
    email,
    password,
    passwordCheck,
    handleChange,
    handleSubmit,
    error,
  } = usePasswordFindViewModel();

  return (
  <>
    <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
            <b>비밀번호 찾기</b>
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
          label="새비밀번호"
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          required
        />
        <Input
          label="비밀번호 재확인"
          type="password"
          id="password"
          value={passwordCheck}
          onChange={(e) => handleChange('passwordCheck', e.target.value)}
          required
        />
        
        <WhiteButton className="reset-button" type="reset" btnName={"취소"}
          onClick={() => window.history.back()} />
        <BlueButton className="signup-button" type="submit" btnName={"확인"}/>
      </form>

      {error && (
        <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>
      )}

    </Container>
    <Container sx={{ marginTop: "8%" }}></Container>
    <Footer />
    </>
  );
}

export default PassWordFind;