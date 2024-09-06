import { API_BASE_URL } from "../../config/app-config";
import { clearCart } from "../../cart/api/cartApi";
import { getItem } from "../../users/utils/storage";

// API 호출을 위한 기본 함수
export async function call(api, method, request) {
  // 헤더 설정
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 액세스 토큰 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  // API 요청 옵션 설정
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  // GET 요청이 아닌 경우, 요청 본문 추가
  if (request) {
    options.body = JSON.stringify(request);
  }

  try {
    // fetch를 사용하여 API 호출
    const response = await fetch(options.url, options);
    const text = await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        // 액세스 토큰 만료 시 리프레시
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // 새 액세스 토큰으로 원래 요청 재시도
          return call(api, method, request);
        } else {
          // 리프레시 실패 시 로그인 페이지로 리다이렉트
          window.location.href = "/login";
          return Promise.reject({ message: "세션이 만료되었습니다. 다시 로그인해주세요." });
        }
      }
      // 다른 에러의 경우
      try {
        const json = JSON.parse(text);
        return Promise.reject(json);
      } catch (error) {
        return Promise.reject({ message: text });
      }
    }
    // 응답이 빈 경우를 고려하여 처리
    return text ? JSON.parse(text) : {};
  } catch (error) {
    if (error.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
}

// 액세스 토큰 갱신 함수
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("ACCESS_TOKEN", data.accessToken);
      return true;
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      return false;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}
// 주문 목록 조회 API
export function list(page = 0, size = 6) {
  return call(`/orders/list?page=${page}&size=${size}`, "GET");
}

// 주문 내역 상세 조회
export function getOrder(orderId) {
  return call(`/orders/${orderId}`, "GET");
}

// 새로운 주문 생성 API
export function createOrder(itemOrders) {
  return call("/orders", "POST", itemOrders);
}

// 장바구니에서 주문 생성 API
export function createOrderFromCart() {
  return call("/orders/from-cart", "POST")
    .then(response => {
      return clearCart().then(() => response);
    })
    .catch(error => {
      alert("주문 생성 중 오류가 발생했습니다.");
      throw error;
    });
}

// 주문 취소 API
export function cancelOrder(orderId) {
  return call(`/orders/${orderId}`, "DELETE");
}

// 전체 주문 목록 조회 (관리자 기능)
export function getAllOrders(page = 0, size = 6) {
  return call(`/orders/all?page=${page}&size=${size}`, "GET");
}

// 주문 현황 수정 (관리자 기능)
export function updateOrderStatus(orderId, status) {
  return call(`/orders/${orderId}/status?status=${status}`, "PUT");
}