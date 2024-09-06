import React, { useState, useEffect } from 'react';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import ModifyView from '../../views/ModifyView';
import UserListView from '../../views/UserListView';
import MypageItemCreateView from '../../../items/views/MypageItemCreateView';
import ItemCreateView from '../../../items/views/ItemCreateView';
import AdminOrdersListPage from '../../../orders/views/AdminOrdersListPage';
import Dashboard from '../../../component/Dashboard';
import '../css/AdminRoleInfo.css'; 

export default function AdminRoleInfo() {
    const [activeView, setActiveView] = useState(<UserInfo />);
    const [activeButton, setActiveButton] = useState("정보 수정");

    useEffect(() => {
        handleClick("정보 수정");
    }, []);

    const handleClick = (viewName) => {
        setActiveButton(viewName);
        switch (viewName) {
            case "정보 수정":
                setActiveView(<UserInfo isAdmin activeButton={activeButton} />);
                break;
            case "주문 현황":
                setActiveView(<AdminOrdersListPage isAdmin={true} activeButton={activeButton} />);
                break;
            case "상품 등록":
                setActiveView(<ItemCreateView isAdmin activeButton={activeButton} />);
                break;
            case "상품 조회":
                setActiveView(<MypageItemCreateView isAdmin activeButton={activeButton} />);
                break;
            case "수익 관리":
                setActiveView(<Dashboard isAdmin activeButton={activeButton} />);
                break;
            case "사용자 목록":
                setActiveView(<UserListView isAdmin activeButton={activeButton} />);
                break;
            default:
                setActiveView(<UserInfo isAdmin activeButton={activeButton} />);
        }
    };

    return (
        <div className="admin-role-info-container">
            <nav className="roleSidebar">
                <button 
                    onClick={() => handleClick("정보 수정")} 
                    className={`sidebar-button ${activeButton === "정보 수정" ? "active" : ""}`}
                >
                    정보 수정
                </button>
                <button 
                    onClick={() => handleClick("주문 현황")} 
                    className={`sidebar-button ${activeButton === "주문 현황" ? "active" : ""}`}
                >
                    주문 현황
                </button>
                <button 
                    onClick={() => handleClick("상품 등록")} 
                    className={`sidebar-button ${activeButton === "상품 등록" ? "active" : ""}`}
                >
                    상품 등록
                </button>
                <button 
                    onClick={() => handleClick("상품 조회")} 
                    className={`sidebar-button ${activeButton === "상품 조회" ? "active" : ""}`}
                >
                    상품 조회
                </button>
                <button 
                    onClick={() => handleClick("수익 관리")} 
                    className={`sidebar-button ${activeButton === "수익 관리" ? "active" : ""}`}
                >
                    수익 관리
                </button>
                <button 
                    onClick={() => handleClick("사용자 목록")} 
                    className={`sidebar-button ${activeButton === "사용자 목록" ? "active" : ""}`}
                >
                    사용자 목록
                </button>
            </nav>
            <main className="content">
                {activeView}
            </main>
        </div>
    );
}

function UserInfo({ isAdmin }) {
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const userInfo = useInfoViewModel();

    const handlePasswordVerification = (isValid) => {
        setIsPasswordVerified(isValid);
    };

    return (
        <>
        
        {!isPasswordVerified ? (
                <PasswordVaild onVerify={handlePasswordVerification} />
            ) : (
                <div className="user-info-container" style={{border: "1px solid black", padding: "10px"}}>
                    <ModifyView {...userInfo} isAdmin={isAdmin} />
                </div>
            )}
        </>
        
    );
}