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
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" style={{ float: "left", margin: "0 0 0 5%" }}>
                        <h1 style={{ display: "inline" }}><b>{nickName} 님</b> &nbsp;</h1>
                        <a style={{ color: "#8A8A8A", textDecoration: "none", fontSize: "1rem" }} href="/logout"> 로그아웃</a>
                    </Typography>
                </Grid>
            </Grid>

            {role.includes("ADMIN") ? <AdminRoleInfo /> : <UserRoleInfo />}


            <Footer />
        </>
    );
}

export default InfoPage;