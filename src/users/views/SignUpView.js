import React from "react";
import {
  Grid,
  Container,
  Typography,
  Link,
} from "@material-ui/core";
import { Button, TextField } from '../components/common';
import { useLoginViewModel } from "../viewModels/useLoginViewModel";

function SignUpView() {
  const {
    email,
    password,
    handleChange,
    handleSubmit,
    error,
  } = useLoginViewModel();


    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                계정 생성
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="유저 이름"
                autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="패스워드"
                type="password"
                id="password"
                autoComplete="current-password"
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                >
                계정 생성
                </Button>
            </Grid>
            </Grid>
            <Grid container justify="flex-end">
            <Grid item>
                <Link href="/login" variant="body2">
                이미 계정이 있습니까? 로그인 하세요.
                </Link>
            </Grid>
            </Grid>
        </form>
        </Container>
    );

}

export default SignUp;