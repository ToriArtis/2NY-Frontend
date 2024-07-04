import React from 'react';
import useItem from '../hooks/useItem';
import { Items } from '../components/Items';

const ItemView = () => {
  const { items, loading, error } = useItem();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">상품 목록</h1>
      <Items items={items} />
    </div>
  );
};

export default ItemView;