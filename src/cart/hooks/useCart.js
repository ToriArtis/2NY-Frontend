import { useState, useEffect, useCallback } from 'react';
import { list, addToCart, updateCartItemQuantity, removeFromCart, clearCart } from '../api/cartApi';
import { Cart } from '../models/Carts';

// 장바구니 관련 커스텀 훅
export function useCart() {
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const size = 6;

  // 장바구니 데이터를 가져오는 함수
  const fetchCarts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await list(page, size);
      if (response && Array.isArray(response.content)) {
        const newCarts = response.content.map(item => new Cart(
          item.itemCartId, item.itemId, item.itemTitle, item.thumbnail,
          item.quantity, item.price, item.discountRate
        ));
        setCarts(prevCarts => page === 0 ? newCarts : ([...prevCarts, ...newCarts]));
        setHasMore(response.content.length === size && !response.last);
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, size, loading]);

  // 더 많은 장바구니 아이템을 로드하는 함수
  const loadMoreCarts = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, hasMore]);

  // 페이지가 변경될 때마다 장바구니 데이터 fetch
  useEffect(() => {
    fetchCarts();
  }, [page]);

  // 장바구니에 아이템 추가
  const addItemToCart = async (itemId, quantity) => {
    try {
      await addToCart(itemId, quantity);
      setPage(0);
      setCarts([]);
      fetchCarts();
    } catch (err) {
      setError(err.message);
    }
  };

  // 장바구니 아이템 수량 업데이트
  const updateItemQuantity = async (itemCartId, upDown) => {
    try {
      setLoading(true);
      const updatedItem = await updateCartItemQuantity(itemCartId, upDown);
      setCarts(prevCarts => prevCarts.map(cart =>
        cart.itemCartId === itemCartId
          ? new Cart(cart.itemCartId, cart.itemId, cart.itemTitle, cart.thumbnail,
            updatedItem.quantity, cart.price, cart.discountRate)
          : cart
      ));
    } catch (err) {
      console.error('수량 업데이트 중 오류가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  // 장바구니에서 아이템 제거
  const removeItemFromCart = async (itemCartId) => {
    try {
      setLoading(true);
      const result = await removeFromCart(itemCartId);
      if (result) {
        setCarts(prevCarts => {
          const newCarts = prevCarts.filter(cart => cart.itemCartId !== itemCartId);
          if (newCarts.length < size && page > 0) {
            setPage(prevPage => prevPage - 1);
            fetchCarts();
          } else {
            setHasMore(newCarts.length === size);
          }
          return newCarts;
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  // 장바구니 비우기
  const clearAllItems = useCallback(async () => {
    try {
      await clearCart();
      setCarts([]);
      setPage(0);
      setHasMore(true);
    } catch (err) {
      console.error('빠른 장바구니 비우기 중 오류가 발생했습니다:', error);
      setError(err.message || 'Failed to clear cart');
    }
  }, []);

  return {
    carts,
    error,
    loading,
    hasMore,
    loadMoreCarts,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearAllItems
  };
}