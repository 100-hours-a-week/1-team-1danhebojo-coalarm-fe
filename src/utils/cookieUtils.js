/**
 * 쿠키에서 토큰 값을 가져오는 함수
 * @returns {string|null} 토큰 값 또는 null (토큰이 없는 경우)
 */
export function getTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('Authorization=')) {
        return cookie.substring('Authorization='.length, cookie.length);
      }
    }
    return null;
  }
  
  /**
   * 쿠키 삭제 함수
   * @param {string} name 삭제할 쿠키 이름
   */
  export function deleteCookie(name) {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
  
  /**
   * 사용자 로그인 상태 확인
   * @returns {boolean} 로그인 여부
   */
  export function isUserLoggedIn() {
    return !!getTokenFromCookie();
  }