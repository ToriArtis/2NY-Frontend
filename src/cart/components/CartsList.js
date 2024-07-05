import React from "react";
import { useCart } from "../hooks/useCart";
import { useCartActions } from "../hooks/useCartAction";
import { Cart } from "../models/Carts";

export default function CartsList() {
    // 장바구니 상태와 관련 기능들을 가져옴
    const { carts, error, loading, page, totalPages, nextPage, prevPage, refetchCarts } = useCart();
    // 장바구니 아이템 수정 및 삭제 기능을 가져옴
    const { updateItemQuantity, removeItemFromCart } = useCartActions();

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
            refetchCarts(); // 장바구니 데이터 새로고침
        }
    };

    // 아이템 삭제 핸들러
    const handleRemoveItem = async (itemCartId) => {
        await removeItemFromCart(itemCartId);
        refetchCarts(); // 장바구니 데이터 새로고침
    };

    return (
        <div>
            <h1>장바구니</h1>
            <div className="cartListBox">
                <div className="cartList">
                    {/* 장바구니 아이템 목록 */}
                    {carts.map((cart) => (
                        <div key={cart.itemCartId} className="itemCart">
                            <div className="listLeftTopT">
                                <p>cartId : {cart.cartId}</p>
                                <button className="removeBtn" onClick={() => handleRemoveItem(cart.itemCartId)}>❌</button>
                            </div>

                            <div className="listLeftTopB">
                            <p>{cart.discountRate}%</p>
                            <p>{cart.price}</p>
                            </div>
                            {/* <p>합계 가격 : {cart.calculateItemTotalPrice()}</p> */}
                            {/* <p>할인 될 가격 : {cart.}</p> */}
                            <p>
                                <input
                                    type="number"
                                    value={cart.quantity}
                                    onChange={(e) => handleQuantityChange(cart.itemCartId, parseInt(e.target.value))}
                                    min="1"
                                />
                            </p>
                            <hr />
                        </div>
                    ))}
                    {/* 페이지네이션 컨트롤 */}
                    <div>
                        <button onClick={prevPage} disabled={page === 0}>이전</button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button onClick={nextPage} disabled={page === totalPages - 1}>다음</button>
                    </div>
                </div>

                <div className="paymentBox">
                    <div className="paymentBoxLeft">
                        <p>상품 합계 금액</p>
                        <p>할인</p>
                        <p>총 상품금액</p>
                    </div>
                    <div className="paymentBoxRight">
                        <p>0</p>
                        <p>0</p>
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}