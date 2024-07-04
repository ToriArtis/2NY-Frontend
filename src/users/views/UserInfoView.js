
import React from 'react';
import { Grid, Typography } from '@mui/material';
import BlueButton from '../../component/BlueButton';
import WhiteButton from '../../component/WhiteButton';

export default function UserInfoView() {

  return (
    <>
        <Typography component="h1" variant="h5" gutterBottom>
          로그인 정보
        </Typography>
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