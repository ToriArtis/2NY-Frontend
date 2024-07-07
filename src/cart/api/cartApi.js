import { API_BASE_URL } from "../../config/app-config";

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
        response.json().then((json) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
      )
      .catch((error) => {
        // 403 에러 시 로그인 페이지로 리다이렉트
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      });
}

// 장바구니 목록 조회 API
export function list(page = 0, size = 6) {
  return call(`/carts/list?page=${page}&size=${size}`, "GET");
}

// 장바구니에 상품 추가 API
export function addToCart(itemId, quantity) {
  return call(`/carts/${itemId}`, "POST", { quantity });
}

// 장바구니 상품 수량 업데이트 API
export function updateCartItemQuantity(itemCartId, upDown) {
  return call(`/carts/itemcarts/${itemCartId}?upDown=${upDown}`, "PUT");
}

// 장바구니에서 상품 제거 API
export function removeFromCart(itemCartId) {
  return call(`/carts/itemcarts/${itemCartId}`, "DELETE")
    .then(response => {
      if (response.status === 204) {
        return true; // 성공적으로 삭제됨
      }
      throw new Error('Failed to remove item from cart');
    })
    .catch(error => {
      if (error.name === 'SyntaxError') {
        // JSON 파싱 오류가 발생했지만, 이는 예상된 동작일 수 있습니다 (빈 응답)
        return true;
      }
      throw error;
    });
}

