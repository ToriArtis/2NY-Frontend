import React from 'react';
import { Grid, Typography, Container, CircularProgress } from '@mui/material';
import { useModifyViewModel } from '../viewModels/useModifyViewModel';
import Input from '../components/common/Input';
import BlueButton from '../../component/BlueButton';
import WhiteButton from '../../component/WhiteButton';
import DeleteView from './DeleteView';

export default function ModifyView(userInfo, isAdmin) {
  const {
    values,
    handleChange,
    handleSubmit,
    error,
    isSubmitting
  } = useModifyViewModel(userInfo);

  if (!values.email) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4">
      로그인 정보
      </Typography>
      <div></div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>닉네임</Typography>
            <Input
              name="nickName"
              value={values.nickName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>이메일</Typography>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>비밀번호</Typography>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </Grid>
        
        </Grid>
        
        <Grid container spacing={2} className='배송지 정보' {...(isAdmin && { style: { display: 'none' } })}>
        <Typography variant="h4">
          배송지 정보
      </Typography>
          <Grid item xs={12} >
              <Typography>전화번호</Typography>
              <Input
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>이름</Typography>
              <Input
                name="realName"
                value={values.realName}
                onChange={handleChange}
                readOnly
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>주소</Typography>
              <Input
                name="address"
                value={values.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>상세주소</Typography>
              <Input
                name="detailAddress"
                value={values.detailAddress}
                onChange={handleChange}
              />
            </Grid>
          </Grid> {/* 배송지정보 finish */}
          
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <WhiteButton
              type="submit"
              btnName="수정하기"
              disabled={isSubmitting}
            />
            <BlueButton
              className="delete-button"
              type="button"
              btnName="회원탈퇴"
              onClick={() => <DeleteView />}
            />
          </Grid>
        </Grid> 

      </form>
    </Container>
  );
}