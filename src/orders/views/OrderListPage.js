import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { OrdersList } from "../components/OrdersList";
import "../components/css/OrdersListPage.css";
import { useNavigate } from "react-router-dom";
import { getItem } from '../../users/utils/storage';

function OrdersListPage({ onOrderSelect, }) {
    const [nickName, setNickName] = useState(() => {
        return getItem("USER_NICKNAME") || "";
    });

    return (
        <div className="orders-list-page">
            <Typography variant="h5" gutterBottom>
                <b>{nickName}</b> 님 주문내역 조회
            </Typography>
            <OrdersList onOrderSelect={onOrderSelect} />
        </div>
    );
}

export default OrdersListPage;