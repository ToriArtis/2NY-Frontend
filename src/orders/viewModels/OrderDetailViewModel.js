import { useOrder } from '../hooks/useOrder';

export function OrderDetailViewModel(orderId) {
  const { order, error, loading } = useOrder(orderId);

  return {
    order,
    error,
    loading
  };
}