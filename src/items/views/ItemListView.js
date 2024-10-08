import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/css/MainPage.css";
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { useItemViewModel } from '../hooks/useItemViewModel';
import { IconButton } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import ChatbotView from '../../chat/ChatbotView';
import { getImageUrl } from '../../config/app-config';
import { useMediaQuery } from '@mui/material';
import ItemCard from '../components/ItemCard';  // ItemCard 컴포넌트 import

const ItemSection = ({ title, items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const totalItems = items.length;
  const carouselRef = useRef(null);

  const isMobile = useMediaQuery('(max-width:768px)');
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  useEffect(() => {
    if (isSmallMobile) {
      setItemsPerPage(1);
    } else if (isMobile) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  }, [isMobile, isSmallMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(totalItems / itemsPerPage));
    }, 2000);  // 5초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex, itemsPerPage]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(totalItems / itemsPerPage)) % Math.ceil(totalItems / itemsPerPage));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(totalItems / itemsPerPage));
  };

  return (
    <div className="item-section">
      <h2 className="section-title">{title}</h2>
      <div className="item-carousel-container">
        <button onClick={handlePrevClick} className="nav-btn prev-btn">&lt;</button>
        <div className="item-carousel-wrapper">
          <div className="item-carousel" ref={carouselRef}>
            {items.map((item) => (
              <div key={item.id} className="item-slide" style={{ flex: `0 0 ${100 / itemsPerPage}%`, maxWidth: `${100 / itemsPerPage}%` }}>
                <ItemCard item={item} onClick={() => onItemClick(item.id)} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNextClick} className="nav-btn next-btn">&gt;</button>
      </div>
    </div>
  );
};

const ItemListView = () => {
  const [showChat, setShowChat] = useState(false);
  const { items, loading, error, fetchItems } = useItemViewModel();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const { brandItems, mdItems } = useMemo(() => {
    const mid = Math.ceil(items.length / 2);
    return {
      brandItems: items.slice(0, mid),
      mdItems: items.slice(mid)
    };
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
          <div className='banner-text2'>지금 주목해야 할 가을 신상</div>
        </div>
        
        <div className="main-content">
          <ItemSection 
            title="BREND'S BEST" 
            items={brandItems}
            onItemClick={handleItemClick}
          />
          <ItemSection 
            title="MD'S PICK" 
            items={mdItems}
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
  right: '5%',
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
  right: '5%',
  width: '90%',
  maxWidth: '400px',
  height: '60%',
  maxHeight: '500px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};
