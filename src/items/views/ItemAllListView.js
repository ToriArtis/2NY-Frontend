import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { useItemViewModel } from '../hooks/useItemViewModel';
import '../components/css/AllList.css';

const ItemCard = ({ item, onClick }) => (
  <div className="item-card" onClick={() => onClick(item.id)}>
    <img src={item.thumbnail} alt={item.title} className="item-thumbnail" />
    <h3 className="item-title">{item.title}</h3>
    <p className="item-price">
      {item.discountPrice !== item.price ? (
        <>
          <span className="original-price">₩{item.price.toLocaleString()}</span>
          <span className="discount-price">₩{item.discountPrice.toLocaleString()}</span>
        </>
      ) : (
        <span>₩{item.price.toLocaleString()}</span>
      )}
    </p>
  </div>
);

const ItemAllListView = () => {
  const { items, loading, error, fetchItems } = useItemViewModel();
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 12;

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const displayedItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <Header />
      <div className="all-items-container">
        <h1 className="all-items-title">전체 상품 목록</h1>
        <div className="all-items-grid">
          {displayedItems.map(item => (
            <ItemCard key={item.id} item={item} onClick={handleItemClick} />
          ))}
        </div>
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            이전
          </button>
          <span>{currentPage + 1} / {pageCount}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount - 1))}
            disabled={currentPage === pageCount - 1}
          >
            다음
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemAllListView;