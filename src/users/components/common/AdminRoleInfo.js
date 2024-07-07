import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from "@mui/material";
import OrdersListPage from '../../../component/pages/OrdersListPage';
import UserReviewListPage from '../../../component/pages/UserReviewListPage';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import ModifyView from '../../views/ModifyView';


export default function AdminRoleInfo() {
    const [isPasswordVerified, setIsPasswordVerified] = useState(<UserInfo />);
    
    useEffect(() => {
        handleClick("회원정보");
    }, []);

    const handleClick = (viewName) => {
        switch(viewName) {
            case "회원정보":
                setActiveView(<UserInfo />);
                break;
            case "주문 현황":
                setActiveView(<OrdersListPage />);
                break;
            case "상품 등록":
                setActiveView(<UserReviewListPage />);
                break;
            case "상품 조회":
                setActiveView(<UserReviewListPage />);
                break;
            default:
                setActiveView(<UserInfo />);
        }
    };

    return (
        <Grid container spacing={2} sx={{ marginTop: "8%" }}>
            {/* Left side - 30% */}
            <Grid item xs={12} md={3.6}>
                <Container component="nav">
                    <Button fullWidth onClick={() => handleClick("회원정보")} sx={{ justifyContent: "flex-start", mb: 1 }}>
                        회원정보
                    </Button>
                    <Button fullWidth onClick={() => handleClick("주문 현황")} sx={{ justifyContent: "flex-start", mb: 1 }}>
                        주문 현황
                    </Button>
                    <Button fullWidth onClick={() => handleClick("상품 등록")} sx={{ justifyContent: "flex-start", mb: 1 }}>
                        상품 등록
                    </Button>
                    <Button fullWidth onClick={() => handleClick("상품 조회")} sx={{ justifyContent: "flex-start", mb: 1 }}>
                        상품 조회
                    </Button>
                </Container>
            </Grid>

            {/* Right side - 70% */}
            <Grid item xs={12} md={8.4} sx={{ pl: 4 }}>
                {activeView}
            </Grid>
        </Grid>
    );
}


function UserInfo() {
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const userInfo = useInfoViewModel();
  
    const handlePasswordVerification = (isValid) => {
      setIsPasswordVerified(isValid);
    };
  
    return (
      <Container>
        {!isPasswordVerified ? (
          <PasswordVaild onVerify={handlePasswordVerification} />
        ) : (
          <ModifyView {...userInfo} />
        )}
      </Container>
    );
  }