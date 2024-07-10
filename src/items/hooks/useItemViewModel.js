import { useState, useCallback, useMemo, useEffect } from 'react';
import { getItemDetail, itemList, getItemsByCategory, searchItems } from '../api/itemApi';

export const useItemViewModel = () => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [topSellingItems, setTopSellingItems] = useState([]);
    const [sortOption, setSortOption] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');

    const calculateFinalPrice = (item) => {
        if (item.discountPrice !== undefined && item.discountPrice !== null) {
            return item.discountPrice;
        }
        if (item.discountRate !== undefined && item.discountRate !== null) {
            return item.price * (1 - item.discountRate / 100);
        }
        return item.price;
    };
    const fetchItems = useCallback(async (page = 0, size = 20, category = null) => {
        setLoading(true);
        try {
            let data;
            if (searchKeyword) {
                data = await searchItems(searchKeyword);
            } else if (category) {
                data = await getItemsByCategory(category, page, size);
            } else {
                data = await itemList(page, size);
            }
            setItems(data.content || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError(err.message);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [searchKeyword]);

    const fetchItem = useCallback(async (itemId) => {
        setLoading(true);
        try {
            const response = await getItemDetail(itemId);
            console.log('API response:', response);
            if (!response || (!response.item && !response.reviews)) {
                throw new Error('Invalid response structure');
            }
            setItem(response);
            setError(null);
            return response;
        } catch (error) {
            console.error('Error fetching item detail:', error);
            setError(error.message);
            setItem(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTopSellingItems = useCallback(async () => {
        setLoading(true);
        try {
            const data = await itemList(0, 100); // Fetch a large number of items
            const sorted = (data.content || []).sort((a, b) => (b.sales || 0) - (a.sales || 0));
            setTopSellingItems(sorted.slice(0, 4)); // Get top 4
            setError(null);
        } catch (err) {
            console.error('Error fetching top selling items:', err);
            setError(err.message);
            setTopSellingItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const sortedItems = useMemo(() => {
        let sorted = [...items];
        switch (sortOption) {
            case 'latest':
                sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
                break;
            case 'oldest':
                sorted.sort((a, b) => (a.id || 0) - (b.id || 0));
                break;
            case 'priceHigh':
                sorted.sort((a, b) => {
                    const finalPriceA = calculateFinalPrice(a);
                    const finalPriceB = calculateFinalPrice(b);
                    return finalPriceB - finalPriceA;
                });
                break;
            case 'priceLow':
                sorted.sort((a, b) => {
                    const finalPriceA = calculateFinalPrice(a);
                    const finalPriceB = calculateFinalPrice(b);
                    return finalPriceA - finalPriceB;
                });
                break;
            default:
                break;
        }
        return sorted;
    }, [items, sortOption]);

    const changeSort = useCallback((newSortOption) => {
        setSortOption(newSortOption);
    }, []);

    const handleSearch = useCallback((keyword) => {
        setSearchKeyword(keyword);
        fetchItems();
    }, [fetchItems]);

    const clearSearch = useCallback(() => {
        setSearchKeyword('');
        fetchItems();
    }, [fetchItems]);

    return {
        items: sortedItems,
        item,
        loading,
        error,
        topSellingItems,
        sortOption,
        searchKeyword,
        fetchItems,
        fetchItem,
        fetchTopSellingItems,
        changeSort,
        handleSearch,
        clearSearch,
        calculateFinalPrice
    };
};