import React from 'react';

export function AdminOrderItem({ order, onUpdateOrderStatus }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    const getStatusClass = (status) => {
        switch(status) {
            case 'ORDER_REQUEST': return 'status-request';
            case 'ORDER_COMPLETE': return 'status-complete';
            case 'ORDER_CANCEL': return 'status-cancel';
            default: return '';
        }
    };

    const handleStatusChange = (e) => {
        if (order.orderStatus !== 'ORDER_CANCEL') {
            onUpdateOrderStatus(order.orderId, e.target.value);
        }
    }

    return (
        <div className="admin-order-item">
        <div className="admin-order-header">
            <span className={`admin-order-status ${getStatusClass(order.orderStatus)}`}>
            {order.orderStatus === 'ORDER_REQUEST' ? '주문 요청' : 
            order.orderStatus === 'ORDER_COMPLETE' ? '주문 완료' : 
            order.orderStatus === 'ORDER_CANCEL' ? '주문 취소' : order.orderStatus}
            </span>
            <span>{formatDate(order.createdAt)}</span>
        </div>
        <div className="admin-order-details">
            <div className="admin-order-info">
            <p>주문번호: {order.orderId}</p>
            <p>이름: {order.name}</p>
            <p>주소 : {order.address}</p>
            <p>주문개수 :{order.itemOrders.length}</p>
            {/* <p>총 주문금액: ₩{parseInt(order.expectPrice).toLocaleString()}</p> */}
            </div>
            <div className="admin-order-actions">

            {order.orderStatus !== 'ORDER_CANCEL' && <select className="admin-status-select" value={order.orderStatus} onChange={handleStatusChange}>
                <option value="ORDER_REQUEST">주문 요청</option>
                <option value="ORDER_COMPLETE">주문 완료</option>
            </select>}
            
            </div>
        </div>
        </div>
    );
}