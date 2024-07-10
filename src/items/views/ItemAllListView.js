import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useItemViewModel } from '../hooks/useItemViewModel';
import '../components/css/AllList.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import ItemCard from '../components/ItemCard';


const ItemAllListView = () => {
  const { category } = useParams();
  const location = useLocation();
  const { items, loading, error, fetchItems, changeSort, sortOption, searchKeyword, handleSearch, clearSearch  } = useItemViewModel();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    if (category) {
      clearSearch(); // 카테고리가 변경되면 검색 상태 초기화
    }
    fetchItems(0, 1000, category); // Fetch a large number of items
  }, [fetchItems, category, searchKeyword, clearSearch]);

  // '/items' 경로로 이동할 때 검색 상태 초기화
  useEffect(() => {
    if (location.pathname === '/items') {
      clearSearch();
    }
  }, [location, clearSearch]);

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
      <Header onSearch={handleSearch} clearSearch={clearSearch} />
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