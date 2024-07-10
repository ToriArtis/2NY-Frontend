import { useState, useCallback, useMemo, useEffect } from 'react';
import { getItemDetail, itemList, getItemsByCategory, searchItems } from '../api/itemApi';

export const useItemViewModel = () => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [sortOption, setSortOption] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');

    const fetchItems = useCallback(async (page = 0, size = 20, category = null) => {
        console.log('fetchItems called');
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
            console.log('Fetched data:', data);

            if (data && Array.isArray(data)) { // 배열인 경우 실행
                setItems(data);
                setPagination({});
            } else if (data && data.content) {
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
    }, [searchKeyword]);

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
                sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case 'priceLow':
                sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            default:
                break;
        }
        return sorted;
    }, [items, sortOption]);

    const changeSort = (newSortOption) => {
        setSortOption(newSortOption);
    };

    // 검색 핸들러
    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
        fetchItems();
    };

    // 검색 상태를 초기화
    const clearSearch = useCallback(() => {
        setSearchKeyword('');
      }, []);

    return {
        items: sortedItems,
        item,
        loading,
        error,
        pagination,
        fetchItems,
        fetchItem,
        changeSort,
        sortOption,
        searchKeyword,
        handleSearch,
        clearSearch
    };
};