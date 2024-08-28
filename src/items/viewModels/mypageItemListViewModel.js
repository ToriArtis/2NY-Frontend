import React, { useEffect, useState } from "react";
import { itemList } from "../api/itemApi";

export default function UserListViewModel() {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage]);

    // 아이템 목록을 가져오는 비동기 함수
    async function fetchItems(page) {
        try {
            const fetchedItems = await itemList(page);
           
            if (fetchedItems && Array.isArray(fetchedItems.content)) {
                setItems(fetchedItems.content);
                setTotalPages(fetchedItems.totalPages);
            } else {
                setItems([]);
            }
        } catch (error) {
            alert(error.message || '아이템을 가져오는 동안 오류가 발생했습니다.');
        }
    }

    // 페이지 변경
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return {
        items,
        error,
        currentPage,
        totalPages,
        paginate
    };
}