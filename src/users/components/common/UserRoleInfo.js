import React, { useState, useEffect } from 'react';
import OrderListPage from '../../../orders/views/OrderListPage';
import UserReviewListPage from '../../../component/pages/UserReviewListPage';
import useInfoViewModel from '../../viewModels/useInfoViewModel';
import PasswordVaild from './PasswordVaild';
import ModifyView from '../../views/ModifyView';
import OrderDetailPage from '../../../orders/views/OrderDetailPage';
import '../css/UserRoleInfo.css'; 

export default function UserRoleInfo() {
    const [activeView, setActiveView] = useState(<UserInfo />);
    const [selectedOrderId, setSelectedOrderId] = useState(null);  
    const [activeButton, setActiveButton] = useState("정보 수정");  

    useEffect(() => {
        handleClick("정보 수정");
    }, []);

    const handleClick = (viewName, orderId) => {
        setActiveButton(viewName);
        switch(viewName) {
            case "정보 수정":
                setActiveView(<UserInfo activeButton={activeButton} />);
                break;
            case "주문 내역":
                setActiveView(<OrderListPage onOrderSelect={handleOrderSelect} activeButton={activeButton} />);
                break;
            case "주문 상세":
                setActiveView(<OrderDetailPage orderId={orderId} activeButton={activeButton} />);
                break;
            case "작성 글":
                setActiveView(<UserReviewListPage activeButton={activeButton} />);
                break;
            default:
                setActiveView(<UserInfo activeButton={activeButton} />);
        }
    };

    const handleOrderSelect = (orderId) => {
        setSelectedOrderId(orderId);
        handleClick("주문 상세", orderId);
    };

    return (
        <div className="user-role-info-container">
            <nav className="roleSidebar">
                <button 
                    onClick={() => handleClick("정보 수정")} 
                    className={`sidebar-button ${activeButton === "정보 수정" ? "active" : ""}`}
                >
                    정보 수정
                </button>
                <button 
                    onClick={() => handleClick("주문 내역")} 
                    className={`sidebar-button ${activeButton === "주문 내역" ? "active" : ""}`}
                >
                    주문내역 조회
                </button>
                <button 
                    onClick={() => handleClick("작성 글")} 
                    className={`sidebar-button ${activeButton === "작성 글" ? "active" : ""}`}
                >
                    작성글 관리
                </button>
            </nav>
            <main className="content">
                {activeView}
            </main>
        </div>
    );
}

function UserInfo() {
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const userInfo = useInfoViewModel();
  
    const handlePasswordVerification = (isValid) => {
      setIsPasswordVerified(isValid);
    };

    useEffect(() => {
        if (localStorage.getItem("PROVIDER")) {
            setIsPasswordVerified(true);
        }
    }, []);
  
    return (
        <>
        {!isPasswordVerified ? (
          <PasswordVaild onVerify={handlePasswordVerification} />
        ) : (
            <div className="user-info-container">
          <ModifyView {...userInfo} />
          </div>
        )}
        </>

    );
}