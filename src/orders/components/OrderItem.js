import React from 'react';
import { Link } from 'react-router-dom';

export function OrderItem({ order, onSelect, isAdmin, onCompleteOrder }) {
  return (
    <div className="order-item">
      <div className="order-header">
        <span>{order.orderStatus}</span>
        <button onClick={() => {onSelect(order.orderId)}}>주문상세</button>
        {isAdmin && order.orderStatus !== 'ORDER_COMPLETE' && (<button onClick={() => {onCompleteOrder(order.orderId)}}>현황변경</button>)}
      </div>
      {order.itemOrders.map((item, index) => (
        <div key={index} className="order-product">
          <img src={item.itemImage} alt={item.itemTitle} />
          <div className="product-info">
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            <h3>{item.itemTitle}</h3>
            <p>{item.color}/{item.size}</p>
            <p className="product-price">₩{item.price.toLocaleString()}</p>
          </div>
          {!isAdmin && (<Link to={`/review/create?itemId=${item.itemId}&orderId=${order.orderId}`} className='review'>
            후기작성 &gt;
          </Link>)}
        </div>
      ))}
      <div className="order-footer">
        <span>총 주문금액: ₩{order.expectPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}