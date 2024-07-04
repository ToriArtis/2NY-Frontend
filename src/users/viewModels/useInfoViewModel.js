import React, { useState, useEffect } from "react";
import { info } from "../api/userApi";

export default function useInfoViewModel() {
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
            } 
            catch (error) {
                console.log(error);
                if(error.error === 'Login failed') {
                    setError('로그인하지 않음. 이메일와 비밀번호를 확인해주세요.');
                    console.error('로그인하지 않음. 이메일와 비밀번호를 확인해주세요:', error);
                    window.location.href = '/login';
                }
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