import { useState, useEffect } from 'react';
import { getOrder } from '../api/ordersApi';
import { Order } from '../models/Orders';

export function useOrder(orderId) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrder(orderId);
        setOrder(new Order(
          data.orderId,
          data.userId,
          data.name,
          data.address,
          data.detailAddress,
          data.phone,
          data.orderStatus,
          data.totalItems,
          data.totalPrice,
          data.totalDiscountPrice,
          data.expectPrice,
          data.itemOrders,
          data.createdAt,
          data.updatedAt
        ));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  return { order, error, loading };
}