import { useOrders } from '../hooks/useOrders';

export function OrdersListViewModel(isAdmin = false) {
  const { orders, error, loading, page, totalPages, setPage, completeOrder } = useOrders();

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