import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useItemViewModel } from '../hooks/useItemViewModel';

const ItemList = observer(() => {
  const viewModel = useItemViewModel();

  useEffect(() => {
    viewModel.fetchItems();
  }, [viewModel]);

  if (viewModel.loading) return <div>Loading...</div>;
  if (viewModel.error) return <div>Error: {viewModel.error}</div>;

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {viewModel.items.map(item => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => viewModel.fetchItem(item.id)}>View</button>
            <button onClick={() => viewModel.deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ItemList;