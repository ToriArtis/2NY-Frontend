import { useState, useCallback } from 'react';
import { getItemDetail, itemUpdate } from '../api/itemApi';

export default function useItemEditViewModel(id) {
  // 상태 관리
  const [values, setValues] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState([]);

  // 옵션 값들
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  // 아이템 정보 불러오기
  const fetchItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getItemDetail(id);
      setValues(data);
      setThumbnailPreview(data.thumbnail);
      setDescriptionImagePreviews(data.descriptionImage);
      
      // 서버에서 색상과 사이즈 옵션을 제공하지 않는 경우를 대비해 기본값 설정
      setColorOptions(data.colorOptions || [ "BLACK", "WHITE", "GRAY"]);
      setSizeOptions(data.sizeOptions || ["XS", "S", "M", "L", "XL", "XXL"]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // 입력 필드 변경 핸들러
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

    if (name === 'thumbnail' && files[0]) {
      setThumbnailPreview(URL.createObjectURL(files[0]));
    } else if (name === 'descriptionImage') {
      const previews = Array.from(files).map(file => URL.createObjectURL(file));
      setDescriptionImagePreviews(previews);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event, navigate) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    try {
      await itemUpdate(id, values);
      alert("상품이 성공적으로 수정되었습니다.");
      navigate(`/items/${id}`); // 상세 페이지로 리다이렉트
    } catch (error) {
      setError(error.message);
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
    return true;
  };

  return {
    values,
    handleChange,
    handleFileChange,
    handleSubmit,
    error,
    isLoading,
    colorOptions,
    sizeOptions,
    thumbnailPreview,
    descriptionImagePreviews,
    fetchItem
  };
}