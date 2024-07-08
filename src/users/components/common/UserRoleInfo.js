import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from "@mui/material";
// import OrdersListPage from '../../../orders/views/OrdersListPage';
import UserReviewListPage from '../../../component/pages/UserReviewListPage';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import ModifyView from '../../views/ModifyView';
import OrderDetailPage from '../../../orders/views/OrderDetailPage';

export default function UserRoleInfo() {
    const [activeView, setActiveView] = useState(<UserInfo />);
    const [selectedOrderId, setSelectedOrderId] = useState(null);    

    useEffect(() => {
        // 컴포넌트 마운트 시 회원정보 뷰를 기본으로 설정
        handleClick("회원정보");
    }, []);

    const handleClick = (viewName, orderId) => {
        switch(viewName) {
            case "회원정보":
                setActiveView(<UserInfo />);
                break;
            case "주문내역":
                setActiveView(
                    <div>주문내역</div>
                // <OrdersListPage onOrderSelect={handleOrderSelect}/>
            
            );
                break;
            case "주문상세":
                console.log("Setting active view to OrderDetailPage for orderId:", orderId);
                setActiveView(<OrderDetailPage orderId={orderId} />);
                break;
            case "작성글":
                setActiveView(<UserReviewListPage />);
                break;
            default:
                setActiveView(<UserInfo />);
        }
    };

    const handleOrderSelect = (orderId) => {
        console.log("Selected orderId:", orderId);
        setSelectedOrderId(orderId);
        handleClick("주문상세", orderId);
    };

    return (
        <Grid container spacing={2} sx={{ marginTop: "8%" }}>
            {/* Left side - 30% */}
            <Grid item xs={12} md={3.6}>
                <Container component="nav">
                    <Button fullWidth onClick={() => handleClick("회원정보")} sx={{ justifyContent: "flex-start", mb: 1 }}>
                        회원정보
                    </Button>
                    <Button fullWidth onClick={() => handleClick("주문내역")} sx={{ justifyContent: "flex-start", mb: 1 }}>
                        주문내역 조회
                    </Button>
                    <Button fullWidth onClick={() => handleClick("작성글")} sx={{ justifyContent: "flex-start", mb: 1 }}>
                        작성글 관리
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