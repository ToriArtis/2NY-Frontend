import React from "react";
import { getImageUrl } from "../../config/app-config";
import { useNavigate } from "react-router-dom";

// 개별 장바구니 아이템 컴포넌트
export function CartItem({ cart, onUpdateQuantity, onRemoveItem }) {
    const navigate = useNavigate();

    // 장바구니 수량 업데이트 핸들러
    const handleUpdateQuantity = (itemCartId, upDown) => {
        if (cart.quantity + upDown < 1) {
            alert('수량은 1개 이상만 가능합니다.');
            return;
        }
        onUpdateQuantity(itemCartId, upDown);
    };

    const handleItemClick = (itemId) => {
        navigate(`/items/${itemId}`);
    };

    return (
        <div className="cart-item">
            <div className="cart-product">
                <img src={getImageUrl(cart.thumbnail[0])} alt={cart.itemTitle} />

                <div className="product-info">
                    <h3 onClick={() => handleItemClick(cart.itemId)}>{cart.itemTitle}</h3>
                    <p>₩{parseInt(cart.price).toLocaleString()}</p>

                    <div className="quantity-control">
                        <button onClick={() => handleUpdateQuantity(cart.itemCartId, -1)}>-</button>
                        <span>{cart.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(cart.itemCartId, 1)}>+</button>
                    </div>
                </div>

            </div>
            <button className="remove-item" onClick={() => onRemoveItem(cart.itemCartId)}>삭제</button>
        </div>
    );
}