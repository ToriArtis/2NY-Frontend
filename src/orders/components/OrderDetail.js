import React from 'react';
import { OrderDetailViewModel } from '../viewModels/OrderDetailViewModel';
import { Link } from 'react-router-dom';
import '../components/css/OrderDetailPage.css';
import { cancelOrder } from '../api/ordersApi';
import { getImageUrl } from '../../config/app-config';

export function OrderDetail({ orderId }) {
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
      alert('주문 취소 중 오류가 발생했습니다.');
    }
  };

  // 날짜
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 문자열 반환
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1);
  };

  return (
    <div className="orderDetail-container">
      <h2 className="orderDetail-title">주문내역 조회</h2>
      <div className="orderDetail-items">
        <div className="orderDetail-top">
          {order.orderStatus === 'ORDER_REQUEST' ? '주문 요청' : order.orderStatus === 'ORDER_COMPLETE' ? '주문 완료' : order.orderStatus === 'ORDER_CANCEL' ? '주문 취소' : order.orderStatus}
          {order.orderStatus !== 'ORDER_CANCEL' && order.orderStatus !== 'ORDER_COMPLETE' && (
            <button onClick={handleCancelOrder} className="orderDetail-cancelButton">주문취소</button>
          )}
        </div> 
        {order?.itemOrders?.length > 0 ? (
          order.itemOrders.map((item, index) => (
            <div key={index} className="orderDetail-item">
              <img className="orderDetail-itemImage" src={getImageUrl(item.thumbnail)} alt={item.itemTitle} />
              <div className="orderDetail-itemInfo">
                <p className="orderDetail-date">{formatDate(order.createdAt)}</p>
                <h3>{item.itemTitle}</h3>
                <p>{item.color}/{item.size}</p>
                <p className="orderDetail-itemPrice">₩{item.price.toLocaleString()}</p>
              </div>
              {order.orderStatus !== 'ORDER_CANCEL' && order.orderStatus !== 'ORDER_REQUEST' && (
                <Link to={`/review/create?itemId=${order.itemOrders[0].itemId}&userId=${order.userId}`} className="orderDetail-reviewButton">
                  후기작성 &gt;
                </Link>
              )}
            </div>
          ))
        ) : (
          null
        )}
      </div>
      <div className="orderDetail-deliveryInfo">
        <h3 className="orderDetail-sectionTitle">배송 정보</h3>
        <p><span className="orderDetail-label">이름</span>{order.name}</p>
        <p><span className="orderDetail-label">전화번호</span>{order.phone}</p>
        <p><span className="orderDetail-label">주소</span>{order.address} {order.detailAddress}</p>
      </div>
      <div className="orderDetail-paymentInfo">
        <h3 className="orderDetail-sectionTitle">최종 결제 정보</h3>
        <p><span className="orderDetail-label">상품금액</span>₩{parseInt(order.totalPrice).toLocaleString()}</p>
        <p><span className="orderDetail-label">할인</span>-₩{parseInt(order.totalDiscountPrice).toLocaleString()}</p>
        <p className="orderDetail-total"><span className="orderDetail-label">최종결제금액</span>₩{parseInt(order.expectPrice).toLocaleString()}</p>
        <p><span className="orderDetail-label">결제 수단</span>{order.paymentMethod || '정보 없음'}</p>
      </div>
    </div>
  );
}