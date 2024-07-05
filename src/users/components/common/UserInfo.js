import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BlueButton from '../../../component/BlueButton';
import WhiteButton from '../../../component/WhiteButton';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import DeleteView from '../../views/DeleteView';
import ModifyView from '../../views/ModifyView';


export default function UserInfo() {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [activeView, setActiveView] = useState('info');
  const { ...userInfo } = useInfoViewModel();

  const handlePasswordVerification = (isValid) => {
    setIsPasswordVerified(isValid);
    if (isValid) {
      setActiveView('edit');
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
          <PasswordVaild onVerify={handlePasswordVerification} />
        ) : (
          <>
            {activeView === 'delete' && (
              <DeleteView />
            )}
            {activeView === 'edit' && (
              <>
              <ModifyView {...userInfo} />
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
                  onClick={() => handleClick('delete')}
                />
              </Container>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}