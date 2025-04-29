import axiosInstance from "./axios.jsx";

const predictApi = {
    /**
     * 사용자의 알람에 설정된 코인 목록을 조회합니다.
     * @returns {Promise} API 응답
     * @param params
     */
    getPredict: (params) => {
        return axiosInstance.request({
            method: 'GET',
            url: `/coins/predict`,
            params,
        });
    }
};

export default predictApi;