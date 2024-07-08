import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getItemDetail, itemDelete } from '../api/itemApi';
import '../components/css/ItemDetail.css';
import { useCart } from '../../cart/hooks/useCart';
import { createOrder } from '../../orders/api/ordersApi';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { getImageUrl } from '../../config/app-config';

const ItemDetailView = () => {
  const [itemData, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      try {
        const data = await getItemDetail(id);
        setItem(data);
        setSelectedColor(Array.isArray(data.item.color) ? data.item.color[0] : data.item.color);
        setSelectedSize(Array.isArray(data.item.size) ? data.item.size[0] : data.item.size);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      try {
        await itemDelete(id);
        alert('상품이 성공적으로 삭제되었습니다.');
        navigate('/items');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleAddToCart = async () => {
    const userRoles = localStorage.getItem("USER_ROLESET");
    if (userRoles && userRoles.includes("ADMIN")) {
        alert("관리자는 장바구니에 상품을 추가할 수 없습니다.");
        return;
    }
    try {
      await addItemToCart(id, quantity, selectedColor, selectedSize);
      alert('장바구니에 상품이 추가되었습니다.');
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  const handleBuyNow = () => {
    if (itemData?.item) {
      const itemOrder = {
        itemId: id,
        quantity: quantity,
        itemTitle: itemData.item.title,
        price: itemData.item.price,
        thumbnail: itemData.item.thumbnail,
        color: selectedColor,
        size: selectedSize
      };
      navigate('/purchase', { state: { items: [itemOrder], isFromCart: false } });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!itemData) return <div>상품을 찾을 수 없습니다.</div>;

  const { item } = itemData;

  return (
    <>
      <Header/>
      <div className="item-detail-container">
        <div className="item-images">
          {item?.thumbnail && (
            <img src={getImageUrl(item.descriptionImage)} alt="썸네일" className="main-image" onError={(e) => e.target.style.display = 'none'} />
          )}
          <div className="sub-images">
            {item?.descriptionImage && item.descriptionImage.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`상세 이미지 ${index + 1}`} 
                className="sub-image" 
                onError={(e) => e.target.style.display = 'none'}
              />
            ))}
          </div>
        </div>
        <div className="item-info">
          <h1>{item?.title}</h1>
          <div className="rating">평균 별점: {item?.avgStar || 0}</div>
          <div className="price-info">
            <span className="original-price">{item?.price}원</span><br/>
            <span className="discount-rate">{item?.discountRate}%</span>
            <span className="discounted-price">₩{item?.discountPrice}</span>
          </div>
          {item?.color && (
            <div className="color-selection">
              <label>색상:</label>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {Array.isArray(item.color) 
                  ? item.color.map((color, index) => (
                      <option key={index} value={color}>{color}</option>
                    ))
                  : <option value={item.color}>{item.color}</option>
                }
              </select>
            </div>
          )}
          {item?.size && (
            <div className="size-selection">
              <label>사이즈:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {Array.isArray(item.size)
                  ? item.size.map((size, index) => (
                      <option key={index} value={size}>{size}</option>
                    ))
                  : <option value={item.size}>{item.size}</option>
                }
              </select>
            </div>
          )}
          <div className="quantity-selection">
            <label>수량:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div className="button-group">
            <button onClick={handleAddToCart} className="cart-button">장바구니</button>
            <button onClick={handleBuyNow} className="buy-button">구매하기</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ItemDetailView;