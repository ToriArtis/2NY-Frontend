import { API_BASE_URL } from "../../config/app-config";
import { clearCart } from "../../cart/api/cartApi";

// API 호출을 위한 기본 함수
export function call(api, method, request) {
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

    // fetch를 사용하여 API 호출
    return fetch(options.url, options)
      .then((response) => 
        response.text().then((text) => {
          if (!response.ok) {
            // 응답이 JSON 형식이면 JSON으로 파싱하여 반환, 그렇지 않으면 일반 텍스트 반환
            try{
              const json = JSON.parse(text);
              return Promise.reject(json);
            } catch (error) {
              return Promise.reject({ message: text });
            }
          }
          // 응답이 빈 경우를 고려하여 처리
          return text ? JSON.parse(text) : {};
        })
      )
      .catch((error) => {
        console.log(error.status);
        // 403 에러 시 로그인 페이지로 리다이렉트
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      });
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
      console.error("Error creating order from cart:", error);
      throw error;
    });
}

// 주문 취소 API
export function cancelOrder(orderId) {
  return call(`/orders/${orderId}`, "DELETE");
}

// 전체 주문 목록 조회 (관리자 기능)
export function getAllOrders(page = 0, size = 6) {
  const userRoles = localStorage.getItem("USER_ROLESET");
  if (!(userRoles && userRoles.includes("ADMIN"))) {
    throw new Error("관리자 권한이 필요합니다.");
  }
  return call(`/orders/all?page=${page}&size=${size}`, "GET");
}

// 주문 현황 수정 (관리자 기능)
export function completeOrder(orderId) {
  const userRoles = localStorage.getItem("USER_ROLESET");
  if (!(userRoles === userRoles.includes("ADMIN"))) {
    throw new Error("관리자 권한이 필요합니다.");
  }
  return call(`/orders/${orderId}/complete`, "PUT");
}