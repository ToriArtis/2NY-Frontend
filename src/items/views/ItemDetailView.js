import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItemViewModel } from '../viewModels/ItemViewModel';

const ItemDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchItem, deleteItem } = useItemViewModel();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.content}</p>
      <p>Price: ${item.price}</p>
      <button onClick={() => navigate(`/items/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/items')}>Back to List</button>
    </div>
  );
};

export default ItemDetailView;