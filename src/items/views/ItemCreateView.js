import React, { useState, useEffect } from 'react';
import useItemCreateViewModel from '../viewModels/useItemCreateViewModel';


export default function ItemCreateView() {
  const { title, content, thumbnail, descriptionImage, price, discountPrice, discountRate
    , sales, size, color, category, avgStar, handleChange, handleSubmit, error   } 
      = useItemCreateViewModel();

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={title} onChange={handleChange} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={content} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={price} onChange={handleChange} required />
        </div>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};
