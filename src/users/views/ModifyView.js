import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, CircularProgress, Box, Button } from '@mui/material';
import { useModifyViewModel } from '../viewModels/useModifyViewModel';
import Input from '../components/common/Input';
import BlueButton from '../../component/BlueButton';
import WhiteButton from '../../component/WhiteButton';
import DeleteView from './DeleteView';
import { styled } from '@mui/material/styles';
import '../../component/css/ModifyView.css';

const PostcodeButton = styled(Button)({
  width: '35%',
  height: 'auto', 
  marginLeft: '10px',
  marginBottom: '10px',
});

export default function ModifyView(userInfo) {
  const userRoles = localStorage.getItem("USER_ROLESET");
  const [showDeleteView, setShowDeleteView] = useState(false);

  const {
    values,
    handleChange,
    handleSubmit,
    handleDaumPostcode,
    error,
    isSubmitting
  } = useModifyViewModel(userInfo);

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

  if (!values.email) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <div></div>
      {!showDeleteView ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid container spacing={2}>
              <Typography variant="h4" className='modify-login'>
                로그인 정보
              </Typography>
              <Grid item xs={12} className='modify-input-box'>
                <Typography className="modify-label">닉네임</Typography>
                <Input
                  name="nickName"
                  value={values.nickName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} className='modify-input-box'>
                <Typography className="modify-label">이메일</Typography>
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} className='modify-input-box'>
                <Typography className="modify-label">비밀번호</Typography>
                <Input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            
            {userRoles && !(userRoles && userRoles.includes("ADMIN")) && (
              <Grid container spacing={2} className='배송지 정보'>
                <Typography variant="h4" className='modify-delivery'>
                  배송지 정보
                </Typography>
                <Grid item xs={12} className='modify-input-box'>
                  <Typography className="modify-label">전화번호</Typography>
                  <Input
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} className='modify-input-box'>
                  <Typography className="modify-label">이름</Typography>
                  <Input
                    name="realName"
                    value={values.realName}
                    onChange={handleChange}
                    readOnly
                  />
                </Grid>

                <Grid item xs={12} className='modify-input-box'>
                  <Typography className="modify-label">우편번호</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Input
                      name="postcode"
                      value={values.postcode}
                      onChange={handleChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <PostcodeButton 
                      variant="contained" 
                      onClick={openDaumPostcode}
                      className='modify-input-box'
                    >
                      찾기
                    </PostcodeButton>
                  </Box>
                </Grid>

                <Grid item xs={12} className='modify-input-box'>
                  <Typography className="modify-label">주소</Typography>
                  <Input
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} className='modify-input-box'>
                  <Typography className="modify-label">상세주소</Typography>
                  <Input
                    name="detailAddress"
                    value={values.detailAddress}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}
            
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12} className='button-box'>
              <WhiteButton
                type="submit"
                btnName="수정하기"
                disabled={isSubmitting}
              />
              {(!userRoles || !userRoles.includes("BOSS")) && (
                <BlueButton
                  className="delete-button"
                  type="button"
                  btnName="회원탈퇴"
                  onClick={() => setShowDeleteView(true)}
                />
              )}
            </Grid>
          </Grid>
        </form>
      ) : (
        <DeleteView onCancel={() => setShowDeleteView(false)} />
      )}
    </Container>
  );
}