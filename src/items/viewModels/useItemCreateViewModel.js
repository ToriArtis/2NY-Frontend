import { useState } from "react";
import { itemCreate } from "../api/itemApiSimple";

export default function useItemCreateViewModel() {
    // 상품 정보를 담을 상태
    const [values, setValues] = useState({
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
    
    // 에러 메시지를 담을 상태
    const [error, setError] = useState(null);

    // 썸네일 이미지 미리보기 URL을 담을 상태
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    // 상세 이미지들의 미리보기 URL들을 담을 상태
    const [descriptionImagePreviews, setDescriptionImagePreviews] = useState([]);

    // 색상 옵션
    const colorOptions = ["RED", "BLUE", "GREEN", "BLACK", "WHITE", "YELLOW"];

    // 사이즈 옵션
    const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

    // 일반 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    // 파일 입력 필드 변경 핸들러
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: Array.from(files)
        }));

        // 썸네일 이미지 미리보기 생성
        if (name === 'thumbnail' && files[0]) {
            setThumbnailPreview(URL.createObjectURL(files[0]));
        } 
        // 상세 이미지들 미리보기 생성
        else if (name === 'descriptionImage') {
            const previews = Array.from(files).map(file => URL.createObjectURL(file));
            setDescriptionImagePreviews(previews);
        }
    };

    // 폼 유효성 검사
    const validateForm = () => {
        if (!values.title) {
            setError("제목을 입력해주세요.");
            return false;
        }
        if (!values.content) {
            setError("상품 설명을 입력해주세요.");
            return false;
        }
        if (values.price <= 0) {
            setError("가격은 0보다 커야 합니다.");
            return false;
        }
        if (values.discountRate < 0 || values.discountRate > 100) {
            setError("할인율은 0에서 100 사이여야 합니다.");
            return false;
        }
        if (!values.category) {
            setError("카테고리를 선택해주세요.");
            return false;
        }
        if (!values.color) {
            setError("색상을 선택해주세요.");
            return false;
        }
        if (!values.size) {
            setError("사이즈를 선택해주세요.");
            return false;
        }
        if (values.thumbnail.length === 0) {
            setError("썸네일 이미지를 선택해주세요.");
            return false;
        }
        return true;
    };

    // 폼 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        
        if (!validateForm()) return;

        try {
            await itemCreate(values);
            alert("상품이 성공적으로 등록되었습니다.");
            // 성공 후 처리 (예: 페이지 이동)
        } catch (error) {
            setError(error.message);
        }
    };

    // 컴포넌트에서 사용할 값들과 함수들을 반환
    return {
        ...values,
        handleChange,
        handleFileChange,
        handleSubmit,
        error,
        colorOptions,
        sizeOptions,
        thumbnailPreview,
        descriptionImagePreviews
    };
}