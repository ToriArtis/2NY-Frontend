import { useState, useCallback, useEffect } from 'react';
import { getItemDetail, itemUpdate } from '../api/itemApi';
import { getImageUrl } from '../../config/app-config';


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
    descriptionImages: []
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState([]);
  const [thumbnailAction, setThumbnailAction] = useState('none'); // 'none', 'delete', 'update'

  const colorOptions = ["BLACK", "WHITE", "GRAY"];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const fetchItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getItemDetail(id);
      const data = response.item;
      setValues({
        id: data.itemId,
        title: data.title || '',
        content: data.content || '',
        price: data.price || 0,
        discountRate: data.discountRate || 0,
        category: data.category || '',
        color: data.color || '',
        size: data.size || '',
        thumbnail: data.thumbnail ? data.thumbnail[0] : null,
        descriptionImages: data.descriptionImage || []
      });
      setThumbnailPreview(data.thumbnail ? getImageUrl(data.thumbnail[0]) : null);
      setDescriptionImagePreviews(data.descriptionImage ? data.descriptionImage.map(img => getImageUrl(img)) : []);
    } catch (err) {
      setError("상품 정보를 불러오는 데 실패했습니다.");
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
    setValues(prevValues => ({ ...prevValues, content }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      const file = files[0];
      setValues(prevValues => ({ ...prevValues, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
      setThumbnailAction('update');
    } else if (name === 'descriptionImages') {
      const newFiles = Array.from(files);
      setValues(prevValues => ({
        ...prevValues,
        descriptionImages: [...prevValues.descriptionImages, ...newFiles]
      }));
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setDescriptionImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeThumbnail = () => {
    
    setValues(prevValues => ({ ...prevValues, thumbnail: null }));
    setThumbnailPreview(null);
    setThumbnailAction('delete');
  };

  const removeDescriptionImage = (index) => {
    setValues(prevValues => ({
      ...prevValues,
      descriptionImages: prevValues.descriptionImages.filter((_, i) => i !== index)
    }));
    setDescriptionImagePreviews(prev => prev.filter((_, i) => i !== index));
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

  const handleSubmit = async (event, navigate) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
  
    try {
      const formData = new FormData();
      const itemDTO = {
        title: values.title,
        content: values.content,
        price: values.price,
        discountPrice: values.price * (1 - values.discountRate / 100),
        discountRate: values.discountRate,
        color: values.color,
        size: values.size,
        category: values.category,
      };
  
      formData.append('itemDTO', new Blob([JSON.stringify(itemDTO)], {type: "application/json"}));
      
      if (values.thumbnail instanceof File) {
        formData.append('thumbnailFiles', values.thumbnail);
        // console.log('Appending new thumbnail file:', values.thumbnail);
      }
      
      values.descriptionImages.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`descriptionImageFiles`, file);
        }
      });
  
      // FormData 내용 로깅
      for (let [key, value] of formData.entries()) {
        // console.log(key, value);
      }
  
      const result = await itemUpdate(id, formData);
      // console.log('Update result:', result);
  
      alert("상품이 성공적으로 수정되었습니다.");
      navigate(`/items/${id}`);
    } catch (error) {
      // console.error("Error in handleSubmit:", error);
      setError("상품 수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return {
    values,
    handleChange,
    handleContentChange,
    handleFileChange,
    removeThumbnail,
    removeDescriptionImage,
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