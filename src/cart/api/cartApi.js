import { API_BASE_URL, ACCESS_TOKEN } from "../../config/app-config";

// API 호출을 위한 범용 함수
export function call(api, method, request) {
    // 기본 헤더 설정
    let headers = new Headers({
      "Content-Type": "application/json",
    });

    // 로컬 스토리지에서 액세스 토큰을 가져와 헤더에 추가
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

    // 요청 본문이 있는 경우 JSON 문자열로 변환하여 추가
    if (request) {
      options.body = JSON.stringify(request);
    }

    // fetch를 사용하여 API 호출 및 응답 처리
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
        console.log(error.status);
        // 403 에러 시 로그인 페이지로 리다이렉트
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      });
}

// 장바구니 목록 조회
export function list(page = 0, size = 6) {
    return call(`/carts/list?page=${page}&size=${size}`, "GET");
}

// 장바구니에 상품 추가
export function addToCart(itemId, quantity) {
  const data = { quantity: quantity };
  return call(`/carts/${itemId}`, 'POST', data);
}

// 장바구니 상품 수량 업데이트
export function updateCartItemQuantity(itemCartId, upDown) {
  return call(`/carts/itemcarts/${itemCartId}?upDown=${upDown}`, 'PUT');
}

// 장바구니에서 상품 제거
export function removeFromCart(itemCartId) {
  return call(`/carts/itemcarts/${itemCartId}`, 'DELETE');
}