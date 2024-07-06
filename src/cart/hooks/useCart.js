import { useState, useEffect, useCallback } from 'react';
import { list, addToCart, updateCartItemQuantity, removeFromCart } from '../api/cartApi';
import { Cart } from '../models/Carts';

export function useCart() {
  // 상태 변수들
  const [carts, setCarts] = useState([]); // 장바구니 아이템 목록
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [page, setPage] = useState(0); // 현재 페이지
  const [size] = useState(6); // 페이지 당 아이템 수
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  // 장바구니 데이터를 가져오는 함수
  const fetchCarts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await list(page, size);
      if (response && response.content) {
        // 응답 데이터를 Cart 객체로 변환
        setCarts(response.content.map(item => new Cart(
          item.itemCartId,
          item.itemId,
          item.itemTitle,
          item.thumbnail,
          item.quantity,
          item.price,
          item.discountRate
        )));
        setTotalPages(response.totalPages);
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  // 페이지가 변경될 때마다 데이터 fetch
  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  // 다음 페이지로 이동
  const nextPage = useCallback(() => {
    if (page < totalPages - 1) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  // 이전 페이지로 이동
  const prevPage = useCallback(() => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  // 장바구니에 아이템 추가
  const addItemToCart = async (itemId, quantity) => {
    try {
      await addToCart(itemId, quantity);
      await fetchCarts();
    } catch (err) {
      setError(err.message);
    }
  };

  // 장바구니 아이템 수량 업데이트
  const updateItemQuantity = async (itemCartId, upDown) => {
    try {
      await updateCartItemQuantity(itemCartId, upDown);
      await fetchCarts();
    } catch (err) {
      setError(err.message);
    }
  };

  // 장바구니에서 아이템 제거
  const removeItemFromCart = async (itemCartId) => {
    try {
      await removeFromCart(itemCartId);
      await fetchCarts();
    } catch (err) {
      setError(err.message);
    }
  };

  // 훅에서 반환하는 값들
  return {
    carts,
    error,
    loading,
    page,
    totalPages,
    nextPage,
    prevPage,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart
  };
}