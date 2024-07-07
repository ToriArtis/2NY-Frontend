import { useOrder } from '../hooks/useOrder';

export function OrderDetailViewModel(orderId) {
  const { order, error, loading, refreshOrder } = useOrder(orderId);

  return {
    order,
    error,
    loading,
    refreshOrder
  };
}