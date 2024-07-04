
import React from 'react';
import { Grid, Typography } from '@mui/material';
import BlueButton from '../../component/BlueButton';
import WhiteButton from '../../component/WhiteButton';
import useUserInfoViewModel from '../../users/viewModels/userInfoViewModel';

export default function UserInfoView() {
  const { email, password, realName, nickName, address, detailAddress, phone, error } = useUserInfoViewModel();

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    <>
        <Typography component="h1" variant="h5" gutterBottom>
          로그인 정보
        </Typography>

        
        <div>
            <h1>User Information</h1>
            <p>Email: {email}</p>
            <p>Real Name: {realName}</p>
            <p>Nick Name: {nickName}</p>
            <p>Address: {address}</p>
            <p>Detail Address: {detailAddress}</p>
            <p>Phone: {phone}</p>
        </div>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <WhiteButton
                className="reset-button"
                type="reset"
                btnName="취소"
                onClick={() => window.history.back()}
              />
              <BlueButton
                className="signup-button"
                type="submit"
                btnName="회원가입"
              />
            </Grid>

            </>
  );
}