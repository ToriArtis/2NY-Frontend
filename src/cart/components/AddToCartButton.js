import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

export function AddToCartButton({ itemId }) {
    const [quantity, setQuantity] = useState(1);
    const { addItemToCart } = useCart();

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