import React from "react";
import { CartsListViewModel } from "../viewModels/useCartListViewModel";
import CartsList from "../components/CartsList";
import "../css/CartsListPage.css";

function CartsListPage() {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="carts-page">
            <main>
                <h1>장바구니</h1>
                <CartsList 
                    carts={carts} 
                    onUpdateQuantity={updateItemQuantity} 
                    onRemoveItem={removeItemFromCart} 
                />
                <div className="cart-summary">
                    <p>총 상품금액: ₩{parseInt(totalPrice).toLocaleString()}</p>
                    <p>총 할인금액: ₩{parseInt(totalDiscountAmount).toLocaleString()}</p>
                    <p>결제예정금액: ₩{parseInt(finalTotalPrice).toLocaleString()}</p>
                </div>
            </main>
        </div>
    )
}

export default CartsListPage;