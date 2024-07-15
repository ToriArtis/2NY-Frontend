import { API_BASE_URL } from "../../config/app-config";

// 액세스 토큰을 저장하기 위한 키 상수
const ACCESS_TOKEN = "ACCESS_TOKEN";
const USER_NICKNAME = "USER_NICKNAME";
const USER_ROLESET = "USER_ROLESET";
const USER_EMAIL ="USER_EMAIL";
// 로그인 함수
export async function login(userDTO) {
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": userDTO.email,
      "password": userDTO.password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    try {
      const response = await fetch(API_BASE_URL + "/users/login", requestOptions);
      
      if (!response.ok) {
        // HTTP 오류 상태 처리 (400, 401, 403 등)
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("로그인 성공:", result);
  
      if (result.accessToken) {
        localStorage.setItem(ACCESS_TOKEN, result.accessToken);
        localStorage.setItem(USER_NICKNAME, result.nickName);
        localStorage.setItem(USER_EMAIL, result.email);
        if(result.roleSet) localStorage.setItem(USER_ROLESET, result.roleSet);
        if(result.refreshToken) localStorage.setItem("REFRESH_TOKEN", result.refreshToken);
        if(result.provider) localStorage.setItem("PROVIDER", result.provider);

        if(window.history.back() === '/logout') window.location.href = "/";
        else window.history.back();
        
      } else {
        throw new Error("토큰이 없습니다.");
      }
  
      return result;
    } catch (error) {
      console.error("로그인 오류:", error);
      throw error;  // 오류를 상위로 전파하여 컴포넌트에서 처리할 수 있게 함
    }
  }
  
  // 로그아웃 함수
  export default function Logout() {
    console.log("signout");
    // 로컬 스토리지에 제거
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_NICKNAME);
    localStorage.removeItem(USER_ROLESET);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem("PROVIDER");
    // 로그인 페이지로 리디렉션
    window.location.href = "/login";
  }
