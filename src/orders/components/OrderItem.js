import React from 'react';
import { getImageUrl } from '../../config/app-config';

export function OrderItem({ order, onSelect, isAdmin, onUpdateOrderStatus }) {

  const handleStatusChange = (e) => {
    onUpdateOrderStatus(order.orderId, e.target.value);
  }

   // 날짜
   const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 문자열 반환
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1);
  };

  return (
    <div className="order-item">
      <div className="order-header">
        <span className="order-status">
          {order.orderStatus === 'ORDER_REQUEST' ? '주문 요청' : order.orderStatus === 'ORDER_COMPLETE' ? '주문 완료' : order.orderStatus === 'ORDER_CANCEL' ? '주문 취소' : order.orderStatus}
        </span>
        <button className="order-detail-btn" onClick={() => {onSelect(order.orderId)}}>주문상세 &gt;</button>
      </div>
      <div className="order-products">
        {order.itemOrders.map((item, index) => (
          <div key={index} className="order-product">
            <img src={getImageUrl(item.thumbnail)} alt={item.itemTitle} className="product-image" />
            <div className="order-product-info">
              <p className="order-date">{formatDate(order.createdAt)}</p>
              <h3 className="product-title">{item.itemTitle}</h3>
              <p className="product-details">{item.color}/{item.size}</p>
              <p className="product-price">₩{parseInt(item.price).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-footer">
        {isAdmin && (
          <select value={order.orderStatus} onChange={handleStatusChange}>
            <option value="ORDER_REQUEST">주문 요청</option>
            <option value="ORDER_COMPLETE">주문 완료</option>
          </select>
        )}
      </div>
    </div>
  );
}