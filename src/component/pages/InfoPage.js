import React from "react";
import { Grid, Typography } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";
import UserRoleInfo from "../../users/components/common/UserRoleInfo";

// import UserInfoViewModel from "../../users/viewModels/userInfoViewModel";
// import CartsListPage from "./CartsListPage";

function InfoPage() {
    const nickName = localStorage.getItem("UESR_NICKNAME");
    return (
        <>
        <Header />
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" style={{ float: "left", margin: "0 0 0 5%" }}>
                    <h1 style={{ display: "inline" }}><b>({nickName}) 님</b> &nbsp;</h1>
                    <a style={{ color: "#8A8A8A", textDecoration: "none" }} href="/logout"> 로그아웃</a>
                </Typography>
            </Grid>
        </Grid>
      
        {/* 나중에 roleset을 넣는다면 아래 코드로 변환 /}
        {/ Role === 'Admin' ? <AdminRoleInfo /> : <UserRoleInfo /> */}
        <UserRoleInfo />
        
        <Footer />
        </>
    );
}

export default InfoPage;