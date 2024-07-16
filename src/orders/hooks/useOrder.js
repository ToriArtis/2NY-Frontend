import { useState, useEffect, useCallback } from 'react';
import { getOrder } from '../api/ordersApi';
import { Order } from '../models/Orders';

export function useOrder(orderId) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getOrder(orderId);

      if (!data) {
        throw new Error("No data received from API");
      }

      if (!data.itemOrders || !Array.isArray(data.itemOrders)) {
        throw new Error("Invalid order data structure");
      }

      setOrder(new Order(
        data.orderId,
        data.userId,
        data.email,
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

      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred while fetching the order");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const refreshOrder = () => {
    fetchOrder();
  };

  return { order, error, loading, refreshOrder };
}