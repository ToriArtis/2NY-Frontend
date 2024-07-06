import React from "react";

// CartItem 컴포넌트: 개별 장바구니 아이템을 렌더링합니다.
export function CartItem({ cart, onUpdateQuantity, onRemoveItem }) {
    return (
        <div className="cart-item">
            <div className="cart-product">
                {/* 상품 이미지 */}
                <img src={cart.thumbnail[0]} alt={cart.itemTitle} />
                <div className="product-info">
                    {/* 상품 제목 */}
                    <h3>{cart.itemTitle}</h3>
                    {/* 상품 가격 */}
                    <p>₩{cart.price.toLocaleString()}</p>
                    {/* 수량 조절 컨트롤 */}
                    <div className="quantity-control">
                        {/* 수량 감소 버튼 */}
                        <button onClick={() => onUpdateQuantity(cart.itemCartId, -1)}>-</button>
                        {/* 현재 수량 표시 */}
                        <span>{cart.quantity}</span>
                        {/* 수량 증가 버튼 */}
                        <button onClick={() => onUpdateQuantity(cart.itemCartId, 1)}>+</button>
                    </div>
                </div>
            </div>
            {/* 상품 삭제 버튼 */}
            <button className="remove-button" onClick={() => onRemoveItem(cart.itemCartId)}>삭제</button>
        </div>
    );
}