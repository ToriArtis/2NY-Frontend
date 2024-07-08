import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useItemViewModel } from '../hooks/useItemViewModel';
import '../components/css/AllList.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import ItemCard from '../components/ItemCard';
const ItemAllListView = () => {
  const { category } = useParams();
  const { items, loading, error, pagination, fetchItems } = useItemViewModel();
  const navigate = useNavigate();
  const itemsPerPage = 12;

  useEffect(() => {
    fetchItems(0, itemsPerPage, category);
  }, [fetchItems, category, itemsPerPage]);

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const handlePageChange = (newPage) => {
    fetchItems(newPage, itemsPerPage, category);
  };

  const categoryTitles = {
    'TOP': '상의',
    'OUTER': '아우터',
    'DRESS': '원피스',
    'SKIRT': '스커트',
    'PANTS': '팬츠',
  };

  const title = category 
    ? `${categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} 목록` 
    : '전체 상품 목록';

  return (
    <>
      <Header />
      <div className="all-items-container">
        <h1 className="all-items-title">{title}</h1>
        {loading && items.length === 0 ? (
          <div className="loading">상품을 불러오는 중입니다...</div>
        ) : error ? (
          <div className="error">오류가 발생했습니다: {error}</div>
        ) : (
          <>
            <div className="all-items-grid">
              {items.map(item => (
                <ItemCard key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
            {loading && <div className="loading">추가 상품을 불러오는 중...</div>}
            {pagination && pagination.totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(pagination.number - 1)}
                  disabled={pagination.number === 0}
                >
                  이전
                </button>
                <span>{pagination.number + 1} / {pagination.totalPages}</span>
                <button 
                  onClick={() => handlePageChange(pagination.number + 1)}
                  disabled={pagination.number >= pagination.totalPages - 1}
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ItemAllListView;