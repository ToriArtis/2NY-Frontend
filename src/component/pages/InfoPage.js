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
            <div style={{ padding: '20px 5%', display: 'flex', alignItems: 'flex-start' }}>
                <Typography component="h1" variant="h5" style={{ marginRight: '20px', width: '150px', textAlign: 'left' }}>
                    <b>{nickName} 님</b>
                </Typography>
                <div style={{ flexGrow: 1 }}>
                    {role.includes("ADMIN") ? <AdminRoleInfo /> : <UserRoleInfo />}
                </div>
            </div>
            <Footer />

        </>
    );
}

export default InfoPage;