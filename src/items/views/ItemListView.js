import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/css/MainPage.css";
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { useItemViewModel } from '../hooks/useItemViewModel';
import { IconButton } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import ChatbotView from '../../chat/ChatbotView';
import { getImageUrl } from '../../config/app-config';

const ItemCard = ({ item, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div className="item-card" onClick={() => onClick(item.id)}>
      <div className="item-thumbnail-container">
        {imageLoaded ? (
          <img
            src={getImageUrl(item.thumbnail)}
            alt={item.title}
            className="item-thumbnail"
            onError={handleImageError}
          />
        ) : (
          <div className="item-thumbnail-placeholder">
            이미지를 불러올 수 없습니다
          </div>
        )}
      </div>
      <h3 className="item-title" style={{fontWeight: 'bold'}}>{item.title}</h3>
      <p className="item-price">
        {item.discountPrice !== item.price ? (
          <>
            <span className="original-price">₩{item.price.toLocaleString()}</span> &nbsp;
            <span className="discount-price">₩{item.discountPrice.toLocaleString()}</span>
          </>
        ) : (
          <span>₩{item.price.toLocaleString()}</span>
        )}
      </p>
    </div>
  );
};

const ItemSection = ({ title, items, currentPage, setCurrentPage, onItemClick }) => {
  const itemsPerPage = 3;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : prev));
  };

  return (
    <div className="item-section">
      <h2 className="section-title">{title}</h2>
      <div className="item-carousel">
        <button onClick={handlePrevPage} className="nav-btn prev-btn" disabled={currentPage === 0}>
          &lt;
        </button>
        <div className="item-grid">
          {items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map(item => (
            <ItemCard key={item.id} item={item} onClick={onItemClick} />
          ))}
        </div>
        <button onClick={handleNextPage} className="nav-btn next-btn" disabled={currentPage === pageCount - 1}>
          &gt;
        </button>
      </div>
    </div>
  );
};

const ItemListView = () => {
  const [showChat, setShowChat] = useState(false);
  const { items, loading, error, fetchItems } = useItemViewModel();
  const [brandItems, setBrandItems] = useState([]);
  const [mdItems, setMdItems] = useState([]);
  const [brandPage, setBrandPage] = useState(0);
  const [mdPage, setMdPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (items.length > 0) {
      const mid = Math.ceil(items.length / 2);
      setBrandItems(items.slice(0, mid));
      setMdItems(items.slice(mid));
    }
  }, [items]);

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <Header />
      <IconButton 
        aria-label="open chat" 
        style={floatingButtonStyle}
        onClick={toggleChat}
      ><AddBox />
      </IconButton>
      {showChat && (
        <div style={chatWindowStyle}>
          <ChatbotView />
        </div>
      )}

      <div className="item-list-container">
        <div className='arrivals-banner'>
          <img src='/assets/bannder.png' alt="New Arrivals Banner" className="arrivals-image" />
          <div className="banner-text">NEW ARRIVALS</div>
          <div className='banner-text2'>지금 주목해야 할 여름 신상</div>
        </div>
        
        <div className="main-content">
          <ItemSection 
            title="BREND'S BEST" 
            items={brandItems} 
            currentPage={brandPage} 
            setCurrentPage={setBrandPage} 
            onItemClick={handleItemClick}
          />
          <ItemSection 
            title="MD'S PICK" 
            items={mdItems} 
            currentPage={mdPage} 
            setCurrentPage={setMdPage} 
            onItemClick={handleItemClick}
          />
        </div>
        <div className="lookbook-section">
          <div className="lookbook-image-container">
            <img src="/assets/blur.png" alt="Lookbook 1" className="lookbook-image" />
            <div className="lookbook-overlay">
              <h2>LOOKBOOK</h2>
              <p>24 F/W COLLECTION</p>
            </div>
          </div>
          <div className="lookbook-image-container">
            <img src="/assets/1.png" alt="Lookbook 2" className="lookbook-image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemListView;

const floatingButtonStyle = {
  position: 'fixed',
  bottom: '5%',
  right: '10%',
  backgroundColor: 'white', 
  color: 'black',
  borderRadius: '50%',
  padding: '12px',
  boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
  zIndex: '1000',
};

const chatWindowStyle = {
  position: 'fixed',
  bottom: '15%',
  right: '10%',
  width: 'auto',
  height: 'auto',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};