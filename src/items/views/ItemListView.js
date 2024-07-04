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
              {item.title} - ${item.price}
              <button onClick={() => navigate(`/items/${item.id}`)}>View</button>
              <button onClick={() => navigate(`/items/${item.id}/edit`)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListView;