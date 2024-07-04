import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import { CartsListViewModel } from "../../cart/viewModels/CartListViewModel";
import "../css/CartsListPage.css";
import BlueButton from "../BlueButton";
import { Margin } from "@mui/icons-material";

function CartsListPage() {

    const { carts, error } = CartsListViewModel();

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!carts || carts.length === 0) {
        return <div>No carts found.</div>
    }

    const totalPrice = carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
    const totalDiscount = carts.reduce((sum, cart) => sum + cart.price * cart.quantity * (cart.discountRate / 100), 0);
    const finalPrice = totalPrice - totalDiscount;

    return (
        <div className="cart-page">
            <Header />
            <main>
                <h2>장바구니</h2>
                <div className="cart-list">
                    {carts.map((cart) => (
                        <div key={cart.cartId} className="cart-item">
                            <img src={cart.itemImage} alt={cart.itemTitle} />
                            <div className="item-details">
                                <h3>{cart.itemTitle}</h3>
                                <p>가격: ₩{cart.price.toLocaleString()}</p>
                                <p>할인율: {cart.discountRate}%</p>
                                <div className="quantity-selector">
                                    <label>수량:</label>
                                    <select value={cart.quantity}>
                                        {[1,2,3,4,5].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button className="remove-item">X</button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <p>상품금액 합계: {totalPrice.toLocaleString()}</p>
                    <p>할인금액: {totalDiscount.toLocaleString()}</p>
                    <p>총 결제금액: {finalPrice.toLocaleString()}</p>
                    <BlueButton className={"checkout-button"} btnName={"구매하기"} style={{Margin : 0}}/>
                </div>
            </main>
            <Footer />
        </div>
    )

}

export default CartsListPage;