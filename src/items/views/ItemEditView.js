import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getItemDetail, itemDelete } from '../api/itemApi';
import useItemEditViewModel from '../viewModels/useItemEditViewModel';
import '../components/css/EditItem.css';

const ItemEditView = () => {
  // URL 파라미터와 네비게이션 훅
  const { id } = useParams();
  const navigate = useNavigate();
  // 커스텀 훅 사용
  const {
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
  } = useItemEditViewModel(id);

  // 컴포넌트 마운트 시 아이템 정보 로드
  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      try {
        await itemDelete(id);
        alert('상품이 성공적으로 삭제되었습니다.');
        navigate('/items');
      } catch (error) {
        alert(error.message);
      }
    }
  };
  // 로딩 중 표시
  if (isLoading) return <div>Loading...</div>;

  // 에러 표시
  if (error) return <div className="error-message">{error}</div>;

  // 아이템이 없을 경우
  if (!values || !colorOptions || !sizeOptions) return <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="edit-item-container">
      
      <div className="main-content">
        <h1>상품 수정</h1>
        <form onSubmit={(e) => handleSubmit(e, navigate)}>
          <div className="form-container">
            <div className="image-upload-section">
              <div className="form-group">
                <label htmlFor="thumbnail">썸네일 이미지</label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleFileChange}
                />
                {thumbnailPreview && (
                  <div className="image-preview">
                    <img src={thumbnailPreview} alt="썸네일 미리보기" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="descriptionImage">상세 이미지</label>
                <input
                  type="file"
                  id="descriptionImage"
                  name="descriptionImage"
                  onChange={handleFileChange}
                  multiple
                />
                <div className="image-preview-container">
                  {(descriptionImagePreviews || []).map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`상세 이미지 ${index + 1}`} />
                  </div>
                ))}
              </div>
              </div>
            </div>
            <div className="item-details-section">
              <div className="form-group">
                <label htmlFor="title">상품명</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">상품 정보</label>
                <textarea
                  id="content"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">상품 가격</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="discountRate">할인율</label>
                <input
                  type="number"
                  id="discountRate"
                  name="discountRate"
                  value={values.discountRate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">상품 분류</label>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  <option value="SKIRT">SKIRT</option>
                  <option value="TOP">TOP</option>
                  <option value="BOTTOM">BOTTOM</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="color">색상</label>
                <select
                  id="color"
                  name="color"
                  value={values?.color || ''}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  {colorOptions.map((colorOption) => (
                    <option key={colorOption} value={colorOption}>
                      {colorOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="size">사이즈</label>
                <select
                  id="size"
                  name="size"
                  value={values?.size || ''}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  {sizeOptions.map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>
          <div className="button-group">
            <Link to={`/items/${id}`} className="button button-cancel">취소</Link>
            <button type="submit" className="button button-submit">수정</button>
            <button type="button" className="button button-delete" onClick={handleDelete}>삭제</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemEditView;