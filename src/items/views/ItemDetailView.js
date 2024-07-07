import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItemViewModel } from '../hooks/useItemViewModel';
import { useCart } from '../../cart/hooks/useCart';  // 장바구니 훅 추가
import { createOrder } from '../../orders/api/ordersApi';  // 주문 생성 API 함수 추가

const ItemDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchItem, deleteItem } = useItemViewModel();
  const { addItemToCart } = useCart(); // 장바구니 추가 함수
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        const data = await fetchItem(id);
        setItem(data);
        setError(null);
      } catch (err) {
        console.error('Error loading item:', err);
        setError(err.message || 'Failed to load item');
        if (err.response && err.response.status === 403) {
          // 권한 없음 에러 처리
          setError('You do not have permission to view this item');
        }
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id, fetchItem]);

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      navigate('/items');
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item');
    }
  };

  const handleAddToCart = async () => {
    try {
      await addItemToCart(id, quantity);
      alert('장바구니에 상품이 추가되었습니다.');
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart');
    }
  };

  const handleBuyNow = async () => {
    try {
      const order = await createOrder([{ itemId: id, quantity }]);
      navigate(`/orders/${order.orderId}`);
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to create order');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.content}</p>
      <p>Price: ${item.price}</p>

      <div>
        <label htmlFor='quantity'>Quantity:</label>
        <input
          type='number'
          id='quantity'
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          min='1'
        />
      </div>

      <button onClick={handleAddToCart}>장바구니</button>
      <button onClick={handleBuyNow}>구매하기</button>
      <button onClick={() => navigate(`/items/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/items')}>Back to List</button>

    </div>
  );
};

export default ItemDetailView;