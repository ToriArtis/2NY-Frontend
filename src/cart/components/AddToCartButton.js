import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

// 장바구니에 상품 추가 버튼 컴포넌트
export function AddToCartButton({ itemId }) {
    const [quantity, setQuantity] = useState(1);
    const { addItemToCart } = useCart();

    // 장바구니 추가 핸들러
    const handleAddToCart = () => {
        addItemToCart(itemId, quantity);
    };

    return (
        <div>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
            />
            <button onClick={handleAddToCart}>장바구니에 추가</button>
        </div>
    );
}