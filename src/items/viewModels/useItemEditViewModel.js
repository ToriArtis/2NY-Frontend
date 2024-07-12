import { useState, useCallback, useEffect } from 'react';
import { getItemDetail, itemUpdate } from '../api/itemApi';

export default function useItemEditViewModel(id) {
  const [values, setValues] = useState({
    title: '',
    content: '',
    price: 0,
    discountRate: 0,
    category: '',
    color: '',
    size: '',
    thumbnail: null,
    descriptionImage: []
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState([]);

  const colorOptions = ["BLACK", "WHITE", "GRAY"];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const fetchItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getItemDetail(id);
      console.log('API response:', response);
      const data = response.item; // item 객체에서 데이터 추출
      setValues({
        id: data.itemId, // itemId를 id로 매핑
        title: data.title || '',
        content: data.content || '',
        price: data.price || 0,
        discountRate: data.discountRate || 0,
        category: data.category || '',
        color: data.color || '',
        size: data.size || '',
        thumbnail: data.thumbnail ? data.thumbnail[0] : null, // 첫 번째 썸네일 이미지
        descriptionImage: data.descriptionImage || []
      });
      setThumbnailPreview(data.thumbnail ? data.thumbnail[0] : null);
      setDescriptionImagePreviews(data.descriptionImage || []);
    } catch (err) {
      console.error('Error fetching item:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: name === 'price' || name === 'discountRate' ? Number(value) : value
    }));
  };

  const handleContentChange = (content) => {
    setValues(prevValues => ({
      ...prevValues,
      content: content
    }));
  };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      setValues(prevValues => ({
        ...prevValues,
        thumbnail: files[0]
      }));
      setThumbnailPreview(URL.createObjectURL(files[0]));
    } else if (name === 'descriptionImage') {
      const newFiles = Array.from(files);
      setValues(prevValues => ({
        ...prevValues,
        descriptionImage: [...(Array.isArray(prevValues.descriptionImage) ? prevValues.descriptionImage : []), ...newFiles]
      }));
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setDescriptionImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleSubmit = async (event, navigate) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      const itemDTO = {
        title: values.title || '',
        content: values.content || '',
        price: values.price || 0,
        discountPrice: (values.price || 0) * (1 - (values.discountRate || 0) / 100),
        discountRate: values.discountRate || 0,
        sales: values.sales || 0,
        color: values.color || '',
        size: values.size || '',
        category: values.category || '',
        avgStar: values.avgStar || 0
      };

      formData.append('itemDTO', new Blob([JSON.stringify(itemDTO)], {type: "application/json"}));
      
      if (values.thumbnail instanceof File) {
        formData.append('thumbnailFiles', values.thumbnail);
      }
      
      if (Array.isArray(values.descriptionImage)) {
        values.descriptionImage.forEach((file, index) => {
          if (file instanceof File) {
            formData.append(`descriptionImageFiles`, file);
          }
        });
      }

      console.log('FormData content:', formData);
      
      const result = await itemUpdate(id, formData);
      console.log('Update result:', result);

      alert("상품이 성공적으로 수정되었습니다.");
      navigate(`/items/${id}`);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.message);
    }
  };

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
    handleContentChange,
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