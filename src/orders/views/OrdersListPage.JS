import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { OrdersList } from "../components/OrdersList";
import "../components/css/OrdersListPage.css";

function OrdersListPage({ onOrderSelect }) {
    console.log("onOrderSelect in OrdersListPage:", onOrderSelect);
    const [nickName, setNickName] = useState(() => {
        return localStorage.getItem("UESR_NICKNAME") || "";
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    <b>{nickName}</b> 님 주문내역 조회
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <OrdersList onOrderSelect={onOrderSelect} />
            </Grid>
        </Grid>
    );
}

export default OrdersListPage;