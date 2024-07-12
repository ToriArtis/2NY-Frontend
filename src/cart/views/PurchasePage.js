import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Divider } from "@mui/material";
import { createOrder, createOrderFromCart } from '../../orders/api/ordersApi';
import { getUserInfo } from '../../users/api/userApi';
import { useCart } from '../hooks/useCart';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import '../components/css/PurchasePage.css';
import { getImageUrl } from '../../config/app-config';
import { getItemDetail } from '../../items/api/itemApi';

function PurchasePage() {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: '',
    detailAddress: ''
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { isFromCart, items } = location.state || {};
  const { carts, clearAllItems } = useCart();

  useEffect(() => {
    // 관리자 권한 체크
    const userRoles = localStorage.getItem("USER_ROLESET");
    if (userRoles === 'ADMIN,USER' || userRoles === 'USER,ADMIN') {
      navigate("/");
      alert("관리자는 구매할 수 없습니다.");
    }

    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
            const user = await getUserInfo();
            setUserInfo({
            name: user.realName,
            phone: user.phone,
            address: user.address,
            detailAddress: user.detailAddress
            });
        } catch (error) {
        console.error('회원 정보 가져오기 중 오류:', error);
        }
    };

    fetchUserInfo();

    // 상품 상세 정보 가져오기
    const fetchItemDetails = async (items) => {
      const updatedItems = await Promise.all(items.map(async (item) => {
        try {
          const detailedItem = await getItemDetail(item.itemId);
          return {
            ...item,
            discountRate: detailedItem.item.discountRate || 0,
            discountPrice: detailedItem.item.discountPrice || item.price
          };
        } catch (error) {
          console.error(`Error fetching details for item ${item.itemId}:`, error);
          return item;
        }
      }));
      return updatedItems;
    };

    // 주문 아이템 업데이트
    const updateOrderItems = async () => {
      if (isFromCart && carts && carts.length > 0) {
        const updatedCarts = await fetchItemDetails(carts);
        setOrderItems(updatedCarts);
      } else if (items && items.length > 0) {
        const updatedItems = await fetchItemDetails(items);
        setOrderItems(updatedItems);
      }
      if (!isFromCart && !items) {
        console.log("아이템이 없어요 !")
      }
    };

    updateOrderItems();

  }, [isFromCart, items, carts]);

  // 가격 계산
  useEffect(() => {
    calculatePrices();
  }, [orderItems]);

  // 결제 모듈 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.onload = () => {
      if (window.IMP) {
        window.IMP.init("imp17468865");
      }
    };
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 결제 요청 함수
  const onClickPay = () => {
    if (!window.IMP) {
      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
  
    window.IMP.request_pay({
      pg: "kakaopay",
      pay_method: "card",
      amount: finalPrice,
      name: orderItems[0].itemTitle + (orderItems.length > 1 ? ` 외 ${orderItems.length - 1}건` : ''),
      merchant_uid: `ORD${new Date().getTime()}`,
    }, function(rsp) {
      if (rsp.success) {
        handlePurchase();
      } else {
        alert("결제에 실패하였습니다. " + rsp.error_msg);
      }
    });
  };

  // 가격 계산 함수
  const calculatePrices = () => {
    const total = orderItems.reduce((sum, item) => {
      const itemPrice = item.price * item.quantity;
      return sum + itemPrice;
    }, 0);

    const discount = orderItems.reduce((sum, item) => {
      const itemDiscount = Math.round((item.price - item.discountPrice) * item.quantity);
      return sum + itemDiscount;
    }, 0);

    setTotalPrice(total);
    setDiscountPrice(discount);
    setFinalPrice(total - discount);
  };

  // 주문 처리 함수
  const handlePurchase = async () => {
    try {
      let order;
      if (isFromCart) {
        order = await createOrderFromCart();
        await clearAllItems();
      } else {
        order = await createOrder(orderItems);
      }
      alert('주문이 완료되었습니다.');
      navigate(`/`);
    } catch (error) {
      console.error('주문 생성 중 오류:', error);
      alert('주문 생성 중 오류가 발생했습니다.');
    }
  };

  if (orderItems.length === 0) {
    return <div>주문할 상품이 없습니다.</div>;
  }

  return (
    <div className="purchase-page">
      <Header />
      <main>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              배송 및 결제 방법
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              상품 정보
            </Typography>
            {orderItems.map((item, index) => (
              <div key={index} className="purchase-order-item">
                <img src={getImageUrl(item.thumbnail[0])} alt={item.itemTitle} />
                <div className="purchase-item-info">
                  <Typography variant="h6">{item.itemTitle}</Typography>
                  <Typography variant="body1">₩{item.price.toLocaleString()}</Typography>
                  <Typography variant="body2">색상: {item.color} / 사이즈: {item.size}</Typography>
                  <Typography variant="body2">수량: {item.quantity}</Typography>
                </div>
              </div>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              배송 정보
            </Typography>
            <Typography variant="body1">이름: {userInfo.name}</Typography>
            <Typography variant="body1">전화번호: {userInfo.phone}</Typography>
            <Typography variant="body1">주소: {userInfo.address}</Typography>
            <Typography variant="body1">상세주소: {userInfo.detailAddress}</Typography>
            
            <Divider style={{margin: '20px 0'}} />
            
            <Typography variant="h5" gutterBottom>
              최종 결제 정보
            </Typography>
            <Typography variant="body1">상품금액: ₩{parseInt(totalPrice).toLocaleString()}</Typography>
            <Typography variant="body1">할인: -₩{parseInt(discountPrice).toLocaleString()}</Typography>
            <Typography variant="h6" style={{marginTop: '10px'}}>
              총 결제금액: ₩{parseInt(finalPrice).toLocaleString()}
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={onClickPay}
              style={{              
                marginTop: '20px',
                background: '#fee500',
                color: '#000',}}
            >
              카카오페이 결제하기
            </Button>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
}

export default PurchasePage;