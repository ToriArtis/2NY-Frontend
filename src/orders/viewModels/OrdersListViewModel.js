import { useState, useEffect } from 'react';
import { list, getAllOrders, updateOrderStatus as updateOrderStatusApi } from '../api/ordersApi';

export function OrdersListViewModel(isAdmin = false) {
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

  const updateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatusApi(orderId, status);
      await fetchOrders();
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  return {
    orders,
    error,
    loading,
    page,
    totalPages,
    setPage,
    updateOrderStatus
  };
}