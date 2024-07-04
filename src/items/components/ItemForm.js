import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useItemViewModel } from '../hooks/useItemViewModel';

const ItemForm = observer(({ itemId }) => {
  const viewModel = useItemViewModel();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    price: '',
    // 다른 필드들...
  });

  useEffect(() => {
    if (itemId) {
      viewModel.fetchItem(itemId);
    }
  }, [itemId, viewModel]);

  useEffect(() => {
    if (viewModel.currentItem) {
      setFormData(viewModel.currentItem);
    }
  }, [viewModel.currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemId) {
      viewModel.updateItem(itemId, formData);
    } else {
      viewModel.createItem(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Content"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      {/* 다른 필드들... */}
      <button type="submit">{itemId ? 'Update' : 'Create'} Item</button>
    </form>
  );
});

export default ItemForm;