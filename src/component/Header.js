import { Container, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import Input from "../users/components/common/Input";

function Header(){
    let nav = useNavigate();
    return (
        <Container component="header" className="header-container">
            <Grid container direction="column" alignItems="center">
                <Grid item container justifyContent="space-between" alignItems="center" className="header-top">
                    <div className="left-btn">
                        <button onClick={()=> nav('/')}><img src="/assets/logo.png" alt="Logo" /></button>
                    </div>
                    <Input label="검색" />
                    <div className="right-btn">
                        <button><div><img src="/assets/Search.png" alt="Search" /></div>검색</button>
                        <button onClick={()=> nav('/mypage')}><div><img src="/assets/User.png" alt="User" /></div>마이페이지</button>
                        <button onClick={()=> nav('/cart')}><div><img src="/assets/Shopping bag.png" alt="Cart" /></div>장바구니</button>
                        { localStorage.getItem("ACCESS_TOKEN") ? (
                            <button onClick={()=> nav('/logout')}><div><img src="/assets/Logout.png" alt="Logout" /></div>로그아웃</button>
                        ) :(<></>) }
                    </div>
                </Grid>
                <Grid item container direction="column" alignItems="center" className="header-bottom">
                    <hr className="header-divider" />
                    <div className="category-nav">
                        <button onClick={()=> nav('/')}><p>ALL</p></button>
                        <button onClick={()=> nav('/')}><p>상의</p></button>
                        <button onClick={()=> nav('/')}><p>아우터</p></button>
                        <button onClick={()=> nav('/')}><p>스커트</p></button>
                        <button onClick={()=> nav('/')}><p>팬츠</p></button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Header;