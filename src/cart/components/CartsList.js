import React from "react";
import { CartsListViewModel } from "../viewModels/useCartListViewModel";
import { CartItem } from "./CartItem";

// 장바구니 목록 컴포넌트
function CartsList() {
    const {
        carts,
        error,
        loading,
        updateItemQuantity,
        removeItemFromCart,
        totalPrice,
        totalDiscountAmount,
        finalTotalPrice,
        hasMore,
        loadMoreCarts
    } = CartsListViewModel();

    // 로딩 중일 때 표시
    if (loading && carts.length === 0) return <div>Loading...</div>;
    // 에러가 있을 때 표시
    if (error) return <div>Error: {error}</div>;
    // 장바구니가 비어있을 때 표시
    if (!carts || carts.length === 0) return <div>장바구니가 비어있습니다.</div>;

    // 수량 업데이트 핸들러
    const handleUpdateQuantity = async (itemCartId, upDown) => {
        try {
            await updateItemQuantity(itemCartId, upDown);
        } catch (error) {
            alert('수량 업데이트 중 오류가 발생했습니다.');
        }
    };

    // 아이템 제거 핸들러
    const handleRemoveItem = async (itemCartId) => {
        try {
            await removeItemFromCart(itemCartId);
        } catch (error) {
            alert('상품 제거 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="carts-list">
            <h1>장바구니</h1>
            <div className="carts-list-wrapper">
                {carts.map((cart) => (
                    <CartItem 
                        key={cart.itemCartId}
                        cart={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                    />
                ))}

                {hasMore && (
                    <button onClick={loadMoreCarts} className="loadMoreBtn" disabled={loading}>
                        {loading ? '로딩중' : '더보기'}
                    </button>
                )}
                
                <div className="cart-summary">
                    <div className="cart-summary-top">
                        <div>
                            <p>상품 합계 금액: </p>
                            <p>₩{totalPrice.toLocaleString()}</p>
                        </div>
                        
                        <div>
                            <p>할인: </p>
                            <p>₩{totalDiscountAmount.toLocaleString()}</p>
                        </div>

                        <div>
                            <p>결제금액: </p>
                            <p>₩{finalTotalPrice.toLocaleString()}</p>
                        </div>
                    </div>
                    <button className="buy-btn">구매하기</button>
                </div>
            </div>
        </div>
    );
}

export default CartsList;