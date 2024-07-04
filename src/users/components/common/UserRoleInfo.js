import React, { useState } from 'react';
import { Container, Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserInfoView from "../../views/UserInfoView";

export default function UserRoleInfo() {
    const [activeView, setActiveView] = useState(null);
    const navigate = useNavigate();

    const handleClick = (viewName) => {
        switch(viewName) {
            case "회원정보":
                setActiveView(<UserInfoView />);
                break;
            case "주문내역":
                setActiveView(<Typography>주문내역 내용이 여기에 표시됩니다.</Typography>);
                break;
            case "작성글":
                setActiveView(<Typography>작성글 내용이 여기에 표시됩니다.</Typography>);
                break;
            default:
                setActiveView(null);
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