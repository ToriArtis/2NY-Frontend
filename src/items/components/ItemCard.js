import React, { useState } from 'react';
import { getImageUrl } from '../../config/app-config';

const ItemCard = ({ item, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  const thumbnailUrl = getImageUrl(item.thumbnail);


  return (
    <div className="item-card" onClick={() => onClick(item.id)}>
      <div className="item-thumbnail-container">
        {imageLoaded ? (
          <img
            src={thumbnailUrl}
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
};

export default ItemCard;