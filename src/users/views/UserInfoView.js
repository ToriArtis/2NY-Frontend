import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BlueButton from '../../component/BlueButton';
import WhiteButton from '../../component/WhiteButton';
import useInfoViewModel from '../viewModels/useInfoViewModel';
import { deleteUser, verifyPassword } from '../api/userApi';
import Input from '../components/common/Input';

function InfoView({ ...userInfo }) {
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

function EditView({ ...userInfo }) {
  return <Typography>수정 폼이 여기에 표시됩니다.</Typography>;
}


function Password({ onVerify }) {
  const [password, setPassword] = useState('');
  const email = localStorage.getItem("UESR_EMAIL");
  const passwordVaild = {
    email: email,
    password: password
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = await verifyPassword(passwordVaild);
      onVerify(isValid);
    } catch (error) {
      console.error('Error during password verification:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        id="email"
        value={email}
        readOnly
      />
      <Input
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <WhiteButton className="button" type="submit" btnName="확인" />
    </form>
  );
}
export default function UserInfoView() {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [activeView, setActiveView] = useState('info');
  const { ...userInfo } = useInfoViewModel();

  const handlePasswordVerification = (isValid) => {
    setIsPasswordVerified(isValid);
    if (isValid) {
      setActiveView('info');
    }
  };

  const handleClick = (viewName) => {
    if (viewName === 'edit') {
      setActiveView('edit');
    } else if (viewName === 'delete') {
      setActiveView('delete');
    }
  };

  return (
    <>
      <Container>
        {!isPasswordVerified ? (
          <Password onVerify={handlePasswordVerification} />
        ) : (
          <>
            {activeView === 'info' && <InfoView {...userInfo} />}
            {activeView === 'edit' && <EditView {...userInfo} />}
            {activeView === 'delete' && (
              <>
                <InfoView {...userInfo} />
                <Typography>회원 탈퇴 확인 메시지가 여기에 표시됩니다.</Typography>
              </>
            )}
            {activeView === 'info' && (
              <Container className="right-btn">
                <WhiteButton
                  className="modify-button"
                  type="button"
                  btnName="수정"
                  onClick={() => handleClick('edit')}
                />
                <BlueButton
                  className="delete-button"
                  type="button"
                  btnName="회원탈퇴"
                  onClick={() => deleteUser()}
                />
              </Container>
            )}
          </>
        )}
      </Container>
    </>
  );
}