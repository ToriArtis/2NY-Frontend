import { Grid, Typography } from "@mui/material";


export default function ModifyView({ ...userInfo }) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              <b>기본 정보</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>Email: {userInfo.email || 'N/A'}</p>
            <p>Real Name: {userInfo.realName || 'N/A'}</p>
            <p>Nick Name: {userInfo.nickName || 'N/A'}</p>
          </Grid>
        </Grid>
  
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              <b>추가 정보</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>Address: {userInfo.address || 'N/A'}</p>
            <p>Detail Address: {userInfo.detailAddress || 'N/A'}</p>
            <p>Phone: {userInfo.phone || 'N/A'}</p>
          </Grid>
        </Grid>
      </>
    );
  }
 ; 