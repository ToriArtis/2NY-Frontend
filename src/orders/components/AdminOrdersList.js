import React from "react";
import { AdminOrderItem } from "./AdminOrderItem";
import { OrdersListViewModel } from "../viewModels/OrdersListViewModel";
import "./css/AdminOrdersListPage.css";

export function AdminOrdersList({ onOrderSelect }) {
    const { orders, error, loading, page, totalPages, setPage, updateOrderStatus } = OrdersListViewModel(true);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!orders || orders.length === 0) return <div>주문 내역이 없습니다.</div>;

    return (
        <div className="admin-orders-list">
            {orders.map(order => (
                <AdminOrderItem 
                    key={order.orderId} 
                    order={order} 
                    onSelect={onOrderSelect}
                    onUpdateOrderStatus={updateOrderStatus} 
                />
            ))}
            <div className="admin-pagination">
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