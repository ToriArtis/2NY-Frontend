import { useOrders } from '../hooks/useOrders';

export function OrdersListViewModel() {
  const { orders, error, loading, page, totalPages, setPage } = useOrders();

  return {
    orders,
    error,
    loading,
    page,
    totalPages,
    setPage
  };
}