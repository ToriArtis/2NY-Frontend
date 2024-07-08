import React from 'react';
import { Link } from 'react-router-dom';

export function OrderItem({ order, onSelect, isAdmin, onCompleteOrder }) {

  const handleCompleteOrder = async () => {
    try {
      await onCompleteOrder(order.orderId);
    } catch (error) {
      console.error("주문 상태 변경 중 오류 발생:", error);
    }
  };

  return (
    <div className="order-item">
      <div className="order-header">
        <span className="order-status">{order.orderStatus}</span>
        <button className="order-detail-btn" onClick={() => {onSelect(order.orderId)}}>주문상세 &gt;</button>
      </div>
      <div className="order-products">
        {order.itemOrders.map((item, index) => (
          <div key={index} className="order-product">
            <img src={item.itemImage} alt={item.itemTitle} className="product-image" />
            <div className="product-info">
              <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
              <h3 className="product-title">{item.itemTitle}</h3>
              <p className="product-details">{item.color}/{item.size}</p>
              <p className="product-price">₩{item.price.toLocaleString()}</p>
            </div>
            {!isAdmin && (
              <Link to={`/review/create?itemId=${item.itemId}&orderId=${order.orderId}`} className='review-link'>
                후기작성 &gt;
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="order-footer">
        <span className="total-price">총 주문금액 ₩{order.expectPrice.toLocaleString()}</span>
        {isAdmin && order.orderStatus !== 'ORDER_COMPLETE' && (
          <button className="change-status-btn" onClick={handleCompleteOrder}>현황변경</button>
        )}
      </div>
    </div>
  );
}