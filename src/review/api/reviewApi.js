import { API_BASE_URL, ACCESS_TOKEN } from "../../config/app-config";
import { getItem } from "../../users/utils/storage";

// API 호출을 위한 함수
export async function call(api, method, request) {
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

  try {
    // fetch를 사용하여 API 호출
    const response = await fetch(options.url, options);
    const json = await response.json();

    if (response.status === 401) {
      // 액세스 토큰이 만료된 경우
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");
      if (refreshToken) {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem("ACCESS_TOKEN", refreshData.accessToken);
          // 새로운 액세스 토큰으로 원래 요청 재시도
          return call(api, method, request);
        } else {
          // 리프레시 토큰도 만료된 경우 로그아웃 처리
          localStorage.removeItem("ACCESS_TOKEN");
          localStorage.removeItem("REFRESH_TOKEN");
          window.location.href = "/login";
        }
      } else {
        // 리프레시 토큰이 없는 경우 로그인 페이지로 리다이렉트
        window.location.href = "/login";
      }
    }

    if (!response.ok) {
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

// 리뷰 등록 
export function createReview(ReviewDTO) {
  return call("/review", "POST", ReviewDTO)
}

// 특정 리뷰 조회
export function getReview(reviewId) {
  return call(`/review/${reviewId}`, "GET");
}

// 리뷰 수정
export function modifyReview(reviewId, reviewDTO) {
  return call(`/review/${reviewId}`, "PUT", reviewDTO)
}

// 로그인한 사용자의 리뷰 목록 조회
export function userReviewList(page = 0, size = 10) {
  return call(`/review/user?page=${page}&size=${size}`, "GET");
}

// 리뷰 삭제
export function deleteReview(reviewId) {
  return call(`/review/${reviewId}`, "DELETE");
}

// 특정 상품의 리뷰 목록 조회
export function getReviewsByItemId(itemId, page = 0, size =10) {
  return call(`/review/item/${itemId}?page=${page}&size=${size}`, "GET");
}