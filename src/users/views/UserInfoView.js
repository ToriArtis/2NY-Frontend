
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BlueButton from '../../component/BlueButton';
import WhiteButton from '../../component/WhiteButton';
import useInfoViewModel from '../viewModels/useInfoViewModel';


function InfoView({...userInfo}) {
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

function EditView({...userInfo}) {
  return (
    <Typography>수정 폼이 여기에 표시됩니다.</Typography>
  );
}

export default function UserInfoView() {
  const [activeView, setActiveView] = useState('info');

  const { ...userInfo } = useInfoViewModel();

  const handleClick = (viewName) => {
    setActiveView(viewName);
  };

  return (
    <>
      <Container>
        {activeView === 'info' && <InfoView {...userInfo} />}
        {activeView === 'edit' && <EditView {...userInfo} />}
        {activeView === 'delete' && <Typography>회원 탈퇴 확인 메시지가 여기에 표시됩니다.</Typography>}
      </Container>
      <Container className='right-btn'>
        {activeView === 'info'?
        (<>
        <WhiteButton className="modify-button" type="button" btnName="수정" onClick={() => handleClick('edit')} />
        <BlueButton className="delete-button" type="button" btnName="회원탈퇴" onClick={() => handleClick('delete')} />
        </>)
        : <BlueButton className="delete-button"
        type="button"
        btnName="확인"
        onClick={() => handleClick('edit')}/>
        
      }
        
      </Container>
    </>
  );
}