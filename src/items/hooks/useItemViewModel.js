import { useState, useCallback } from 'react';
import { getItemDetail, itemList } from '../api/itemApi';

export const useItemViewModel = () => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
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

    const fetchItem = useCallback(async (itemId) => {
        setLoading(true);
        try {
            const response = await getItemDetail(itemId);
            setItem(response);
            setError(null);
        } catch (error) {
            console.error('Error fetching item detail:', error);
            setError(error.message);
            setItem(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        items,
        item,
        loading,
        error,
        pagination,
        fetchItems,
        fetchItem
    };
};