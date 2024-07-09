import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import Input from "../users/components/common/Input";

function Header() {
    let nav = useNavigate();
    const userRoles = localStorage.getItem("USER_ROLESET");
    const [searchKeyword, setSearchKeyword] = useState("");


    const handleCartClick = () => {
        if (userRoles && userRoles.includes("ADMIN")) {
            alert("관리자는 장바구니에 접근할 수 없습니다.");
        } else {
            nav('/cart');
        }
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim() !== "") {
            nav(`/items?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };


    return (
        <Container component="header" className="header-container">
            <Grid container direction="column" alignItems="center">
                <Grid item container justifyContent="space-between" alignItems="center" className="header-top">
                    <div className="left-btn">
                        <button onClick={() => nav('/')}><img src="/assets/logo.png" alt="Logo" /></button>
                    </div>

                    <form onSubmit={handleSearchSubmit}>
                        <Input
                            label="검색"
                            type="text"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                        />
                    </form>
                    
                    <div className="right-btn">
                        <button type="submit">
                            <div><img src="/assets/Search.png" alt="Search" /></div>
                            검색
                        </button>
                        {localStorage.getItem("ACCESS_TOKEN") ? (
                            <button onClick={() => nav('/mypage')}><div><img src="/assets/User.png" alt="User" /></div>마이페이지</button>
                        ) : (<button onClick={() => nav('/login')}><div><img src="/assets/User.png" alt="User" /></div>로그인</button>)}

                        {(userRoles === null || userRoles.includes("ADMIN"))
                            ? (<></>)
                            : (<button onClick={handleCartClick}><div><img src="/assets/Shopping bag.png" alt="Cart" /></div>장바구니</button>)}

                        {localStorage.getItem("ACCESS_TOKEN") ? (
                            <button onClick={() => nav('/logout')}><div><img src="/assets/Logout.png" alt="Logout" /></div>로그아웃</button>
                        ) : (<></>)}
                    </div>
                </Grid>
                <Grid item container direction="column" alignItems="center" className="header-bottom">
                    <hr className="header-divider" />
                    <div className="category-nav">
                        <button onClick={() => nav('/items')}><p>ALL</p></button>
                        <button onClick={() => nav('/items/category/TOP')}><p>상의</p></button>
                        <button onClick={() => nav('/items/category/OUTER')}><p>아우터</p></button>
                        <button onClick={() => nav('/items/category/DRESS')}><p>원피스</p></button>
                        <button onClick={() => nav('/items/category/SKIRT')}><p>스커트</p></button>
                        <button onClick={() => nav('/items/category/PANTS')}><p>팬츠</p></button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Header;