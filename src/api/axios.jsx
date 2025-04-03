import axios from 'axios';
import { toast } from 'sonner';

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    // 예: 토큰을 헤더에 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response.data;
  },
  (error) => {
    // 오류 응답 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.error('API Error:', error.response.status, error.response.data);
      
      // 429 Too Many Requests 오류 처리
      if (error.response.status === 429) {
        // 서버에서 제공한 대기 시간 정보 확인 (분 단위)
        const waitMinutes = error.response.data?.waitMinutes || 1;
        
        // 사용자에게 토스트 메시지 표시
        toast.error(`요청 한도를 초과했습니다. ${waitMinutes}분 후에 다시 시도해주세요.`, {
          duration: 10000, // 10초 동안 표시
        });
      }
      
      // 401 Unauthorized 오류 처리 예시
      if (error.response.status === 401) {
        // 로그아웃 처리 또는 토큰 갱신 로직
        localStorage.removeItem('token');
        // 로그인 페이지로 리다이렉트 등의 처리
      }
    } else if (error.request) {
      // 요청이 만들어졌으나 응답을 받지 못한 경우
      console.error('API Error: No response received', error.request);
    } else {
      // 요청 설정 중에 오류가 발생한 경우
      console.error('API Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;