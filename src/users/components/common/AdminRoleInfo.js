import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from "@mui/material";
import UserReviewListPage from '../../../component/pages/UserReviewListPage';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import ModifyView from '../../views/ModifyView';
import ItemAllListView from '../../../items/views/ItemAllListView';
import ItemCreateView from '../../../items/views/ItemCreateView';
// import OrdersListPage from '../../../orders/views/OrdersListPage';


export default function AdminRoleInfo() {
    const [isPasswordVerified, setIsPasswordVerified] = useState(<UserInfo />);
    const [activeView, setActiveView] = useState(<UserInfo />);

    useEffect(() => {
        handleClick("회원정보");
    }, []);

    const handleClick = (viewName) => {
        switch(viewName) {
            case "회원정보":
                setActiveView(<UserInfo isAdmin />);
                break;
            case "주문 현황":
                setActiveView(<><div>주문 현황</div>
                {/* <OrdersListPage isAdmin={true} /> => 에러 떠러 일단 주석 처리 해놨으요*/}
                </>);
                break;
            case "상품 등록":
                setActiveView(<ItemCreateView isAdmin/>);
                break;
            case "상품 조회":
                setActiveView(<ItemAllListView isAdmin/>);
                break;
            default:
                setActiveView(<UserInfo isAdmin />);
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


function UserInfo({ isAdmin }) {
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
          <ModifyView {...userInfo} isAdmin = {isAdmin} />
        )}
      </Container>
    );
  }