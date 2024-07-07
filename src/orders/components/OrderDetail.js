import React from 'react';
import { OrderDetailViewModel } from '../viewModels/OrderDetailViewModel';
import { Link } from 'react-router-dom';
import '../components/css/OrderDetailPage.css';
import { cancelOrder } from '../api/ordersApi';

export function OrderDetail({ orderId}) {
  const { order, error, loading, refreshOrder } = OrderDetailViewModel(orderId);

  if (loading) return <div className="orderDetail-loading">Loading...</div>;
  if (error) return <div className="orderDetail-error">Error: {error}</div>;
  if (!order) return <div className="orderDetail-notFound">주문을 찾을 수 없습니다.</div>;

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderId);
      alert('주문이 취소되었습니다.');
      refreshOrder();
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('주문 취소 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="orderDetail-container">
      <h2 className="orderDetail-title">주문내역 조회</h2>
      <div className="orderDetail-items">
        <div className="orderDetail-top">
          <p>{order.orderStatus}</p>
          {order.orderStatus !== 'ORDER_CANCEL' && (
            <button onClick={handleCancelOrder} className="orderDetail-cancelButton">주문취소</button>
          )}
        </div>
        {order.itemOrders.map((item, index) => (
          <div key={index} className="orderDetail-item">
            <img className="orderDetail-itemImage" src={item.itemImage} alt={item.itemTitle} />
            <div className="orderDetail-itemInfo">
              <p className="orderDetail-date">{new Date(order.createdAt).toLocaleDateString()}</p>
              <h3 className="orderDetail-itemTitle">{item.itemTitle}</h3>
              <p>{item.color}/{item.size}</p>
              <p className="orderDetail-itemPrice">₩{item.price.toLocaleString()}</p>
            </div>
            <Link to={`/review/create?itemId=${item.itemId}&orderId=${order.orderId}`} className="orderDetail-reviewButton">
            후기작성 &gt;
            </Link>
          </div>
        ))}
      </div>
      <div className="orderDetail-deliveryInfo">
        <h3 className="orderDetail-sectionTitle">배송 정보</h3>
        <p><span className="orderDetail-label">이름</span>{order.name}</p>
        <p><span className="orderDetail-label">전화번호</span>{order.phone}</p>
        <p><span className="orderDetail-label">주소</span>{order.address} {order.detailAddress}</p>
      </div>
      <div className="orderDetail-paymentInfo">
        <h3 className="orderDetail-sectionTitle">최종 결제 정보</h3>
        <p><span className="orderDetail-label">상품금액</span>₩{order.totalPrice.toLocaleString()}</p>
        <p><span className="orderDetail-label">할인</span>-₩{order.totalDiscountPrice.toLocaleString()}</p>
        <p className="orderDetail-total"><span className="orderDetail-label">최종결제금액</span>₩{order.expectPrice.toLocaleString()}</p>
        <p><span className="orderDetail-label">결제 수단</span>{order.paymentMethod || '정보 없음'}</p>
      </div>
    </div>
  );
}