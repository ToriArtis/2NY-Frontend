// 사용자 객체 생성을 위한 클래스
class User {
    constructor(email, realName, password, nickName, address, detailAddress, phone) {
     
      this.email = email; // 이메일
      this.password = password; // password
      this.realName = realName; // real name
      this.nickName = nickName; // real name
      this.address = address; // real name
      this.detailAddress = detailAddress; // real name
      this.phone = phone; // real name
    }
  
    // 사용자 정보를 문자열로 반환
    toString() {
      return `User: ${this.realName} (${this.email})`;
    }
  }
  
  // 이메일 유효성 검사 함수
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // 비밀번호 유효성 검사 함수 (최소 8자, 대소문자, 숫자, 특수문자 포함)
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
  
  // 사용자 객체 생성 함수
  function createUser(email, username, password, nickName, address, detailAddress, phone) {
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address');
    }
    if (!isValidPassword(password)) {
      throw new Error('Invalid password. It must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
    }
    // 실제 애플리케이션에서는 ID를 서버에서 생성하거나 UUID를 사용할 수 있습니다.
    
    return new User(email, username, password, nickName, address, detailAddress, phone);
  }
  
  // 사용자 객체를 평문 객체로 변환 (API 요청 등에 사용)
  function userToPlainObject(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      // 보안상 비밀번호는 제외
    };
  }
  
  export {
    User,
    isValidEmail,
    isValidPassword,
    createUser,
    userToPlainObject
  };