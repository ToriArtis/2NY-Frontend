import React from 'react';
import { OrderDetail } from '../components/OrderDetail';
import '../components/css/OrderDetailPage.css';

function OrderDetailPage() {
  return (
    <div className="order-detail-page">
      <main>
        <OrderDetail />
      </main>
    </div>
  );
}

export default OrderDetailPage;