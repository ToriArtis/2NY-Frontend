import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Divider } from "@mui/material";
import { createOrder, createOrderFromCart } from '../../orders/api/ordersApi';
import { getUserInfo } from '../../users/api/userApi';
import { useCart } from '../hooks/useCart';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import '../components/css/PurchasePage.css';

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
  const { carts } = useCart();

  useEffect(() => {
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

    if (isFromCart && carts && carts.length > 0) {
        setOrderItems(carts);
    } else if (items && items.length > 0) {
        setOrderItems(items);
    } else {
        console.log("아이템이 없어요 !")
        navigate('/');
    }

    }, [isFromCart, items, carts, navigate]);

  useEffect(() => {
    calculatePrices();
  }, [orderItems]);

  const calculatePrices = () => {
    const total = orderItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const discount = orderItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1) * (item.discountRate || 0) / 100), 0);
    setTotalPrice(total);
    setDiscountPrice(discount);
    setFinalPrice(total - discount);
  };

  const handlePurchase = async () => {
    try {
      let order;
      if (isFromCart) {
        order = await createOrderFromCart();
      } else {
        order = await createOrder(orderItems);
      }
      alert('주문이 완료되었습니다.');
      navigate(`/orders/${order.orderId}`);
    } catch (error) {
      console.error('주문 생성 중 오류:', error);
      alert('주문 생성 중 오류가 발생했습니다.');
    }
  };

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
              <div key={index} className="order-item">
                <img src={item.thumbnail && item.thumbnail[0]} alt={item.itemTitle} />
                <div className="item-info">
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
            <Typography variant="body1">상품금액: ₩{totalPrice.toLocaleString()}</Typography>
            <Typography variant="body1">할인: -₩{discountPrice.toLocaleString()}</Typography>
            <Typography variant="h6" style={{marginTop: '10px'}}>
              총 결제금액: ₩{finalPrice.toLocaleString()}
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={handlePurchase}
              style={{marginTop: '20px'}}
            >
              토스페이 결제하기
            </Button>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
}

export default PurchasePage;