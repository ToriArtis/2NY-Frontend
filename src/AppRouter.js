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
import App from "./App";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="/signup" element={<SignUpView />}/>
            <Route path="/info" element={<InfoPage />}/>
            <Route path="/items" element={<ItemListView />} />
            <Route path="/items/create" element={<ItemCreateView />} />
            <Route path="/items/:id" element={<ItemDetailView />} />
            <Route path="/items/:id/edit" element={<ItemEditView />} />
        </Routes>
    );
}

export default AppRouter;