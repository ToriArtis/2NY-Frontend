import React, { useEffect } from "react";
import { Container, Typography, Grid, Link, Button } from '@mui/material';
import Input from "../components/common/Input";
import Footer from "../../component/Footer";
import { useEmailFindViewModel } from "../viewModels/useEmailFindViewModel";
import WhiteButton from "../../component/WhiteButton";
import BlueButton from "../../component/BlueButton";

function EmailFind() {
  if(localStorage.getItem("ACCESS_TOKEN")) {
    window.location.href = "/";
  }
  
  const {
    phone,
    handleChange,
    handleSubmit,
    error,
    email,
  } = useEmailFindViewModel();

  useEffect(() => {
    if (email) {
      alert(`찾은 이메일: ${email}\n로그인 페이지로 이동합니다.`);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000); // 2초 후 로그인 페이지로 이동
    }
  }, [email]);

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
              <b>이메일 찾기</b>
            </Typography>
          </Grid>
        </Grid>

        <br />
        <form onSubmit={handleSubmit} >
          <Input
            label="전화번호"
            type="phone"
            name="phone"
            value={phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
          <Grid>
            {error && (
              <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>
            )}
            {email && (
              <Typography color="primary" style={{ marginTop: '10px' }}>
                이메일을 찾았습니다. 곧 로그인 페이지로 이동합니다...
              </Typography>
            )}
          </Grid>

          <WhiteButton 
            className="reset-button" 
            type="reset" 
            btnName={"취소"}
            onClick={() => window.history.back()} 
          />
          <BlueButton 
            className="signup-button" 
            type="submit" 
            btnName={"확인"}
          />
        </form>
      </Container>
      <Container sx={{ marginTop: "8%" }}></Container>
      <Footer />
    </>
  );
}

export default EmailFind;