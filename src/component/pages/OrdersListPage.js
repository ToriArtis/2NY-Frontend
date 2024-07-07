import React from "react";
import { OrdersList } from "../../orders/components/OrdersList";
import "../css/OrdersListPage.css";

function OrdersListPage() {
    const nickName = localStorage.getItem("USER_NICKNAME") || '고객';

    return (
        <div className="orders-page">
            <main>
                <h1>{nickName} 님 주문내역 조회</h1>
                <OrdersList />
            </main>
        </div>
    );
}

export default OrdersListPage;