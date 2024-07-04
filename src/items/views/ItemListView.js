import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemViewModel } from '../hooks/useItemViewModel';

const ItemListView = () => {
  const { items, loading, error, fetchItems } = useItemViewModel();
  const [localItems, setLocalItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      await fetchItems();
    };
    loadItems();
  }, [fetchItems]);

  useEffect(() => {
    console.log('Items updated:', items);
    setLocalItems(items);
  }, [items]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Items</h2>
      <button onClick={() => navigate('/items/create')}>Create New Item</button>
      {localItems.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {localItems.map(item => (
            <li key={item.id}>
             아이템 id : {item.itemId}   상품이름: {item.title}    상품 내용 : {item.content} <br/> 
             원래 가격 : ${item.price}   할인율 : {item.discountRate}%   할인된 가격: {item.discountPrice}   <br/> 
             카테고리 : {item.category}   사이즈 : {item.size}    색상 : {item.color}    평균 별점 : {item.avgStar} <br/>
             썸네일 위치 : {item.thumbnail} 상세 이미지 : {item.descriptionImage} <br/>
              <button onClick={() => navigate(`/items/${item.id}`)}>View</button>
              <button onClick={() => navigate(`/items/${item.id}/edit`)}>Edit</button>
              <br/> <br/> <br/> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListView;