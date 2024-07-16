import { API_BASE_URL } from "../../config/app-config";

// API 호출을 위한 기본 함수
const call = async (api, method, request) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  const options = {
    headers: headers,
    method: method,
  };

  if (request && method !== "GET") {
    options.body = JSON.stringify(request);
  }

  try {
    const response = await fetch(API_BASE_URL + api, options);
    const json = await response.json();

    if (response.status === 401) {
      // 401 에러 처리 (예: 토큰 만료)
      // 여기에 적절한 처리 로직 추가
    } else if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  } catch (error) {
    if (error.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
};

// 아이템 생성
export const itemCreate = async (itemData) => {
  // console.log("Attempting to create item:", itemData);
  const formData = new FormData();

  // ItemDTO 데이터를 JSON 문자열로 변환하여 추가
  formData.append('itemDTO', new Blob([JSON.stringify({
    title: itemData.title,
    content: itemData.content,
    price: Number(itemData.price),
    discountPrice: Number(itemData.discountPrice),
    discountRate: Number(itemData.discountRate),
    sales: Number(itemData.sales),
    color: itemData.color,
    size: itemData.size,
    category: itemData.category,
    avgStar: Number(itemData.avgStar)
  })], { type: 'application/json' }));

  // 썸네일 이미지 파일 추가
  if (itemData.thumbnail && itemData.thumbnail.length > 0) {
    itemData.thumbnail.forEach((file, index) => {
      formData.append(`thumbnailFiles`, file);
    });
  }

  // 상세 이미지 파일 추가
  if (itemData.descriptionImage && itemData.descriptionImage.length > 0) {
    itemData.descriptionImage.forEach((file, index) => {
      formData.append(`descriptionImageFiles`, file);
    });
  }


  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create item');
    }

    return response.json();
  } catch (error) {
    // console.error("Error creating item:", error);
    throw error;
  }
};


// 아이템 수정

export const itemUpdate = async (id, itemData) => {
  // console.log("itemUpdate", id);

  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      },
      body: itemData
    });

    if (!response.ok) {
      const errorData = await response.text();
      // console.error('Server error response:', errorData);
      throw new Error(errorData || 'Failed to update item');
    }

    const result = await response.json();
    // console.log('Server response:', result);
    return result;
  } catch (error) {
    // console.error("Error updating item:", error);
    throw error;
  }
};

// 아이템 목록 조회
export const itemList = async (page = 0, size = 20) => {
  try {
    // console.log(`Calling itemList API with page: ${page}, size: ${size}`);
    const response = await call(`/items?page=${page}&size=${size}`, "GET");
    // console.log('API response:', response);

    if (response && Array.isArray(response.content)) {
      return {
        content: response.content.map(item => ({
          ...item,
          id: item.id || item.itemId
        })),
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
        number: response.number
      };
    } else {
      // console.error('Invalid API response structure:', response);
      return { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    }
  } catch (error) {
    // console.error('Error fetching items:', error);
    throw error;
  }
};


// 아이템 상세 조회 (이름을 getItemDetail로 변경)
export const getItemDetail = async (id, page = 0, size = 10) => {
  try {
    const response = await call(`/items/${id}?page=${page}&size=${size}`, "GET");
    // console.log('API response:', response);
    return response;
  } catch (error) {
    // console.error(`Error fetching item with id ${id}:`, error);
    throw error;
  }
};

// 아이템 삭제 (함수 추가)
export const itemDelete = async (id) => {
  // console.log("itemDelete");
  try {
    const response = await call(`/items/${id}`, "DELETE");
    // console.log(response);
    return !!response;
  } catch (error) {
    // console.error("Error deleting item:", error);
    return false;
  }
};

// 카테고리별 아이템 목록 조회
export const getItemsByCategory = async (category, page = 0, size = 20) => {
  try {
    // console.log(`Calling getItemsByCategory API with category: ${category}, page: ${page}, size: ${size}`);
    const response = await fetch(`${API_BASE_URL}/items/category/${category}?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("권한이 없습니다. 로그인이 필요할 수 있습니다.");
      }
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    // console.log('API response:', data);

    if (data && Array.isArray(data.content)) {
      return {
        content: data.content.map(item => ({
          ...item,
          id: item.id || item.itemId
        })),
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        size: data.size,
        number: data.number
      };
    } else {
      // console.error('Invalid API response structure:', data);
      return { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    }
  } catch (error) {
    // console.error('Error fetching items by category:', error);
    throw error;
  }
};

// 상품 검색
export const searchItems = async (keyword) => {
  try {
    const response = await call(`/items/search?title=${encodeURIComponent(keyword)}`, "GET");
    if (response && Array.isArray(response.content)) {
      return {
        content: response.content.map(item => ({
          ...item,
          id: item.id || item.itemId
        })),
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
        number: response.number
      };
    } else {
      console.warn('Invalid search response structure:', response);
      return { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    }
  } catch (error) {
    // console.error('Error searching items:', error);
    throw error;
  }
};

// 색상&사이즈 필터
export const getItemsByFilter = async (category, color, size) => {
  try {
      let url = `${API_BASE_URL}/items/filter?`;
      const params = [];

      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (color) params.push(`color=${encodeURIComponent(color)}`);
      if (size) params.push(`size=${encodeURIComponent(size)}`);

      url += params.join('&');

      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
          }
      });
      if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      throw error;
  }
};