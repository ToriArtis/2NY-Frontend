import React, { useState } from 'react';
import { OrderDetail } from '../components/OrderDetail';
import '../components/css/OrderDetailPage.css';
import CreateReviewView from '../../review/views/CreateReviewView';

function OrderDetailPage({ orderId }) {
  const [showReview, setShowReview] = useState(false);
  const [reviewItemId, setReviewItemId] = useState(null);
  const [reviewUserId, setReviewUserId] = useState(null);
  const [reviewOrderId, setReviewOrderId] = useState(null);


  const handleReviewClick = (itemId, userId, orderId) => {
    setReviewItemId(itemId);
    setReviewUserId(userId);
    setReviewOrderId(orderId);
    setShowReview(true);
  };
  
  return (
    <div className="order-detail-page">
      <main>
      {!showReview ? (
          <OrderDetail orderId={orderId} onReviewClick={handleReviewClick} />
        ) : (
          <CreateReviewView 
            itemId={reviewItemId} 
            userId={reviewUserId} 
            orderId={reviewOrderId}
            onCancel={() => setShowReview(false)} 
          />
        )}
      </main>
    </div>
  );
}

export default OrderDetailPage;