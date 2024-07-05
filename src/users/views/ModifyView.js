import React from 'react';
import { TextField, Button, Grid, Typography, Container, CircularProgress } from '@mui/material';
import { useModifyViewModel } from '../viewModels/useModifyViewModel';
import Input from '../components/common/Input';

export default function ModifyView({ ...initialValues }) {
  const {
    email,
    password,
    realName,
    nickName,
    address,
    detailAddress,
    phone,
    handleChange,
    handleSubmit,
    error,
    isSubmitting
  } = useModifyViewModel();

  return (
    <Container>
      <Typography variant="h4">
        사용자 정보 수정
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography style={{ display: 'inline' }}>이메일</Typography>
            <Input
              name="email"
              value={initialValues.email}
              onChange={handleChange}
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ display: 'inline' }}>비밀번호</Typography>
            <Input
                style={{ display: 'inline' }}
              fullWidth
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ display: 'inline' }}>모든 이름</Typography>
            <Input
              name="realName"
              value={initialValues.realName}
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ display: 'inline' }}>닉네임</Typography>
            <Input
              name="nickName"
              value={initialValues.nickName}
              onclick={(e)=>{
                alert("아직 개발중입니다.");
              }}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ display: 'inline' }}>주소</Typography>
            <Input
              name="address"
              value={initialValues.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ display: 'inline' }}>상세주소</Typography>
            <Input
              fullWidth
              name="detailAddress"
              value={initialValues.detailAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ display: 'inline' }}>phone</Typography>
            <Input
              fullWidth
              name="phone"
              value={initialValues.phone}
              onChange={handleChange}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : '수정하기'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}