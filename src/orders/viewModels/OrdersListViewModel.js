import React, { useEffect, useState } from "react";
import { list } from "../api/ordersApi";

export function OrdersListViewModel() {
    // 에러 상태를 관리하는 state
    const [error, setError] = useState(null);
    // 주문 목록을 관리하는 state
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        // 주문 목록을 가져오는 비동기 함수
        async function fetchOrders() {
            try {
                 // API를 호출하여 주문 목록을 가져옴
                const fetchedOrders = await list();
                 // 가져온 데이터가 배열인지 확인
                if (Array.isArray(fetchedOrders)) {
                    // 배열이면 orders state를 업데이트
                    setOrders(fetchedOrders);
                } else {
                    // 배열이 아니면 에러 로그를 출력하고 빈 배열로 설정
                    console.error('Fetched orders is not an array:', fetchedOrders);
                    setOrders([]);
                }
            } catch (error) {
                // 에러가 발생하면 error state를 업데이트
                setError(error.message || 'An error occurred while fetching orders');
            }
        }
        // 컴포넌트가 마운트될 때 fetchOrders 함수를 호출
        fetchOrders();
    }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행되도록 함

    return {
        orders,
        error
    };
}