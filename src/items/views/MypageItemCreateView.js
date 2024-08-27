import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useItemViewModel } from '../hooks/useItemViewModel';
import { Typography } from '@mui/material';
import Pagination from "../../review/components/Pagination";
import '../components/css/MypageAllList.css'
import { getImageUrl } from "../../config/app-config";

const ItemAllListView = () => {
  const { category } = useParams();
  const location = useLocation();
  const { items, loading, error, fetchItems, changeSort, sortOption, searchKeyword, handleSearch, clearSearch } = useItemViewModel();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (category) {
      clearSearch();
    }
    fetchItems(0, 1000, category);
  }, [fetchItems, category, searchKeyword, clearSearch]);

  useEffect(() => {
    if (location.pathname === '/items') {
      clearSearch();
    }
  }, [location, clearSearch]);

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const sortedItems = useMemo(() => {
    let sorted = [...items];
    switch (sortOption) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priceHigh':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'priceLow':
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    return sorted;
  }, [items, sortOption]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const categoryTitles = {
    'TOP': '상의',
    'OUTER': '아우터',
    'DRESS': '원피스',
    'SKIRT': '스커트',
    'PANTS': '팬츠',
  };

  const title = category
    ? `${categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}`
    : '상품 조회';

  return (
    <div className="item-all-list-view">
      <Typography component="h1" variant="h5" className="page-title">
        <b>{title}</b>
      </Typography>
      {loading && items.length === 0 ? (
        <div className="loading">상품을 불러오는 중입니다...</div>
      ) : error ? (
        <div className="error">오류가 발생했습니다: {error}</div>
      ) : (
        <>
          <div className="item-list">
            {currentItems.map(item => (
              <div key={item.itemId} className="item" onClick={() => handleItemClick(item.itemId)}>
                <img src={getImageUrl(item.thumbnail)} alt={`Item ${item.itemId}`} className="review-item-image" />
                <div className="item-content">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          {loading && <div className="loading">추가 상품을 불러오는 중...</div>}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default ItemAllListView;