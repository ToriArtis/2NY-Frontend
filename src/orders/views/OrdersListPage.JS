import React from "react";
import { OrdersListViewModel } from "../viewModels/OrdersListViewModel";
import { OrderItem } from "../components/OrderItem";
import "../css/OrdersListPage.css";

function OrdersListPage() {
    const { orders, error, loading, page, totalPages, setPage } = OrdersListViewModel();
    const nickName = localStorage.getItem("USER_NICKNAME") || '고객';

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!orders || orders.length === 0) return <div>주문 내역이 없습니다.</div>;

    return (
        <div className="orders-page">
            <main>
                <h1>{nickName} 님 주문내역 조회</h1>
                <div className="orders-list">
                    {orders.map(order => (
                        <OrderItem key={order.orderId} order={order} />
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
            </main>
        </div>
    );
}

export default OrdersListPage;