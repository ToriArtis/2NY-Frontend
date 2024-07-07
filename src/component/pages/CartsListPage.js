import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import CartsList from "../../cart/components/CartsList";
import "../css/CartsListPage.css";

function CartsListPage() {
    return (
        <div className="cart-page">
            <Header />
            <main>
                <CartsList />
            </main>
            <Footer />
        </div>
    )
}

export default CartsListPage;
