import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";
import UserRoleInfo from "../../users/components/common/UserRoleInfo";
import CartsListPage from "./CartsListPage";
import { useNavigate } from "react-router-dom";
import AdminRoleInfo from "../../users/components/common/AdminRoleInfo";
import { getItem } from "../../users/utils/crypto";

function InfoPage() {

    const navigate = useNavigate();
    const [nickName, setNickName] = useState(() => {
        return getItem("USER_NICKNAME") || "";
    });
    const [role, setRole] = useState(() => {
        return localStorage.getItem("USER_ROLESET") || "";
    });

    useEffect(() => {
        if (!nickName) {
            navigate("/login");
        }
    }, [nickName, navigate]);

    return (
        <>
            <Header />
            <div className="all-items-container" style={{ flex: 1 }}>
                <div className="items-header">
                    <h1 className="all-items-title"><b>{nickName} 님</b></h1>
                </div>
                <div style={{ flexGrow: 1 }}>
                    {role.includes("ADMIN") ? <AdminRoleInfo /> : <UserRoleInfo />}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default InfoPage;