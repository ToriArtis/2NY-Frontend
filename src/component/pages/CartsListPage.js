import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import CartsList from "../../cart/components/CartsList";
import "../css/CartsListPage.css";
import BlueButton from "../BlueButton";

function CartsListPage() {
    return (
        <div className="cart-page">
            <Header />
            <main>
                <CartsList />
                <BlueButton className={"checkout-button"} btnName={"구매하기"} style={{margin: 0}}/>
            </main>
            <Footer />
        </div>
    )
}

export default CartsListPage;
