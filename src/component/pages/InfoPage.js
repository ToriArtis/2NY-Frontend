import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";
import UserRoleInfo from "../../users/components/common/UserRoleInfo";
import UserInfoViewModel from "../../users/viewModels/userInfoViewModel";
import CartsListPage from "./CartsListPage";

function InfoPage() {
    const { email, password, realName, nickName, address, detailAddress, phone, error } = UserInfoViewModel();

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <Header />


        <div>
            <h1>User Information</h1>
            <p>Email: {email}</p>
            <p>Real Name: {realName}</p>
            <p>Nick Name: {nickName}</p>
            <p>Address: {address}</p>
            <p>Detail Address: {detailAddress}</p>
            <p>Phone: {phone}</p>
        </div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" style={{ float: "left", margin: "0 0 0 5%" }}>
                    <h1 style={{ display : "inline"}}><b>(닉네임) 님</b> &nbsp;</h1>
                    <a style={{ color: "#8A8A8A", textDecoration: "none" }} href="/logout"> 로그아웃</a>
                </Typography>
            </Grid>
        </Grid>
        <Grid>
            
        </Grid>

        <UserRoleInfo />
        
        
        <Footer />
        </>
    );
}

export default InfoPage;