import React from "react";
import { CartsListViewModel } from "../viewModels/useCartListViewModel";
import { CartItem } from "./CartItem";

function CartsList() {
    // CartsListViewModel에서 필요한 상태와 함수들을 가져옴
    const {
        carts,
        error,
        loading,
        updateItemQuantity,
        removeItemFromCart,
        totalPrice,
        totalDiscountAmount,
        finalTotalPrice,
        page,
        totalPages,
        nextPage,
        prevPage
    } = CartsListViewModel();

    // 로딩 중일 때 표시
    if (loading) return <div>Loading...</div>;
    // 에러가 있을 때 표시
    if (error) return <div>Error: {error}</div>;
    // 장바구니가 비어있을 때 표시
    if (!carts || carts.length === 0) return <div>장바구니가 비어있습니다.</div>;

    return (
        <div className="carts-list">
            <h1>장바구니</h1>
            {/* 장바구니 아이템 목록 */}
            {carts.map((cart) => (
                <CartItem 
                    key={cart.itemCartId}
                    cart={cart}
                    onUpdateQuantity={updateItemQuantity}
                    onRemoveItem={removeItemFromCart}
                />
            ))}
            {/* 페이지네이션 컨트롤 */}
            <div>
                <button onClick={prevPage} disabled={page === 0}>이전</button>
                <span>Page {page + 1} of {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages - 1}>다음</button>
            </div>
            
            {/* 장바구니 요약 정보 */}
            <div className="cart-summary">
                <p>총 상품금액: ₩{totalPrice.toLocaleString()}</p>
                <p>총 할인금액: ₩{totalDiscountAmount.toLocaleString()}</p>
                <p>결제예정금액: ₩{finalTotalPrice.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default CartsList;