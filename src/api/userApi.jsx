import axiosInstance from './axios';

const userApi = {

  // 회원 정보 조회
  getUserInfo: async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },


  //디스코드 웹훅 URL 연동
  connectDiscord: (webHookUrl) => {
    return axiosInstance.patch('/users/discord', {
      web_hook_url: webHookUrl
    });
  },

  //회원 정보 수정
  updateUserProfile: (userData) => {
    const formData = new FormData();
    
    if (userData.nickname) {
      formData.append('nickname', userData.nickname);
    }
    
    if (userData.profileImage) {
      formData.append('profile_image', userData.profileImage);
    }
    
    return axiosInstance.patch('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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