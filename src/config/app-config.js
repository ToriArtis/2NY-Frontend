let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
  backendHost = "https://dev.2ny.kro.kr";
}


export const API_BASE_URL = `${backendHost}`;

// 이미지 URL 생성
export const getImageUrl = (filename) => `${API_BASE_URL}/items/images/${filename}`;

// 액세스 토큰을 저장하기 위한 키 상수
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const USER_NICKNAME = "USER_NICKNAME";
export const USER_EMAIL = "USER_EMAIL";
export const USER_ROLESET = "USER_ROLESET";

// 기본 헤더 설정
let headers = new Headers({
  "Content-Type": "application/json",
});

// 로컬 스토리지에서 ACCESS TOKEN 가져오기
const accessToken = localStorage.getItem(ACCESS_TOKEN);
if (accessToken && accessToken !== null) {
  // 액세스 토큰이 있으면 Authorization 헤더에 추가
  headers.append("Authorization", "Bearer " + accessToken);
}

export { headers };
