import { useState, useEffect } from 'react';
import { list, addToCart, updateCartItemQuantity, removeFromCart } from '../api/cartApi';
import { Cart } from '../models/Carts';

export function useCartsListViewModel() {
  // 상태 변수들 정의
  const [carts, setCarts] = useState([]);  // 장바구니 아이템 목록
  const [error, setError] = useState(null);  // 에러 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [page, setPage] = useState(0);  // 현재 페이지
  const [size, setSize] = useState(6);  // 페이지 당 아이템 수
  const [hasMore, setHasMore] = useState(true);  // 더 불러올 데이터 존재 여부

  // 페이지나 사이즈가 변경될 때마다 장바구니 데이터 fetch
  useEffect(() => {
    fetchCarts();
  }, [page, size]);

  // 장바구니 데이터를 가져오는 함수
  const fetchCarts = async () => {
    try {
      setLoading(true);
      const response = await list(page, size);
      const newCarts = response.content.map(cart => new Cart(cart.cartId, cart.itemId, cart.itemTitle, cart.itemImage, cart.quantity, cart.price, cart.discountRate));
      setCarts(prev => [...prev, ...newCarts]);
      setHasMore(response.totalPages > page + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 더 많은 데이터 로드
  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // 장바구니에 아이템 추가
  const addItemToCart = async (itemId, quantity) => {
    try {
      await addToCart(itemId, quantity);
      fetchCarts();
    } catch (err) {
      setError(err.message);
    }
  };

  // 장바구니 아이템 수량 업데이트
  const updateItemQuantity = async (itemCartId, newQuantity) => {
    try {
      const result = await updateCartItemQuantity(itemCartId, newQuantity);
      console.log('Update result:', result);
      const updatedCarts = carts.map(cart => 
        cart.cartId === itemCartId ? {...cart, quantity: newQuantity} : cart
      );
      setCarts(updatedCarts);
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert("상품 수량 변경에 실패했습니다. 다시 시도해 주세요.");
      setError(err.message);
    }
  };

  // 장바구니에서 아이템 제거
  const removeItemFromCart = async (itemCartId) => {
    try {
      await removeFromCart(itemCartId);
      setCarts(carts.filter(cart => cart.cartId !== itemCartId));
    } catch (err) {
      setError(err.message);
    }
  };

  // 총 가격 계산
  const calculateTotalPrice = () => {
    return carts.reduce((sum, cart) => sum + cart.calculateItemTotalPrice(), 0);
  };

  // 총 할인 금액 계산
  const calculateTotalDiscount = () => {
    return carts.reduce((sum, cart) => sum + cart.calculateItemDiscount(), 0);
  };

  // 최종 가격 계산
  const calculateFinalPrice = () => {
    return calculateTotalPrice() - calculateTotalDiscount();
  };

  // 훅에서 반환하는 값들
  return {
    carts,
    error,
    loading,
    hasMore,
    loadMore,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    calculateTotalPrice,
    calculateTotalDiscount,
    calculateFinalPrice
  };
}