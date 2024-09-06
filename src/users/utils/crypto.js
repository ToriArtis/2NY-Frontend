import CryptoJS from 'crypto-js';

const SECRET_KEY = 'fK9#mR2$pL7@wX4&tN6*cJ1%hB8_zQ3';

// 데이터 암호화
export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// 암호화된 데이터를 복호화
export const decrypt = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    console.error('Decryption failed:', err);
    return null;
  }
};

// 로컬스토리지에 암호화된 데이터 저장
export const setItem = (key, value) => {
  const encryptedValue = encrypt(value);
  localStorage.setItem(key, encryptedValue);
};

// 암호화된 데이터를 가져와 복호화
export const getItem = (key) => {
  const encryptedValue = localStorage.getItem(key);
  if (encryptedValue) {
    return decrypt(encryptedValue);
  }
  return null;
};

// 로컬스토리지에서 데이터 삭제
export const removeItem = (key) => {
  localStorage.removeItem(key);
};