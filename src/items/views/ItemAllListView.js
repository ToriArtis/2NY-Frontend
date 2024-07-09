import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import '../components/css/AllList.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import ItemCard from '../components/ItemCard';
import { useItemViewModel } from '../hooks/useItemViewModel';

const ItemAllListView = () => {
  const { category } = useParams();
  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword'); // 파라미터 값 가져옴

  const { items, loading, error, fetchItems, changeSort, sortOption, searchKeyword, setSearchKeyword, searchItems } = useItemViewModel();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  
  useEffect(() => {
    if (keyword) {
      // 검색 키워드가 있는 경우 searchItems 함수 호출
      searchItems(keyword);
    } else {
      // 검색 키워드가 없는 경우 fetchItems 함수 호출
      fetchItems(0, 1000, category);
    }
  }, [fetchItems, category, keyword, searchItems]);

  useEffect(() => {
    fetchItems(0, 1000, category); // Fetch a large number of items
  }, [fetchItems, category]);

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const handleSortChange = (event) => {
    changeSort(event.target.value);
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

  const paginatedItems = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return sortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedItems, currentPage]);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        <div className="items-header">
          <h1 className="all-items-title">{title}</h1>
          <select className="sort-select" value={sortOption} onChange={handleSortChange}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="priceHigh">높은가격순</option>
            <option value="priceLow">낮은가격순</option>
          </select>
        </div>
        {loading && items.length === 0 ? (
          <div className="loading">상품을 불러오는 중입니다...</div>
        ) : error ? (
          <div className="error">오류가 발생했습니다: {error}</div>
        ) : (
          <>
            <div className="all-items-grid">
              {paginatedItems.map(item => (
                <ItemCard key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
            {loading && <div className="loading">추가 상품을 불러오는 중...</div>}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  이전
                </button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
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