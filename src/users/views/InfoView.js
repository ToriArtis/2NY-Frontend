import React from "react";
import { useSignUpViewModel } from "../viewModels/useSignUpViewModel";
import Input from "../components/common/Input";
import { Container, Grid, Typography } from "@mui/material";
import WhiteButton from "../../component/WhiteButton";
import Footer from "../../component/Footer";
import BlueButton from "../../component/BlueButton";
import Header from "../../component/Header";
import UserRoleInfo from "../components/common/UserRoleInfo";

function InfoView() {
    const { email, password, realName,nickName,address, detailAddress, phone, handleChange, handleSubmit, error } = useSignUpViewModel();
  
    return (
        <>
        <Header />
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" style={{ float: "left", margin: "0 0 0 5%" }}>
                    <h1 style={{ display : "inline"}}><b>(닉네임) 님</b> &nbsp;</h1>
                    <a style={{ color: "#8A8A8A", textDecoration: "none" }} href="/logout"> 로그아웃</a>
                </Typography>
            </Grid>
        </Grid>

        <UserRoleInfo />
        
        
        <Footer />
        </>
    );
}

export default InfoView;