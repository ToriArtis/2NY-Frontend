import { encrypt, decrypt } from './crypto';

// 로컬스토리지에 암호화된 데이터 저장
export const setItem = (key, value) => {
    // 데이터 암호화 후 저장
    const encryptedValue = encrypt(value);
    localStorage.setItem(key, encryptedValue);
};

// 암호화된 데이터를 가져와 복호화
export const getItem = (key) => {
    // 암호화된 데이터 가져오기
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      // 데이터 복호화 후 반환
      return decrypt(encryptedValue);
    }
  return null;
};

// 로컬스토리지에서 데이터 삭제
export const removeItem = (key) => {
    localStorage.removeItem(key);
};