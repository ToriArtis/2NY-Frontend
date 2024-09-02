import '../components/css/CreateItem.css';
import React, { useRef } from 'react';
import useItemCreateViewModel from '../viewModels/useItemCreateViewModel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    descriptionImagePreviews,
    handleContentChange
  } = useItemCreateViewModel();

  // React Quill 에디터 설정
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  // React Quill 에디터에서 사용할 포맷 설정
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background'
  ];

  const thumbnailInputRef = useRef(null);
  const descriptionImageInputRef = useRef(null);

  const handleFileButtonClick = (inputRef) => {
    inputRef.current.click();
  };

  return (
    <div className="create-item-container">
      <div className="main-content">
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="image-upload-section">
              <div className="image-upload-group">
                <label htmlFor="thumbnail">썸네일 이미지</label>
                {thumbnailPreview && (
                  <div className="image-preview">
                    <img src={thumbnailPreview} alt="썸네일 미리보기" /> 
                  </div>
                )}
                <div className="file-input-wrapper">
                  <button type="button" className="btn-file-input" onClick={() => handleFileButtonClick(thumbnailInputRef)}>
                    파일 선택
                  </button>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <span className="file-input-name">
                    {thumbnailPreview ? '썸네일' : '선택된 파일 없음'}
                  </span>
                </div>
              </div>
  
              <div className="image-upload-group">
                <label htmlFor="descriptionImage">상세 이미지</label>
                <div className="image-preview-container">
                  {descriptionImagePreviews.map((preview, index) => (
                    <div key={index} className="image-preview">
                      <img src={preview} alt={`상세 이미지 ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="file-input-wrapper">
                  <button type="button" className="btn-file-input" onClick={() => handleFileButtonClick(descriptionImageInputRef)}>
                    파일 선택
                  </button>
                  <input
                    ref={descriptionImageInputRef}
                    type="file"
                    id="descriptionImage"
                    name="descriptionImage"
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                  />
                  <span className="file-input-name">
                    {descriptionImagePreviews.length > 0 ? `${descriptionImagePreviews.length}개의 파일` : '선택된 파일 없음'}
                  </span>
                </div>
              </div>
            </div>
  
            <div className="item-details-section">
              <div className="form-group full-width">
                <label htmlFor="title">상품명</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
  
              <div className="form-group full-width">
                <label htmlFor="content">상품 정보</label>
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                  theme="snow"
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
                  <option value="OUTER">OUTER</option>
                  <option value="SKIRT">SKIRT</option>
                  <option value="PANTS">PANTS</option>
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
              </div>
            </div>
          </div>
  
          <div className="button-group">
            <button type="button" className="button button-cancel" onClick={() => window.history.back()}>취소</button>
            <button type="submit" className="button button-submit">등록</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemCreateView;