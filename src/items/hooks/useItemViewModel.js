import { useState, useCallback, useMemo, useEffect } from 'react';
import { getItemDetail, itemList, getItemsByCategory, searchItems, getItemsByFilter } from '../api/itemApi';

export const useItemViewModel = () => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [topSellingItems, setTopSellingItems] = useState([]);
    const [sortOption, setSortOption] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterColor, setFilterColor] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [currentCategory, setCurrentCategory] = useState(null);
    const [pagination, setPagination] = useState({});


    const calculateFinalPrice = (item) => {
        if (item.discountPrice !== undefined && item.discountPrice !== null) {
            return item.discountPrice;
        }
        if (item.discountRate !== undefined && item.discountRate !== null) {
            return item.price * (1 - item.discountRate / 100);
        }
        return item.price;
    };

    const fetchItems = useCallback(async (page = 0, size = 20, category = null, keyword = null) => {
        // console.log('fetchItems called', { keyword, category, filterColor, filterSize });
        setLoading(true);
        try {
            let data;
            if (keyword) {
                data = await searchItems(keyword);
                setCurrentCategory(null);
            } else if (category) {
                data = await getItemsByCategory(category, page, size);
                setCurrentCategory(category);
            } else {
                data = await itemList(page, size);
                setCurrentCategory(null);
            }
            // console.log('Fetched data:', data);
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
            // console.error('Error fetching items:', err);
            setError(err.message);
            setItems([]);;
            setPagination({});
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchItem = useCallback(async (itemId, page = 0, size = 10) => {
        setLoading(true);
        try {
            const response = await getItemDetail(itemId, page, size);
            // console.log('API response:', response);
            if (!response || (!response.item && !response.reviews)) {
                throw new Error('Invalid response structure');
            }
            setItem(response);
            setError(null);
            return response;
        } catch (error) {
            // console.error('Error fetching item detail:', error);
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
            const data = await itemList(0, 100);
            const sorted = (data.content || []).sort((a, b) => (b.sales || 0) - (a.sales || 0));
            setTopSellingItems(sorted.slice(0, 4));
            setError(null);
        } catch (err) {
            // console.error('Error fetching top selling items:', err);
            setError(err.message);
            setTopSellingItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // 색상&사이즈 필터
    const filteredItems = useMemo(() => {
        return items.filter(item =>
            (!filterColor || item.color === filterColor) &&
            (!filterSize || item.size === filterSize)
        );
    }, [items, filterColor, filterSize]);

    const sortedItems = useMemo(() => {
        let sorted = [...filteredItems];
        switch (sortOption) {
            case 'latest':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'priceHigh':
                sorted.sort((a, b) => calculateFinalPrice(b) - calculateFinalPrice(a));
                break;
            case 'priceLow':
                sorted.sort((a, b) => calculateFinalPrice(a) - calculateFinalPrice(b));
                break;
            default:
                break;
        }
        return sorted;
    }, [filteredItems, sortOption, calculateFinalPrice]);

    const changeSort = useCallback((newSortOption) => {
        setSortOption(newSortOption);
    }, []);

    const handleSearch = useCallback((keyword) => {
        // console.log('handleSearch called with keyword:', keyword);
        setSearchKeyword(keyword);
        fetchItems(0, 1000, null, keyword);
    }, [fetchItems]);


    const resetFilters = useCallback(() => {
        setFilterColor('');
        setFilterSize('');
    }, []);

    const clearSearch = useCallback(() => {
        // console.log('clearSearch called');
        setSearchKeyword('');
        setCurrentCategory(null);
        resetFilters();
    }, [resetFilters]);

    const handleColorFilter = useCallback((color) => {
        setFilterColor(color);
    }, []);

    const handleSizeFilter = useCallback((size) => {
        setFilterSize(size);
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setCurrentCategory(category);
        setFilterColor('');
        setFilterSize('');
        fetchItems(0, 1000, category);
    }, [fetchItems]);

    return {
        items: sortedItems,
        item,
        loading,
        error,
        topSellingItems,
        sortOption,
        searchKeyword,
        filterColor,
        filterSize,
        currentCategory,
        pagination,
        fetchItems,
        fetchItem,
        fetchTopSellingItems,
        changeSort,
        handleSearch,
        clearSearch,
        handleColorFilter,
        handleSizeFilter,
        handleCategoryChange,
        calculateFinalPrice,
        resetFilters
    };
};