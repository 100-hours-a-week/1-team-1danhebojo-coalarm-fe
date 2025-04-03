import axiosInstance from './axios';

const userApi = {

  //로그아웃
  logout: () => {
    return axiosInstance.get('/auth/logout');
  },

};

export default userApi;