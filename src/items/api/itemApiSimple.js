// app-config.js 파일에서 API_BASE_URL을 가져옵니다.
import { API_BASE_URL, ACCESS_TOKEN } from "../../config/app-config";

// API 호출을 위한 함수
export function call(api, method, request) {
  // 기본 헤더 설정
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    // 액세스 토큰이 있으면 Authorization 헤더에 추가
    headers.append("Authorization", "Bearer " + accessToken);
  }

  // API 요청 옵션 설정
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET 메소드가 아닌 경우, 요청 본문을 JSON 문자열로 변환하여 추가
    options.body = JSON.stringify(request);
  }

  // fetch를 사용하여 API 호출
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if(response.status === 401) {
          // 401 에러 처리 (예: 토큰 만료)
        } else if (!response.ok) {
          // response.ok가 true이면 정상적인 응답, 아니면 에러 응답
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      // 에러 처리
      if (error.status === 403) {
        // 403 에러(권한 없음)인 경우 로그인 페이지로 리디렉션
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
}
export function itemCreate(itemData) {
  const formData = new FormData();

  // ItemDTO 데이터를 JSON 문자열로 변환하여 추가
  formData.append('itemDTO', new Blob([JSON.stringify({
    title: itemData.title,
    content: itemData.content,
    price: itemData.price,
    discountPrice: itemData.discountPrice,
    discountRate: itemData.discountRate,
    sales: itemData.sales,
    color: itemData.color,
    size: itemData.size,
    category: itemData.category,
    avgStar: itemData.avgStar
  })], { type: 'application/json' }));

  // 썸네일 이미지 파일 추가
  if (itemData.thumbnail) {
    itemData.thumbnail.forEach((file, index) => {
      formData.append(`thumbnailFiles`, file);
    });
  }

  // 상세 이미지 파일 추가
  if (itemData.descriptionImage) {
    itemData.descriptionImage.forEach((file, index) => {
      formData.append(`descriptionImageFiles`, file);
    });
  }

  // API 요청 보내기
  return fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    },
    body: formData
  }).then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}

// 아이템 수정
export function itemUpdate(id, itemData) {
  console.log("itemUpdate", id, itemData);
  return call(`/items/${id}`, "PUT", itemData);
}
// 아이템 목록 조회
export function getItemList(params) {
  return call("/items", "GET", params);
}

// 아이템 상세 조회
export function getItemDetail(id) {
  return fetch(`${API_BASE_URL}/items/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
    return response.json();
  });
}

// 아이템 삭제
export const itemDelete = async (id) => {
  console.log("itemDelete");
  try {
    const response = await call(`/items/${id}`, "DELETE");
    console.log(response);
    return !!response; // response가 truthy면 true, falsy면 false 반환
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};

