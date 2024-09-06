import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminOrdersList } from "../components/AdminOrdersList";
import "../components/css/AdminOrdersListPage.css";
import { getItem } from "../../users/utils/storage";

function AdminOrdersListPage({ onOrderSelect }) {
    const navigate = useNavigate();

    useEffect(() => {
        const userRoles = getItem("USER_ROLESET");
        if (!(userRoles && userRoles.includes("ADMIN"))) {
            alert("관리자 권한이 필요합니다.");
            navigate("/");
        }

    }, [navigate]);

    return (
        <div className="admin-orders-page">
            <h1 className="admin-orders-title">주문 현황 관리</h1>
            <AdminOrdersList onOrderSelect={onOrderSelect} />
        </div>
    );
}

export default AdminOrdersListPage;