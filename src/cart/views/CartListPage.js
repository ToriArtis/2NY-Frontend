import React from "react";
import { CartsListViewModel } from "../viewModels/CartsListViewModel";
import { CartsList } from "../components/CartsList";
import "../css/CartsListPage.css";

// CartsListPage 컴포넌트: 장바구니 페이지 전체를 렌더링합니다.
function CartsListPage() {
    // CartsListViewModel에서 필요한 상태와 함수들을 가져옵니다.
    const {
        carts,
        error,
        loading,
        updateItemQuantity,
        removeItemFromCart,
        totalPrice,
        totalDiscountAmount,
        finalTotalPrice
    } = CartsListViewModel();

    // 로딩 중일 때 표시할 내용
    if (loading) return <div>Loading...</div>;
    // 에러가 발생했을 때 표시할 내용
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="carts-page">
            <main>
                <h1>장바구니</h1>
                {/* CartsList 컴포넌트를 렌더링하고 필요한 props를 전달합니다. */}
                <CartsList 
                    carts={carts} 
                    onUpdateQuantity={updateItemQuantity} 
                    onRemoveItem={removeItemFromCart} 
                />
                <div className="cart-summary">
                    <p>총 상품금액: ₩{totalPrice.toLocaleString()}</p>
                    <p>총 할인금액: ₩{totalDiscountAmount.toLocaleString()}</p>
                    <p>결제예정금액: ₩{finalTotalPrice.toLocaleString()}</p>
                </div>
            </main>
        </div>
    )
}

export default CartsListPage;