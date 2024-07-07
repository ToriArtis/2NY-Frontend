import { useState, useCallback, useEffect } from 'react';
import { itemRead,  itemList } from '../api/itemApi';


export const useItemViewModel = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});

    const fetchItems = useCallback(async (page = 0, size = 20) => {
        console.log('fetchItems called');
        setLoading(true);
        try {
          const data = await itemList(page, size);
          console.log('Fetched data:', data);
          if (data && data.content) {
            setItems(data.content);
            setPagination({
              totalPages: data.totalPages,
              totalElements: data.totalElements,
              size: data.size,
              number: data.number
            });
          } else {
            setItems([]);
            setPagination({});
          }
          setError(null);
        } catch (err) {
          console.error('Error fetching items:', err);
          setError(err.message);
          setItems([]);
          setPagination({});
        } finally {
          setLoading(false);
        }
      }, []);
  const fetchItem = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await itemRead(id);
      setError(null);
      return data;
    } catch (err) {
      console.error(`Error fetching item with id ${id}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

 
//   const updateItem = useCallback(async (id, itemData) => {
//     setLoading(true);
//     try {
//       const updatedItem = await itemUpdate(id, itemData);
//       setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
//       setError(null);
//       return updatedItem;
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteItem = useCallback(async (id) => {
//     setLoading(true);
//     try {
//       await itemDelete(id);
//       setItems(prev => prev.filter(item => item.id !== id));
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);



  return {
    items,
    loading,
    error,
    pagination,
    fetchItems,
    fetchItem
  };
};