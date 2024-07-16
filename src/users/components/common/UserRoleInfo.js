import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from "@mui/material";
import OrderListPage from '../../../orders/views/OrderListPage';
import UserReviewListPage from '../../../component/pages/UserReviewListPage';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import ModifyView from '../../views/ModifyView';
import OrderDetailPage from '../../../orders/views/OrderDetailPage';

export default function UserRoleInfo() {
    const [activeView, setActiveView] = useState(<UserInfo />);
    const [selectedOrderId, setSelectedOrderId] = useState(null);  
    const [activeButton, setActiveButton] = useState("정보 수정");  

    useEffect(() => {
        handleClick("정보 수정");
    }, []);

    const handleClick = (viewName, orderId) => {
        setActiveButton(viewName);
        switch(viewName) {
            case "정보 수정":
                setActiveView(<UserInfo activeButton={activeButton} />);
                break;
            case "주문 내역":
                setActiveView(<OrderListPage onOrderSelect={handleOrderSelect} activeButton={activeButton} />);
                break;
            case "주문 상세":
                setActiveView(<OrderDetailPage orderId={orderId} activeButton={activeButton} />);
                break;
            case "작성 글":
                setActiveView(<UserReviewListPage activeButton={activeButton} />);
                break;
            default:
                setActiveView(<UserInfo activeButton={activeButton} />);
        }
    };

    const handleOrderSelect = (orderId) => {
        setSelectedOrderId(orderId);
        handleClick("주문 상세", orderId);
    };

    return (
        <Grid container spacing={2} sx={{ marginTop: "8%" }}>
            {/* Left side - 30% */}
            <Grid item xs={12} md={3.6}>
                <Container component="nav">
                    <Button fullWidth onClick={() => handleClick("정보 수정")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "정보 수정" ? "active" : ""}>
                        정보 수정
                    </Button>
                    <Button fullWidth onClick={() => handleClick("주문 내역")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "주문 내역" ? "active" : ""}>
                        주문내역 조회
                    </Button>
                    <Button fullWidth onClick={() => handleClick("작성 글")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "작성 글" ? "active" : ""}>
                        작성글 관리
                    </Button>
                </Container>
            </Grid>

            {/* Right side - 70% */}
            <Grid item xs={12} md={8.4} sx={{ pl: 4 }} className='review'>
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

    useEffect(() => {
        if (localStorage.getItem("PROVIDER")) {
            setIsPasswordVerified(true);
        }
    }, []);
  
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