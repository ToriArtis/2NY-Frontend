import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import App from "./App";
import LoginView from "./users/views/LoginView";
import Logout from "./users/api/userLoginApi";
import SignUpView from "./users/views/SignUpView";


function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="/signup" element={<SignUpView />}/>
        </Routes>
                
    );
}

export default AppRouter;