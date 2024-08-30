import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from "@mui/material";
import UserReviewListPage from '../../../component/pages/UserReviewListPage';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import ModifyView from '../../views/ModifyView';
import UserListView from '../../views/UserListView';
import MypageItemCreateView from '../../../items/views/MypageItemCreateView';
import ItemCreateView from '../../../items/views/ItemCreateView';

import OrderListPage from '../../../orders/views/OrderListPage';
import AdminOrdersListPage from '../../../orders/views/AdminOrdersListPage';
import Dashboard from '../../../component/Dashboard';


export default function AdminRoleInfo() {
    const [isPasswordVerified, setIsPasswordVerified] = useState(<UserInfo />);
    const [activeView, setActiveView] = useState(<UserInfo />);
    const [activeButton, setActiveButton] = useState("정보 수정");

    useEffect(() => {
        handleClick("정보 수정");
    }, []);

    const handleClick = (viewName) => {
        setActiveButton(viewName);
        switch (viewName) {
            case "정보 수정":
                setActiveView(<UserInfo isAdmin activeButton={activeButton} />);
                break;
            case "주문 현황":
                setActiveView(<AdminOrdersListPage isAdmin={true} activeButton={activeButton} />);
                break;
            case "상품 등록":
                setActiveView(<ItemCreateView isAdmin activeButton={activeButton} />);
                break;
            case "상품 조회":
                setActiveView(<MypageItemCreateView isAdmin activeButton={activeButton} />);
                break;
            case "수익 관리":
                setActiveView(<Dashboard isAdmin activeButton={activeButton} />);
                break;
            case "사용자 목록":
                setActiveView(<UserListView  isAdmin activeButton={activeButton} />);
                break;
            default:
                setActiveView(<UserInfo isAdmin activeButton={activeButton} />);
        }
    };

    return (
        <Grid container spacing={2} sx={{ marginTop: "8%" }}>
            {/* Left side - 30% */}
            <Grid item xs={12} md={3.6}>
                <Container component="nav">
                    <Button fullWidth onClick={() => handleClick("정보 수정")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "정보 수정" ? "active" : ""}>
                        정보 수정
                    </Button>
                    <Button fullWidth onClick={() => handleClick("주문 현황")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "주문 현황" ? "active" : ""}>
                        주문 현황
                    </Button>
                    <Button fullWidth onClick={() => handleClick("상품 등록")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "상품 등록" ? "active" : ""}>
                        상품 등록
                    </Button>
                    <Button fullWidth onClick={() => handleClick("상품 조회")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "상품 조회" ? "active" : ""}>
                        상품 조회
                    </Button>
                    <Button fullWidth onClick={() => handleClick("수익 관리")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "수익 관리" ? "active" : ""}>
                        수익 관리
                    </Button>
                    <Button fullWidth onClick={() => handleClick("사용자 목록")} sx={{ justifyContent: "flex-start", mb: 1 }} className={activeButton === "수익 관리" ? "active" : ""}>
                        사용자 목록
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
                <ModifyView {...userInfo} isAdmin={isAdmin} />
            )}
        </Container>
    );
}