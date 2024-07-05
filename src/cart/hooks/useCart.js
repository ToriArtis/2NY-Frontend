import { useState, useEffect } from 'react';
import { list } from '../api/cartApi';

export function useCart(initialPage = 0, initialSize = 6) {
  // 상태 변수들 정의
  const [carts, setCarts] = useState([]);  // 장바구니 아이템 목록
  const [error, setError] = useState(null);  // 에러 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [page, setPage] = useState(initialPage);  // 현재 페이지
  const [size, setSize] = useState(initialSize);  // 페이지 당 아이템 수
  const [totalPages, setTotalPages] = useState(0);  // 총 페이지 수

  // 페이지나 사이즈가 변경될 때마다 장바구니 데이터 fetch
  useEffect(() => {
    fetchCarts();
  }, [page, size]);

  // 장바구니 데이터를 가져오는 함수
  const fetchCarts = async () => {
    try {
      setLoading(true);
      const response = await list(page, size);
      setCarts(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 다음 페이지로 이동하는 함수
  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage(prev => prev + 1);
    }
  };

  // 이전 페이지로 이동하는 함수
  const prevPage = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  // 훅의 반환값
  return {
    carts,
    error,
    loading,
    page,
    totalPages,
    nextPage,
    prevPage,
    refetchCarts: fetchCarts
  };
}