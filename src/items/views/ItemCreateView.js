import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemViewModel } from '../viewModels/ItemViewModel';

const ItemCreateView = () => {
  const navigate = useNavigate();
  const { createItem, loading, error } = useItemViewModel();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem(formData);
      navigate('/items');
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Create New Item</h2>
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
        <button type="submit">Create Item</button>
      </form>
      <button onClick={() => navigate('/items')}>Cancel</button>
    </div>
  );
};

export default ItemCreateView;