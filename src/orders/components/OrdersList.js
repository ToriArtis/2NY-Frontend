import React from "react";
import { OrdersListViewModel } from "../viewModels/OrdersListViewModel";
import { OrderItem } from "./OrderItem";
import "./css/OrdersListPage.css";

export function OrdersList({ onOrderSelect, isAdmin }) {
    const { orders, error, loading, page, totalPages, setPage, updateOrderStatus } = OrdersListViewModel(isAdmin);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!orders || orders.length === 0) return <div>주문 내역이 없습니다.</div>;

    return (
        <div>
            <div className="orders-list">
                {orders.map(order => (
                    <OrderItem key={order.orderId} order={order} onSelect={() => { onOrderSelect(order.orderId) }}
                        isAdmin={isAdmin} onUpdateOrderStatus={updateOrderStatus} />
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>&lt;</button>
                {[...Array(totalPages).keys()].map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={page === pageNum ? "active" : ""}
                    >
                        {pageNum + 1}
                    </button>
                ))}
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>&gt;</button>
            </div>
        </div>
    );
}