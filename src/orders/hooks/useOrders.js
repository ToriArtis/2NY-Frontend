import { useState, useEffect } from 'react';
import { list, getAllOrders, completeOrder as completeOrderApi } from '../api/ordersApi';

export function useOrders(isAdmin = false) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 6;

  useEffect(() => {
    fetchOrders();
  }, [page, isAdmin]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = isAdmin ? await getAllOrders(page, size) : await list(page, size);
      setOrders(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const completeOrder = async (orderId) => {
    try {
        await completeOrderApi(orderId);
        fetchOrders();
    } catch (err) {
        setError(err.message);
    }
  };  

  return {
    orders,
    error,
    loading,
    page,
    totalPages,
    setPage,
    completeOrder
  };
}