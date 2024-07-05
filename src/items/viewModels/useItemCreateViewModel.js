import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { itemCreate } from "../api/itemApiSimple";

export default function useItemCreateViewModel() {
    const [error, setError] = useState(null);
    const { values, handleChange } = useForm({
        title: "",
        content: "",
        thumbnail: [],
        descriptionImage: [],
        price: 0,
        discountPrice: 0,
        discountRate: 0,
        sales: 0,
        size: "",
        color: "",
        category: "",
        avgStar: 0
    });

    // 유효성 검사 함수들
    const validateTitle = (title) => {
        return title.length > 0 && title.length <= 100;
    };

    const validateContent = (content) => {
        return content.length > 0;
    };

    const validatePrice = (price) => {
        return price > 0;
    };

    const validateDiscountRate = (rate) => {
        return rate >= 0 && rate <= 100;
    };

    const validateCategory = (category) => {
        const validCategories = ["SKIRT", "TOP", "BOTTOM"]; // 유효한 카테고리 목록
        return validCategories.includes(category);
    };

    const validateForm = () => {
        if (!validateTitle(values.title)) {
            setError("제목은 1자 이상 100자 이하여야 합니다.");
            return false;
        }
        if (!validateContent(values.content)) {
            setError("상품 설명을 입력해주세요.");
            return false;
        }
        if (!validatePrice(values.price)) {
            setError("가격은 0보다 커야 합니다.");
            return false;
        }
        if (!validateDiscountRate(values.discountRate)) {
            setError("할인율은 0에서 100 사이여야 합니다.");
            return false;
        }
        if (!validateCategory(values.category)) {
            setError("올바른 카테고리를 선택해주세요.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        
        // if (!validateForm()) return;

        try {
            await itemCreate(values);
            // 성공 처리 로직 (예: 상품 목록 페이지로 리디렉션)
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        ...values,
        handleChange,
        handleSubmit,
        error,
    };
}