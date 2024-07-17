import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Divider, Modal, Box, Select, MenuItem } from "@mui/material";
import { createOrder, createOrderFromCart } from '../../orders/api/ordersApi';
import { getUserInfo } from '../../users/api/userApi';
import { useCart } from '../hooks/useCart';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import '../components/css/PurchasePage.css';
import { getImageUrl } from '../../config/app-config';
import { getItemDetail } from '../../items/api/itemApi';

function PurchasePage() {
  // 주문 관련 상태 변수들
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', address: '', detailAddress: '' });

  // 무통장 입금 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');

  // 라우터 관련 훅, 상태
  const location = useLocation();
  const navigate = useNavigate();
  const { isFromCart, items } = location.state || {};
  const { carts, clearAllItems } = useCart();

  // 계좌 정보
  const accounts = [
    { id: 1, bank: '국민은행', number: '123-456-789', name: '(2ny)' },
    { id: 2, bank: '신한은행', number: '987-654-321', name: '(2ny)' },
    { id: 3, bank: '농협은행', number: '112-119-114', name: '(2ny)' },
    { id: 4, bank: '수협은행', number: '315-258-424', name: '(2ny)' }
  ];

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    checkAdminRights();
    fetchUserInfo();
    updateOrderItems();
  }, [isFromCart, items, carts]);

  // 주문 아이템이 변경 될 때 가격 재계산
  useEffect(() => {
    calculatePrices();
  }, [orderItems]);

  // 결제 모듈 스크립트 로드
  useEffect(() => {
    loadPaymentScript();
    return () => {
      const script = document.querySelector("script[src='https://cdn.iamport.kr/v1/iamport.js']");
      if (script) document.body.removeChild(script);
    };
  }, []);

  // 관리자 권한 체크 함수
  const checkAdminRights = () => {
    const userRoles = localStorage.getItem("USER_ROLESET");
    if (userRoles === 'ADMIN,USER' || userRoles === 'USER,ADMIN') {
      navigate("/");
      alert("관리자는 구매할 수 없습니다.");
    }
  };

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
      alert('회원 정보 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 주문 아이템 업데이트
  const updateOrderItems = async () => {
    const fetchItemDetails = async (items) => {
      return Promise.all(items.map(async (item) => {
        try {
          const detailedItem = await getItemDetail(item.itemId);
          return {
            ...item,
            discountRate: detailedItem.item.discountRate || 0,
            discountPrice: detailedItem.item.discountPrice || item.price
          };
        } catch (error) {
          alert('아이템을 가져오는 도중 오류가 발생했습니다.');
          return item;
        }
      }));
    };

    if (isFromCart && carts && carts.length > 0) {
      const updatedItems = await fetchItemDetails(carts);
      setOrderItems(updatedItems);
    } else if (items && items.length > 0) {
      const updatedItems = await fetchItemDetails(items);
      setOrderItems(updatedItems);
    }
  };

  // 가격 계산
  const calculatePrices = () => {
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = orderItems.reduce((sum, item) => sum + Math.round((item.price - item.discountPrice) * item.quantity), 0);
    setTotalPrice(total);
    setDiscountPrice(discount);
    setFinalPrice(total - discount);
  };

  // 결제 모듈 스크립트 로드 함수
  const loadPaymentScript = () => {
    const script = document.createElement('script');
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.onload = () => {
      if (window.IMP) {
        window.IMP.init("imp17468865");
      }
    };
    document.body.appendChild(script);
  };

  // 카카오페이 결제 요청 함수
  const onClickPay = () => {
    if (!window.IMP) {
      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    window.IMP.request_pay({
      pg: "kakaopay",
      pay_method: "card",
      amount: finalPrice,
      name: orderItems[0].itemTitle + (orderItems.length > 1 ? ` 외 ${orderItems.length - 1}건` : ''),
      merchant_uid: `ORD${new Date().getTime()}`,
      m_redirect_url: "https://yourwebsite.com/payments/complete",
    }, function (rsp) {
      if (isMobile) return;
      if (rsp.success) {
        handlePurchase();
      } else {
        alert("결제에 실패하였습니다. " + rsp.error_msg);
      }
    });
  };

  // 무통장 입금 모달 관련 함수
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleAccountSelect = (event) => setSelectedAccount(event.target.value);

  // 무통장 입금 처리 함수
  const handleBankTransfer = async () => {
    if (!selectedAccount) {
      alert('계좌를 선택해주세요.');
      return;
    }
    try {
      let order;
      if (isFromCart) {
        order = await createOrderFromCart(selectedAccount);
        await clearAllItems();
      } else {
        order = await createOrder(orderItems, selectedAccount);
      }
      alert('주문이 완료되었습니다. 선택하신 계좌로 입금해주세요.');
      navigate('/');
    } catch (error) {
      alert('주문 생성 중 오류가 발생했습니다.');
    }
    handleModalClose();
  };

  // 주문 처리 함수 (카카오페이 결제 성공 시에도 호출)
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

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" gutterBottom>
              최종 결제 정보
            </Typography>
            <Typography variant="body1">상품금액: ₩{parseInt(totalPrice).toLocaleString()}</Typography>
            <Typography variant="body1">할인: -₩{parseInt(discountPrice).toLocaleString()}</Typography>
            <Typography variant="h6" style={{ marginTop: '10px' }}>
              총 결제금액: ₩{parseInt(finalPrice).toLocaleString()}
            </Typography>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              marginTop: '2rem',
            }}
              className='payment-btn-container'
            >
              <button
                onClick={onClickPay}
                className='kakaopay-btn'
              >
                <img
                  src='/assets/kakaopay.png'
                  alt='kakaopay'
                />
              </button>

              <Button
                variant="contained"
                onClick={handleModalOpen}
                style={{
                  background: '#f5f5f5',
                  color: '#000',
                  height: '50px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  flex: 1,
                  maxWidth: '70%'
                }}
              >
                무통장입금
              </Button>
            </div>

          </Grid>
        </Grid>
      </main>
      <Footer />

      {/* 무통장 입금 모달 */}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: 'none',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            계좌 선택
          </Typography>
          <Select
            value={selectedAccount}
            onChange={handleAccountSelect}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            {accounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.bank} - {account.number} {account.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleBankTransfer}
            style={{ marginTop: '20px' }}
          >
            주문하기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default PurchasePage;