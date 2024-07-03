import React from "react";
import { useNavigate } from "react-router-dom";

function Header(){
    let nav = useNavigate();
    const goHome = () => {
        nav('/');
    }    
    const goLogin = () => {
        nav('/login');
    }   
    const goLogout = () => {
        nav('/logout');
    }  
    const goSignup = () => {
        nav('/signup');
    }  
    
    const goMypage = () => {
        nav('/mypage');
    }  
    return (
        <div>
            <button onClick={goHome}>Home</button>
            <button onClick={goLogin}>login</button>
            <button onClick={goLogout}>goLogout</button>
            <button onClick={goSignup}>goSignup</button>
            {/* <button onClick={goMypage}>mypage</button> */}
        </div>
    );
}

export default Header;