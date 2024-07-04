import React, { useState, useEffect } from "react";
import { info } from "../api/userApi";

export default function useUserInfoViewModel() {
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        email: '',
        password: '',
        realName: '',
        nickName: '',
        address: '',
        detailAddress: '',
        phone: '',
    });

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userInfo = await info();
                setValues(userInfo);
            } catch (error) {
                setError('회원 정보를 불러오지 못했습니다.');
                console.error('회원 정보를 불러오지 못했습니다:', error);
            }
        }

        fetchUserInfo();
    }, []);

    return {
        ...values,
        error,
    };
}