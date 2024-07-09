import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemDetail, itemDelete } from '../api/itemApi';
import { useCart } from '../../cart/hooks/useCart';
import { getReviewsByItemId } from '../../review/api/reviewApi';
import { getImageUrl } from '../../config/app-config';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../components/css/ItemDetail.css';

const StarRating = ({ rating }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= rating ? "star filled" : "star"}>★</span>
    ))}
  </div>
);

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <img src={img} alt={`상세 이미지 ${index + 1}`} className="carousel-image" />
        </div>
      ))}
    </Slider>
  );
};

const ItemDetailView = () => {
  const [itemData, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchItemAndReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getItemDetail(id);
        setItem(data);
        setSelectedColor(Array.isArray(data.item.color) ? data.item.color[0] : data.item.color);
        setSelectedSize(Array.isArray(data.item.size) ? data.item.size[0] : data.item.size);

        const reviewData = await getReviewsByItemId(id);
        if (reviewData && Array.isArray(reviewData.content)) {
          setReviews(reviewData.content);
        } else {
          console.error('Invalid review data:', reviewData);
          setReviews([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemAndReviews();

    const userRoles = localStorage.getItem("USER_ROLESET");
    setIsAdmin(userRoles && userRoles.includes("ADMIN"));
  }, [id]);

  const handleUpdate = () => {
    if (isAdmin) {
      navigate(`/items/${id}/edit`);
    } else {
      alert("관리자 권한이 없습니다.");
    }
  };

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

  const handleAddToCart = () => {
    if (isAdmin) {
      alert("관리자는 장바구니에 상품을 추가할 수 없습니다.");
      return;
    }
    addItemToCart(id, quantity, selectedColor, selectedSize)
      .then(() => alert('장바구니에 상품이 추가되었습니다.'))
      .catch(err => setError(err.message));
  };

  const handleBuyNow = () => {
    if (isAdmin) {
      alert("관리자는 구매할 수 없습니다.");
      return;
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? dateString 
      : date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!itemData) return <div>상품을 찾을 수 없습니다.</div>;

  const { item } = itemData;

  return (
    <>
      <Header />
      <div className="item-detail-container">
        <div className="item-images">
          {item?.thumbnail && item.descriptionImage && (
            <ImageCarousel 
              images={[getImageUrl(item.thumbnail), ...item.descriptionImage.map(img => getImageUrl(img))]} 
            />
          )}
        </div>
        <div className="item-info">
          <h1>{item?.title}</h1>
          <div className="rating">
            평균 별점: <StarRating rating={item?.avgStar || 0} />
          </div>
          <div className="price-info">
            <span className="original-price">₩{item?.price}</span>
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
            {isAdmin && <button onClick={handleUpdate} className="cart-button">수정하기</button>}
            <button onClick={handleAddToCart} className="cart-button">장바구니</button>
            <button onClick={handleBuyNow} className="buy-button">구매하기</button>
          </div>
        </div>
      </div>

      <div className="review-list">
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.reviewId} className="review-item">
            <div className="review-header">
              <span className="review-author">{review.nickName}</span>
              <StarRating rating={review.star} />
            </div>
            <p className="review-text">{review.content}</p>
            <span className="review-date">
              {review.updatedAt && review.updatedAt !== review.createdAt
                ? `${formatDate(review.updatedAt)}`
                : formatDate(review.createdAt)}
            </span>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ItemDetailView;