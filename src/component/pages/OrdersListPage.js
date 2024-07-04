import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import { OrdersListViewModel } from "../../orders/viewModels/OrdersListViewModel";
import "../css/OrdersListPage.css";

function OrdersListPage() {

    const { orders, error } = OrdersListViewModel();

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!orders || orders.length === 0) {
        return <div>No orders found.</div>
    }

    return (
        <div className="orders-page">
            <main>
                <h1>(nickName) 님 주문내역 조회</h1>
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.orderId} className="order-item">
                            <div className="order-header">
                                <span>{order.createdAt}</span>
                                <span>상세보기 &gt;</span>
                            </div>
                            {order.itemOrders.map((item, index) => (
                                <div key={index} className="order-product">
                                    <img src={item.itemImage} alt={item.itemTitle} />
                                    <div className="product-info">
                                        <h3>{item.itemTitle}</h3>
                                        <p>₩{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="order-footer">
                                <span>{order.orderStatus}</span>
                                <span>총 주문금액: ₩{order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="pagination">
                    <button>&lt;</button>
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>&gt;</button>
                </div> */}
            </main>
        </div>
    )

}

export default OrdersListPage;