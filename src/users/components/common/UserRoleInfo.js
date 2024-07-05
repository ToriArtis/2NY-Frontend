import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from "@mui/material";
import UserInfo from "./UserInfo";
import OrdersListPage from '../../../component/pages/OrdersListPage';
import UserReviewListPage from '../../../component/pages/UserReviewListPage';

export default function UserRoleInfo() {
    const [activeView, setActiveView] = useState(<UserInfo />);

    useEffect(() => {
        // 컴포넌트 마운트 시 회원정보 뷰를 기본으로 설정
        handleClick("회원정보");
    }, []);

    const handleClick = (viewName) => {
        switch(viewName) {
            case "회원정보":
                setActiveView(<UserInfo />);
                break;
            case "주문내역":
                setActiveView(<OrdersListPage />);
                break;
            case "작성글":
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