import React, { useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useSignUpViewModel } from "../viewModels/useSignUpViewModel";
import Input from "../components/common/Input";
import WhiteButton from "../../component/WhiteButton";
import BlueButton from "../../component/BlueButton";
import { styled } from '@mui/material/styles';
import Footer from "../../component/Footer";

const PostcodeButton = styled(Button)({
    width: '35%',
    height: 'auto', 
    marginLeft: '10px',
    marginBottom: '10px',
});
  
function SignUpView() {
  const { 
    values, 
    address, 
    handleChange, 
    handleAddressChange, 
    handleDaumPostcode, 
    handleSubmit, 
    error 
  } = useSignUpViewModel();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: handleDaumPostcode,
      width: 500,
      height: 600,
    }).open();
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
        <Typography component="h1" variant="h5" align="center">
          <b>회원가입</b>
        </Typography>
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <Input label="이메일" type="email" name="email" value={values.email} onChange={handleChange} required />
          <Input label="비밀번호" type="password" name="password" value={values.password} onChange={handleChange} required />
          <Input label="이름" type="text" name="realName" value={values.realName} onChange={handleChange} required />
          <Input label="닉네임" type="text" name="nickName" value={values.nickName} onChange={handleChange} required />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Input
              name="postcode"
              value={address.postcode}
              InputProps={{
                readOnly: true,
              }}
            />
            <PostcodeButton 
              variant="contained" 
              onClick={openDaumPostcode}
            >
              우편번호 찾기
            </PostcodeButton>
          </Box>
          
          <Input type="text" name="roadAddress" value={address.roadAddress} readOnly />
          <Input label="상세주소" type="text" name="detailAddress" value={address.detailAddress} onChange={handleAddressChange} />
          <Input type="text" name="extraAddress" value={address.extraAddress} readOnly />
          
          <Input label="전화번호" type="tel" name="phone" value={values.phone} onChange={handleChange} required />
          
          <div>
            <WhiteButton type="button" btnName="취소" onClick={() => window.history.back()} />
            <BlueButton type="submit" btnName="회원가입" />
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
}

export default SignUpView;