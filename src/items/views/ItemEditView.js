import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItemViewModel } from '../hooks/useItemViewModel';

const ItemEditView = () => {
  const { id } = useParams();
  const { currentItem, loading, error, fetchItem, updateItem } = useItemViewModel();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    price: '',
  });

  useEffect(() => {
    fetchItem(id);
  }, [fetchItem, id]);

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(id, formData);
      navigate(`/items/${id}`);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <button type="submit">Update Item</button>
      </form>
      <button onClick={() => navigate(`/items/${id}`)}>Cancel</button>
    </div>
  );
};

export default ItemEditView;