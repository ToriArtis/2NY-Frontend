import { useState, useCallback, useEffect } from 'react';
import { itemRead, itemList } from '../api/itemApi';
import { itemCreate, itemDelete, itemUpdate } from '../../users/api/userApi';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { getItemDetail, itemList, getItemsByCategory, searchItems } from '../api/itemApi';

export const useItemViewModel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topSellingItems, setTopSellingItems] = useState([]);

  const fetchItems = useCallback(async () => {
    // console.log('fetchItems called');
    setLoading(true);
    try {
      const data = await itemList();
      // console.log('Fetched data:', data);
      setItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      // console.error('Error fetching items:', err);
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchItem = useCallback(async (id) => {
    // console.log(`fetchItem called with id: ${id}`);
    setLoading(true);
    try {
      const data = await itemRead(id);
      // console.log('Fetched item data:', data);
      setError(null);
      return data;
    } catch (err) {
      // console.error(`Error fetching item with id ${id}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback(async (itemData) => {
    // console.log('createItem called with data:', itemData);
    setLoading(true);
    try {
      const newItem = await itemCreate(itemData);
      // console.log('Created new item:', newItem);
      setItems(prev => [...prev, newItem]);
      setError(null);
      return newItem;
    } catch (err) {
      // console.error('Error creating item:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (id, itemData) => {
    // console.log(`updateItem called with id: ${id}, data:`, itemData);
    setLoading(true);
    try {
      const updatedItem = await itemUpdate(id, itemData);
      // console.log('Updated item:', updatedItem);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      setError(null);
      return updatedItem;
    } catch (err) {
      // console.error(`Error updating item with id ${id}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    // console.log(`deleteItem called with id: ${id}`);
    setLoading(true);
    try {
      await itemDelete(id);
      // console.log(`Item with id ${id} deleted`);
      setItems(prev => prev.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      // console.error(`Error deleting item with id ${id}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // console.log('Items in useItemViewModel updated:', items);
  }, [items]);

  const fetchTopSellingItems = useCallback(async () => {
    setLoading(true);
    try {
        const data = await itemList(0, 100); // Fetch a large number of items
        const sorted = data.content.sort((a, b) => b.sales - a.sales);
        setTopSellingItems(sorted.slice(0, 4)); // Get top 4
        setError(null);
    } catch (err) {
        // console.error('Error fetching top selling items:', err);
        setError(err.message);
        setTopSellingItems([]);
    } finally {
        setLoading(false);
    }
}, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
    topSellingItems,
    fetchTopSellingItems,
  };
};