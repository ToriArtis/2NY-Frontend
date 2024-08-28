import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import mypageItemListViewModel from "../../items/viewModels/mypageItemListViewModel";
import Pagination from '../../review/components/Pagination';
import { getImageUrl } from "../../config/app-config";
import { itemDelete } from '../api/itemApi';
import "../components/css/MypageAllList.css"

const ItemAllListView = () => {
  const { items, error, currentPage, totalPages, paginate } = mypageItemListViewModel();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const userRoles = localStorage.getItem("USER_ROLESET");
    setIsAdmin(userRoles && userRoles.includes("ADMIN"));
  }, []);

  const handleUpdate = (id) => {
    if (isAdmin) {
      navigate(`/items/${id}/edit`);
    } else {
      alert("관리자 권한이 없습니다.");
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      try {
        await itemDelete(id);
        alert('상품이 성공적으로 삭제되었습니다.');
        navigate('/items');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // 날짜
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 문자열 반환
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1);
  };

  return (
    <div className="item-all-list-view">
      <h2>상품 목록 조회</h2>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.itemId} className="item-item">
            <img src={getImageUrl(item.thumbnail)} alt={`Item ${item.itemId}`} className="item-image" />
            <div className="item-content">
              <h3>{item.title}</h3>
              <div className="item-info">
                <span className="item-date">
                  {item.updatedAt && item.updatedAt !== item.createdAt
                    ? `${formatDate(item.updatedAt)}`
                    : formatDate(item.createdAt)}
                </span>
              </div>
              <p className="item-description">{item.description}</p>
            </div>
            <div className="item-actions">
              <span onClick={() => handleUpdate(item.itemId)} className="action-link">
                수정
              </span>
              | <span onClick={() => handleDeleteClick(item.itemId)} className="action-link">삭제</span>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};

export default ItemAllListView;