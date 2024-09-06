import React from 'react';

export function AdminOrderItem({ order, onUpdateOrderStatus }) {
    if (!order || !order.itemOrders || order.itemOrders.length === 0) {
        return <div className="admin-order-item">주문 정보가 없습니다.</div>;
    }

    const getStatusClass = (status) => {
        switch (status) {
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
            <div className="admin-order-details">
                <div className="admin-order-info">
                    <p>{order.email}</p>
                    <p>{order.name}</p>
                    <p title={`${order.address ?? ''} ${order.detailAddress ?? ''}`}>
                        {order.address} {order.detailAddress}
                    </p>
                    <p>
                        {order.itemOrders[0]?.itemTitle ?? '제품명 없음'}
                        {order.itemOrders.length > 1 ? ` 외 ${(order.itemOrders.length - 1).toLocaleString()}개` : ''}
                    </p>
                    {order.orderStatus !== 'ORDER_CANCEL' &&
                        <div className="admin-order-status">
                            <select className="admin-status-select" value={order.orderStatus} onChange={handleStatusChange}>
                                <option value="ORDER_REQUEST">주문 요청</option>
                                <option value="ORDER_COMPLETE">주문 완료</option>
                            </select>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}