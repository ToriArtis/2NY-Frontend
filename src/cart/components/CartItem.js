import React from "react";

// 개별 장바구니 아이템 컴포넌트
export function CartItem({ cart, onUpdateQuantity, onRemoveItem }) {
    return (
        <div className="cart-item">
            <div className="cart-product">
                <img src={cart.thumbnail[0]} alt={cart.itemTitle} />
                <div className="product-info">
                    <h3>{cart.itemTitle}</h3>
                    <p>₩{cart.price.toLocaleString()}</p>
                    <div className="quantity-control">
                        <button onClick={() => onUpdateQuantity(cart.itemCartId, -1)}>-</button>
                        <span>{cart.quantity}</span>
                        <button onClick={() => onUpdateQuantity(cart.itemCartId, 1)}>+</button>
                    </div>
                </div>
            </div>
            <button className="remove-item" onClick={() => onRemoveItem(cart.itemCartId)}>삭제</button>
        </div>
    );
}