// app-config.js 파일에서 API_BASE_URL을 가져옵니다.
import { API_BASE_URL } from "../../config/app-config";

// 액세스 토큰을 저장하기 위한 키 상수
const ACCESS_TOKEN = "ACCESS_TOKEN";

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
        if (!response.ok) {
          // response.ok가 true이면 정상적인 응답, 아니면 에러 응답
          return Promise.reject(json);
        }
        console.log(json);
        return json;
      })
    )
    .catch((error) => {
      // 에러 처리
      console.log(error.status);
      if (error.status === 403) {
        // 403 에러(권한 없음)인 경우 로그인 페이지로 리디렉션
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
}



// 회원가입 함수
export function signup(userDTO) {
  console.log("회원가입: ", userDTO);
  return call("/users", "POST", userDTO);
}