import React, { useState } from "react";
import { Container, Grid, Hidden, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import "./css/header.css";
import Input from "../users/components/common/Input";

function Header({ onSearch, clearSearch }) {
    let nav = useNavigate();
    const userRoles = localStorage.getItem("USER_ROLESET");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchKeyword);
        setIsSearchVisible(false);
    };

    const handleCartClick = () => {
        if (userRoles && userRoles.includes("ADMIN")) {
            alert("관리자는 장바구니에 접근할 수 없습니다.");
        } else {
            nav('/cart');
        }
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container component="header" className="header-container">
            <Grid container direction="column" alignItems="center">
                <Grid item container justifyContent="space-between" alignItems="center" className="header-top">
                    <div className="left-btn">
                        <button onClick={() => nav('/')}><img src="/assets/logo.png" alt="Logo" /></button>
                    </div>
                    <Hidden mdDown>
                        <div className="right-btn">
                            <div className="search-box">
                                {isSearchVisible && (
                                    <form onSubmit={handleSearchSubmit} className="search-form">
                                        <Input
                                            label="검색"
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                            autoFocus
                                        />
                                    </form>
                                )}
                                <button onClick={toggleSearch} className="search-icon-button">
                                    <div><img src="/assets/Search.png" alt="Search" className="search-icon" /></div>
                                    검색
                                </button>
                            </div>
                            {localStorage.getItem("ACCESS_TOKEN") ? (
                                <button onClick={() => nav('/mypage')}><div><img src="/assets/User.png" alt="User" /></div>마이페이지</button>
                            ) : (
                                <button onClick={() => nav('/login')}><div><img src="/assets/User.png" alt="User" /></div>로그인</button>
                            )}
                            {(userRoles === null || userRoles.includes("ADMIN"))
                                ? (<></>)
                                : (<button onClick={handleCartClick}><div><img src="/assets/Shopping bag.png" alt="Cart" /></div>장바구니</button>)}
                            {localStorage.getItem("ACCESS_TOKEN") && (
                                <button onClick={() => nav('/logout')}><div><img src="/assets/Logout.png" alt="Logout" /></div>로그아웃</button>
                            )}
                        </div>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => { toggleSearch(); handleMenuClose(); }}>검색</MenuItem>
                            <MenuItem onClick={() => { nav(localStorage.getItem("ACCESS_TOKEN") ? '/mypage' : '/login'); handleMenuClose(); }}>
                                {localStorage.getItem("ACCESS_TOKEN") ? '마이페이지' : '로그인'}
                            </MenuItem>
                            {(userRoles === null || !userRoles.includes("ADMIN")) && (
                                <MenuItem onClick={() => { handleCartClick(); handleMenuClose(); }}>장바구니</MenuItem>
                            )}
                            {localStorage.getItem("ACCESS_TOKEN") && (
                                <MenuItem onClick={() => { nav('/logout'); handleMenuClose(); }}>로그아웃</MenuItem>
                            )}
                        </Menu>
                    </Hidden>
                </Grid>
                <Grid item container direction="column" alignItems="center" className="header-bottom">
                    <div className="category-nav">
                        <button onClick={() => { if (typeof onSearch === 'function') clearSearch(); nav('/items') }}><p>ALL</p></button>
                        <button onClick={() => { if (typeof onSearch === 'function') clearSearch(); nav('/items/category/TOP') }}><p>상의</p></button>
                        <button onClick={() => { if (typeof onSearch === 'function') clearSearch(); nav('/items/category/OUTER') }}><p>아우터</p></button>
                        <button onClick={() => { if (typeof onSearch === 'function') clearSearch(); nav('/items/category/DRESS') }}><p>원피스</p></button>
                        <button onClick={() => { if (typeof onSearch === 'function') clearSearch(); nav('/items/category/SKIRT') }}><p>스커트</p></button>
                        <button onClick={() => { if (typeof onSearch === 'function') clearSearch(); nav('/items/category/PANTS') }}><p>팬츠</p></button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Header;