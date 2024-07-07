import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getItemDetail, itemDelete } from '../api/itemApiSimple';
import '../components/css/ItemDetail.css';

const ItemDetailView = () => {
  // 상태 관리
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="button-group">
          <Link to={`/items/${id}/edit`} className="button edit-button">수정</Link>
          <button onClick={handleDelete} className="button delete-button">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailView;