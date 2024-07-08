import React from 'react';
import { OrderDetail } from '../components/OrderDetail';
import '../components/css/OrderDetailPage.css';

function OrderDetailPage({ orderId }) {
  return (
    <div className="order-detail-page">
      <main>
        <OrderDetail orderId={orderId} />
      </main>
    </div>
  );
}

export default OrderDetailPage;