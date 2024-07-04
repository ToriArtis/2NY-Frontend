import axios from 'axios';

const BASE_URL = 'http://localhost:8080/items'; // 백엔드 서버 URL

// 인증 토큰을 가져오는 함수 (로컬 스토리지나 상태 관리 라이브러리에서 가져오도록 수정 필요)
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 아이템 목록 조회
export const itemList = async (page = 0, size = 20) => {
  try {
    console.log(`Calling itemList API with page: ${page}, size: ${size}`);
    const response = await axios.get(BASE_URL, { params: { page, size } });
    console.log('API response:', response);
    console.log('API response data:', response.data);
    
    // 데이터 구조 확인 및 필요한 경우 변환
    if (response.data && Array.isArray(response.data.content)) {
      return {
        content: response.data.content.map(item => ({
          ...item,
          id: item.id || item.itemId // itemId를 사용하거나 id가 없는 경우 대비
        })),
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        size: response.data.size,
        number: response.data.number
      };
    } else {
      console.error('Invalid API response structure:', response.data);
      return { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// 특정 아이템 조회
export const itemRead = async (id) => {
  try {
    console.log(`Fetching item with id: ${id}`);
    const response = await api.get(`/${id}`);
    console.log('API response:', response);
    console.log('API response data:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    throw error;
  }
};

// 아이템 생성
export const itemCreate = async (itemData) => {
  try {
    const response = await axios.post(BASE_URL, itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// 아이템 수정
export const itemUpdate = async (id, itemData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with id ${id}:`, error);
    throw error;
  }
};

// 아이템 삭제
export const itemDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting item with id ${id}:`, error);
    throw error;
  }
};