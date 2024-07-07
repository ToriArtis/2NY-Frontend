import { useState } from 'react';
import { addToCart, updateCartItemQuantity, removeFromCart } from '../api/cartApi';

export function useCartActions() {
  // 로딩 상태와 에러 상태를 관리하는 state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 장바구니에 아이템 추가하는 함수
  const addItemToCart = async (itemId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addToCart(itemId, quantity);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 장바구니 아이템 수량 업데이트 함수
  const updateItemQuantity = async (itemCartId, upDown) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateCartItemQuantity(itemCartId, upDown);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 장바구니에서 아이템 제거하는 함수
  const removeItemFromCart = async (itemCartId) => {
    setLoading(true);
    setError(null);
    try {
      await removeFromCart(itemCartId);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 훅에서 반환하는 값들
  return {
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    loading,
    error
  };
}