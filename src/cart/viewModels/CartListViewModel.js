import React, { useEffect, useState } from "react";
import { list } from "../api/cartApi";


export function CartsListViewModel() {
    // 에러 상태를 관리하는 state
    const [error, setError] = useState(null);
    // 장바구니 목록을 관리하는 state
    const [carts, setCarts] = useState([]);


    useEffect(() => {
        // 장바구니 목록을 가져오는 비동기 함수
        async function fetchCarts() {
            try {
                // API를 호출하여 장바구니 목록을 가져옴
                const fetchedCarts = await list();
                // 가져온 데이터가 배열인지 확인
                if (Array.isArray(fetchedCarts)) {
                    // 배열이면 carts state를 업데이트
                    setCarts(fetchedCarts);
                } else {
                    // 배열이 아니면 에러 로그를 출력하고 빈 배열로 설정
                    console.error('Fetched carts is not an array:', fetchedCarts);
                    setCarts([]);
                }
            } catch (error) {
                // 에러가 발생하면 error state를 업데이트
                setError(error.message || 'An error occurred while fetching carts');
            }
        }
    
        // 컴포넌트가 마운트될 때 fetchCarts 함수를 호출
        fetchCarts();
    }, []);  // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행되도록 함

    return {
        carts,
        error
    };
}