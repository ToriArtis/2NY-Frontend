import React, { useState } from "react";
import { Container, Grid, Hidden, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, ListItemIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import "./css/header.css";
import Input from "../users/components/common/Input";

function Header({ onSearch, clearSearch }) {
    let nav = useNavigate();
    const location = useLocation();
    const userRoles = localStorage.getItem("USER_ROLESET");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        if (searchKeyword.trim()) {  // 검색어가 있는 경우에만 실행
            onSearch(searchKeyword);
            setIsSearchVisible(false);
            setIsSidebarOpen(false);
        }
    };

    const handleCartClick = () => {
        if (userRoles && userRoles.includes("ADMIN")) {
            alert("관리자는 장바구니에 접근할 수 없습니다.");
        } else {
            nav('/cart');
        }
        setIsSidebarOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const hideSearch = ["/", "/mypage","/cart","/purchase"];

    const sidebarContent = (
        <List>
            {!hideSearch.includes(location.pathname) && (
                <ListItem style={{ height: '70px' }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: 1 }} onClick={handleSearchSubmit}>
                        <img src="/assets/Search.png" alt="Search" style={{ width: '24x', height: '24px' }} />
                    </ListItemIcon>
                    <form onSubmit={handleSearchSubmit} className="search-form" style={{ flex: 1 }}>
                        <Input
                            label="검색"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            autoFocus
                        />
                    </form>
                </ListItem>
            )}

            <ListItem button onClick={() => { nav(localStorage.getItem("ACCESS_TOKEN") ? '/mypage' : '/login'); toggleSidebar(); }}>
                <ListItemText primary={localStorage.getItem("ACCESS_TOKEN") ? '마이페이지' : '로그인'} />
            </ListItem>
            {(userRoles === null || !userRoles.includes("ADMIN")) && (
                <ListItem button onClick={handleCartClick}>
                    <ListItemText primary="장바구니" />
                </ListItem>
            )}
            {localStorage.getItem("ACCESS_TOKEN") && (
                <ListItem button onClick={() => { nav('/logout'); toggleSidebar(); }}>
                    <ListItemText primary="로그아웃" />
                </ListItem>
            )}
        </List>
    );

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
                            {!hideSearch.includes(location.pathname) && (
                                <>
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
                                </>
                                )}
                            </div>
                            {localStorage.getItem("ACCESS_TOKEN") ? (
                                <button onClick={() => nav('/mypage')}><div><img src="/assets/User.png" alt="User" /></div>마이페이지</button>
                            ) : (
                                <button onClick={() => nav('/login')}><div><img src="/assets/User.png" alt="User" /></div>로그인</button>
                            )}
                            {(userRoles === null || !userRoles.includes("ADMIN")) && (
                                <button onClick={handleCartClick}><div><img src="/assets/Shopping bag.png" alt="Cart" /></div>장바구니</button>
                            )}
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
                            onClick={toggleSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={isSidebarOpen}
                            onClose={toggleSidebar}
                            classes={{
                                paper: 'sidebar-drawer'
                            }}
                        >
                            {sidebarContent}
                        </Drawer>
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
