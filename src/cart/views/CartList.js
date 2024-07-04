import React from "react";
import { CartsListViewModel } from "../models/CartListViewModel";

export default function CartsList() {
    // CartsListViewModel에서 carts와 error 상태를 가져옴
    const { carts, error } = CartsListViewModel();

    // 에러 표시
    if (error) {
        return <div>Error: {error}</div>
    }

    // 장바구니 비었을 때 메시지 표시
    if (!carts || carts.length === 0) {
        return <div>No carts found.</div>
    }

    // 장바구니 목록 렌더링
    return (
        <div>
            <h1>장바구니</h1>
            {/* 장바구니 배열을 매핑해 각 정보를 렌더링 */}
            {carts.map((cart) => (
                <div key={cart.cartId}>
                    <p>cartId : {cart.cartId}</p>
                    <p>itemId : {cart.itemId}</p>
                    <p>quantity : {cart.quantity}</p>
                    <p>price : {cart.price}</p>
                    <p>discountRate : {cart.discountRate}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}