import '../components/css/CreateItem.css';
import React from 'react';
import { Link } from 'react-router-dom';
import useItemCreateViewModel from '../viewModels/useItemCreateViewModel';


const ItemCreateView = () => {
  const {
    title,
    content,
    price,
    discountRate,
    category,
    color,
    size,
    handleChange,
    handleFileChange,
    handleSubmit,
    error,
    colorOptions,
    sizeOptions,
    thumbnailPreview,
    descriptionImagePreviews
  } = useItemCreateViewModel();
  return (
    <div className="create-item-container">
      
      <div className="main-content">
        <h1>상품 등록</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
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
                  {descriptionImagePreviews.map((preview, index) => (
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
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">상품 정보</label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">상품 가격</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="discountRate">할인율</label>
                <input
                  type="number"
                  id="discountRate"
                  name="discountRate"
                  value={discountRate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">상품 분류</label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  <option value="TOP">TOP</option>
                  <option value="OUTER">OUTER</option>.
                  <option value="SKIRT">SKIRT</option>
                  <option value="BOTTOM">BOTTOM</option>
                  <option value="DRESS">DRESS</option>

                </select>
              </div>
              <div className="form-group">
                <label htmlFor="color">색상</label>
                <select
                  id="color"
                  name="color"
                  value={color}
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
                  value={size}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  {sizeOptions.map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>

                <div className="button-group">
                  <button type="button" className="button button-cancel">취소</button>
                  <button type="submit" className="button button-submit">등록</button>
                </div>

              </div>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};


export default ItemCreateView;