import { API_BASE_URL } from "../../config/app-config";
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
    const json = await response.json();

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
      return Promise.reject(json);
    }
    return json;
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

// 장바구니 비우기
export function clearCart() {
  return call("/carts/clear", "POST")
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