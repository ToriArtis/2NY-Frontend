import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getItemDetail, itemDelete } from '../api/itemApiSimple';
import '../components/css/ItemDetail.css';
import { useCart } from '../../cart/hooks/useCart';  // 장바구니 훅 추가
import { createOrder } from '../../orders/api/ordersApi';  // 주문 생성 API 함수 추가

const ItemDetailView = () => {
  // 상태 관리
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItemToCart } = useCart(); // 장바구니 추가 함수
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가

  // URL 파라미터와 네비게이션 훅
  const { id } = useParams();
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 아이템 정보 로드
  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      try {
        const data = await getItemDetail(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  // 아이템 삭제 핸들러
  const handleDelete = async () => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      try {
        await itemDelete(id);
        alert('상품이 성공적으로 삭제되었습니다.');
        navigate('/items'); // 목록 페이지로 리다이렉트
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // 장바구니 추가
  const handleAddToCart = async () => {
    try {
      await addItemToCart(id, quantity);
      alert('장바구니에 상품이 추가되었습니다.');
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  // 구매하기
  const handleBuyNow = () => {
    const itemOrder = {
      itemId: id,
      quantity: quantity,
      itemTitle: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      color: item.color,
      size: item.size
    };
    navigate('/purchase', { state: { items: [itemOrder], isFromCart: false } });
  };


  // 로딩 중 표시
  if (isLoading) return <div>Loading...</div>;

  // 에러 표시
  if (error) return <div className="error-message">{error}</div>;

  // 아이템이 없을 경우
  if (!item) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="item-detail-container">
      <div className="sidebar">
        <h1 className="sidebar-title">주문 현황</h1>
        <ul>
          <li><Link to="/orders">주문 현황</Link></li>
          <li><Link to="/items/create">상품 등록</Link></li>
          <li><Link to="/items">상품 조회</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <h1>{item.title}</h1>
        <div className="item-images">
          {item.thumbnail && (
            <img src={item.thumbnail} alt="썸네일" className="thumbnail" />
          )}
          {item.descriptionImage && item.descriptionImage.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`상세 이미지 ${index + 1}`} 
              className="description-image" 
            />
          ))}
        </div>
        <div className="item-details">
          <p><strong>가격:</strong> {item.price}원</p>
          <p><strong>할인율:</strong> {item.discountRate}%</p>
          <p><strong>카테고리:</strong> {item.category}</p>
          <p><strong>색상:</strong> {item.color}</p>
          <p><strong>사이즈:</strong> {item.size}</p>
          <p><strong>상품 정보:</strong> {item.content}</p>
        </div>

        <div>
        <label htmlFor='quantity'>Quantity:</label>
        <input
          type='number'
          id='quantity'
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min='1'
        />
        </div>

        <div className="button-group">
          <button onClick={handleAddToCart}>장바구니</button>
          <button onClick={handleBuyNow}>구매하기</button>
          <Link to={`/items/${id}/edit`} className="button edit-button">수정</Link>
          <button onClick={handleDelete} className="button delete-button">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailView;