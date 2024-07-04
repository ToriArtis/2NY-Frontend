import React from 'react';
import { observer } from 'mobx-react-lite';
import { useItemViewModel } from '../hooks/useItemViewModel';

const ItemDetail = observer(() => {
  const viewModel = useItemViewModel();

  if (!viewModel.currentItem) return null;

  return (
    <div>
      <h2>{viewModel.currentItem.title}</h2>
      <p>{viewModel.currentItem.content}</p>
      <p>Price: ${viewModel.currentItem.price}</p>
      {/* 다른 상품 정보들 */}
    </div>
  );
});

export default ItemDetail;