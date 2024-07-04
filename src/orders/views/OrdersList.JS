import React from "react";
import { OrdersListViewModel } from "../viewModels/OrdersListViewModel";

export default function OrdersList() {
    // OrdersListViewModel에서 orders와 error 상태를 가져옴
    const { orders, error } = OrdersListViewModel();

    // 에러 발생 시 에러 메세지 표시
    if (error) {
        return <div>Error: {error}</div>
    }

    // orders가 없거나 비어있을 경우 메시지 표시
    if (!orders || orders.length === 0) {
        return <div>No orders found.</div>
    }

    // 주문 목록 렌더링
    return (
        <div>
            <h1>주문리스트</h1>
            {/* orders 배열을 매핑하여 각 주문 정보를 렌더링 */}
            {orders.map((order) => (
                // 각 주문 항목을 고유한 key로 구분
                <div key={order.orderId}>
                    <p>orderId : {order.orderId}</p>
                    <p>orderDate : {order.createdAt}</p>
                    <p>orderStatus : {order.orderStatus}</p>
                    <p>totalPrice : {order.totalPrice}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}