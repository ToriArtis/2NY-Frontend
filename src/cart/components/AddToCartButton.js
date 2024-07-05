import React, { useState } from 'react';
import { useCartActions } from '../hooks/useCartActions';

// 장바구니에 상품을 추가하는 버튼 컴포넌트
function AddToCartButton({ itemId }) {
  // 상품 수량 상태 관리
  const [quantity, setQuantity] = useState(1);
  
  // 장바구니 관련 액션 및 상태 가져오기
  const { addItemToCart, loading, error } = useCartActions();

  // 장바구니에 상품 추가 핸들러
  const handleAddToCart = async () => {
    try {
      // 장바구니에 상품 추가 요청
      await addItemToCart(itemId, quantity);
      alert('상품이 장바구니에 추가되었습니다.');
    } catch (err) {
      console.error('장바구니에 추가하는 중 오류 발생:', err);
    }
  };

  return (
    <div>
      {/* 수량 입력 필드 */}
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
      />
      {/* 장바구니 추가 버튼 */}
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? '추가 중...' : '장바구니에 추가'}
      </button>
      {/* 에러 메시지 표시 */}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default AddToCartButton;