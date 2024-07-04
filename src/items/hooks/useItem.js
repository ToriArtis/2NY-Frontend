import { useState, useEffect, useCallback } from 'react';
import { ItemViewModel } from '../viewModels/ItemViewModel';

const useItem = () => {
  const [viewModel] = useState(() => new ItemViewModel());
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadItems = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      await viewModel.loadItems(page, size);
      setItems(viewModel.items);
    } catch (err) {
      setError(err.message || 'An error occurred while loading items');
    } finally {
      setLoading(false);
    }
  }, [viewModel]);

  useEffect(() => {
    loadItems();
  }, []); // 컴포넌트가 마운트될 때만 실행

  return { items, loading, error, loadItems };
};

export default useItem;