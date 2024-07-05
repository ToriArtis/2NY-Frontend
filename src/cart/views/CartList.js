import React from "react";
import { useCart } from "../hooks/useCart";
import { useCartActions } from "../hooks/useCartActions";

export default function CartsList() {
    // useCart 훅에서 장바구니 관련 상태와 함수들을 가져옴
    const { 
        carts, 
        error, 
        loading, 
        page, 
        totalPages,
        nextPage, 
        prevPage, 
        refetchCarts 
    } = useCart();

    // useCartActions 훅에서 장바구니 아이템 관련 액션들을 가져옴
    const { updateItemQuantity, removeItemFromCart } = useCartActions();

    // useCartsListViewModel 훅에서 가격 계산 관련 함수들을 가져옴
    const {
        calculateTotalPrice,
        calculateTotalDiscount,
        calculateFinalPrice,
    } = useCartsListViewModel();

    // 로딩 중일 때 표시
    if (loading) {
        return <div>Loading...</div>
    }

    // 에러 발생 시 표시
    if (error) {
        return <div>Error: {error}</div>
    }

    // 장바구니가 비어있을 때 표시
    if (!carts || carts.length === 0) {
        return <div>No carts found.</div>
    }

    // 수량 변경 핸들러
    const handleQuantityChange = async (itemCartId, newQuantity) => {
        const currentCart = carts.find(cart => cart.itemCartId === itemCartId);
        if (currentCart) {
            const difference = newQuantity - currentCart.quantity;
            await updateItemQuantity(itemCartId, difference);
            refetchCarts();
        }
    };

    // 아이템 삭제 핸들러
    const handleRemoveItem = async (itemCartId) => {
        await removeItemFromCart(itemCartId);
        refetchCarts();
    };

    return (
        <div>
            <h1>장바구니</h1>
            {/* 장바구니 아이템 목록 */}
            {carts.map((cart) => (
                <div key={cart.itemCartId}>
                    <p>cartId : {cart.cartId}</p>
                    <p>itemId : {cart.itemId}</p>
                    <p>quantity :
                        <input
                            type="number"
                            value={cart.quantity}
                            onChange={(e) => handleQuantityChange(cart.itemCartId, parseInt(e.target.value))}
                            min="1"
                        />
                    </p>
                    <p>가격 : {cart.price}</p>
                    <p>할인율: {cart.discountRate}%</p>
                    <p>상품 총 가격: {cart.calculateTotalPrice()}</p>
                    <p>상품 할인 금액: {cart.calculateItemDiscount()}</p>
                    <button onClick={() => handleRemoveItem(cart.itemCartId)}>삭제</button>
                    <hr />
                </div>
            ))}

            {/* 총 합계 정보 */}
            <div>
                <h2>총 합계</h2>
                <p>총 상품 금액: {calculateTotalPrice()}</p>
                <p>총 할인 금액: {calculateTotalDiscount()}</p>
                <p>최종 결제 금액: {calculateFinalPrice()}</p>
            </div>

            {/* 페이지네이션 컨트롤 */}
            <div>
                <button onClick={prevPage} disabled={page === 0}>이전</button>
                <span>Page {page + 1} of {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages - 1}>다음</button>
            </div>
        </div>
    )
}