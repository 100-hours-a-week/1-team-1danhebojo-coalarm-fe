import axiosInstance from './axios';

const userApi = {

  // 회원 정보 조회
  getUserInfo: async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },


  //디스코드 웹훅 URL 연동 또는 삭제
  connectDiscord: async (webHookUrl) => {
    try {
      const requestData = {
        web_hook_url: webHookUrl
      };

      // 백엔드 API 호출
      const response = await axiosInstance.patch('/users/discord', requestData);
      
      return response.data;

    } catch (error) {
      // 백엔드 에러 처리
      if (error.response?.status === 400) {
        throw new Error('유효하지 않은 디스코드 웹훅 URL입니다.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw error; // 이미 Error 객체인 경우
      } else {
        throw new Error('디스코드 웹훅 연동 중 오류가 발생했습니다.');
      }
    }
  },

  // 웹훅 연동 해제
  disconnectDiscord: async () => {
    try {
      const response = await axiosInstance.delete('/users/discord');
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw error;
      } else {
        throw new Error('디스코드 웹훅 연동 해제 중 오류가 발생했습니다.');
      }
    }
  },

  //회원 정보 수정
  updateUserProfile: (userData) => {
    const formData = new FormData();
    
    if (userData.nickname) {
      formData.append('nickname', userData.nickname);
    }
    
    if (userData.profileImage) {
      formData.append('profileImage', userData.profileImage);
    }
    
    return axiosInstance.patch('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 알람 히스토리 목록 조회
  getAlertHistory: (offset = 0, limit = 5) => {
    return axiosInstance.get('/alerts/history', {
      params: { 
        offset, 
        limit,
        sort: 'registeredDate,desc'
      }
    });
  },

  // 알람 히스토리 상세 조회
  getAlertDetail: async (alertHistoryId) => {
    const response = await axiosInstance.get(`/alerts/history/${alertHistoryId}`);
    return response;
  },

  //회원 탈퇴
  deleteAccount: () => {
    return axiosInstance.delete('/users');
  },

  //로그아웃

  logout: () => {
    return axiosInstance.post('/users/logout');
  },

};

export default userApi;