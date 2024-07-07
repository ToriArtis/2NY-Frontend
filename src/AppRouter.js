import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginView from "./users/views/LoginView";
import Logout from "./users/api/userLoginApi";
import SignUpView from "./users/views/SignUpView";
import InfoPage from "./component/pages/InfoPage";
import ItemListView from "./items/views/ItemListView";
import ItemDetailView from "./items/views/ItemDetailView";
import ItemCreateView from "./items/views/ItemCreateView";
import ItemEditView from "./items/views/ItemEditView";

import CartsListPage from "./component/pages/CartsListPage";
import CreateReviewView from "./review/views/CreateReviewView";
import ModifyReviewView from "./review/views/ModifyReviewView";
import OrderDetailPage from "./orders/views/OrderDetailPage";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<ItemListView />} />
            
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="/signup" element={<SignUpView />}/>

            <Route path="/mypage" element={<InfoPage />}/>
            <Route path="/items" element={<ItemListView />} />

            <Route path="/info" element={<InfoPage />}/>

            <Route path="/items/create" element={<ItemCreateView />} />
            <Route path="/items/:id" element={<ItemDetailView />} />
            <Route path="/items/:id/edit" element={<ItemEditView />} />

            <Route path="/cart" element={<CartsListPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailPage />} />

            <Route path="/review/create" element={<CreateReviewView />} />
            <Route path="/review/modify/:reviewId" element={<ModifyReviewView />} />
        </Routes>
    );
}

export default AppRouter;