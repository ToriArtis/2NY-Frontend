import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import PurchasePage from "./cart/views/PurchasePage";
import ItemAllListView from "./items/views/ItemAllListView";
import PassWordFind from "./users/views/PasswordFindView";
import EmailFind from "./users/views/EmailFind";


import OAuth2RedirectHandler from "./users/components/OAuthRedirectHandler";
import ErrorPage from "./error/views/ErrorPage";
import ErrorBoundary from "./error/components/ErrorBoundary";
import { Switch } from "@mui/material";
import TestErrorPage from "./error/views/TestErrorPage";

function AppRouter() {
    const isAdmin = localStorage.getItem("USER_ROLESET")?.includes("ADMIN");

    return (
<ErrorBoundary>
            <Routes>
                <Route path="/" element={<ItemListView />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/logout" element={<Logout />}/>
                <Route path="/signup" element={<SignUpView />}/>
                <Route path="/mypage" element={<InfoPage />}/>
                <Route path="/passwordFind" element={<PassWordFind />}/>
                <Route path="/emailFind" element={<EmailFind />}/>
                
                <Route path="/items" element={<ItemAllListView />} />
                <Route path="/items/category/:category" element={<ItemAllListView />} />
                <Route path="/items/create" element={<ItemCreateView />} />
                <Route path="/items/:id" element={<ItemDetailView />} />
                <Route path="/items/:id/edit" element={<ItemEditView />} />

                <Route path="/cart" element={isAdmin ? (<Navigate to="/" replace />) : (<CartsListPage />)} />
                <Route path="/orders/:orderId" element={<OrderDetailPage />} />
                <Route path="/purchase" element={<PurchasePage />} />

                <Route path="/review/create" element={<CreateReviewView />} />
                <Route path="/review/modify/:reviewId" element={<ModifyReviewView />} />

                {/* 에러 관련 라우트 */}
                <Route path="/test:code" element={<TestErrorPage />} />
                <Route path="/error/:code" element={<ErrorPage />} />

                {/* 404 Not Found 라우트 */}
                <Route path="*" element={<ErrorPage statusCode={404} message="페이지를 찾을 수 없습니다." />} />
            </Routes>
        </ErrorBoundary>
    );
}

export default AppRouter;