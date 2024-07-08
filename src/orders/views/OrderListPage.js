import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { OrdersList } from "../components/OrdersList";
import "../components/css/OrdersListPage.css";
import { useNavigate } from "react-router-dom";

function OrdersListPage({ onOrderSelect, isAdmin = false }) {
    const [nickName, setNickName] = useState(() => {
        return localStorage.getItem("UESR_NICKNAME") || "";
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userRoles = localStorage.getItem("USER_ROLESET");
        if (isAdmin && !(userRoles && userRoles.includes("ADMIN"))) {
            alert("관리자 권한이 필요합니다. ");
            navigate("/");
        }
    }, [isAdmin, navigate]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    {isAdmin ? "주문현황" : <><b>{nickName}</b> 님 주문내역 조회</>}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <OrdersList onOrderSelect={onOrderSelect} isAdmin={isAdmin} />
            </Grid>
        </Grid>
    );
}

export default OrdersListPage;