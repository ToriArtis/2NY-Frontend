import React from "react";
import { useSignUpViewModel } from "../viewModels/useSignUpViewModel";
import Input from "../components/common/Input";
import { Container, Grid, Typography } from "@mui/material";
import WhiteButton from "../../component/WhiteButton";
import Footer from "../../component/Footer";
import BlueButton from "../../component/BlueButton";

function SignUpView() {
    const { email, password, realName,nickName,address, detailAddress, phone, handleChange, handleSubmit, error } = useSignUpViewModel();
  
    return (
        <>
        
        <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                        <b>회원가입</b>
                    </Typography>
                </Grid>
            </Grid>
            <br />
            <Grid >
                
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="이메일"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="이름"
                    type="text"
                    name="realName"
                    value={realName}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="닉네임"
                    type="text"
                    name="nickName"
                    value={nickName}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="주소"
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="상세주소"
                    type="text"
                    name="detailAddress"
                    value={detailAddress}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="전화번호"
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    required
                />
                <div>
                    <WhiteButton className="reset-button" type="reset" btnName={"취소"}
                    onClick={() => window.history.back()}
                    />
                    <BlueButton className="signup-button" type="submit" btnName={"회원가입"}/>
                </div>
               
            </form>
            </Grid>

            <Grid sx={{ marginBottom: "20%" }}>

            </Grid>
        </Container>
        
        <Footer />
        </>
    );
}

export default SignUpView;