import axiosInstance from './axios';

const dashboardApi = {
  /**
   * 통합 대시보드 지표 정보를 가져옵니다.
   * @param {symbol} symbol - 코인 symbol
   * @returns {Promise} API 응답
   */
  getDashboardIndex: (symbol) => {
    return axiosInstance.get(`/dashboard/${symbol}/index`);
  },
  
  /**
   * 김치 프리미엄 데이터를 가져옵니다.
   * @param {number} offset - 페이지 오프셋
   * @param {number} limit - 반환할 결과 개수
   * @returns {Promise} API 응답
   */
  getKimchiPremium: (offset = 0, limit = 20) => {
    return axiosInstance.get(`/dashboard/kimchi`, {
      params: { offset, limit }
    });
  },

  /**
   * 실시간 체결 내역을 가져옵니다.
   * @param {number} coinId - 코인 ID
   * @param {number} limit - 반환할 결과 개수
   * @returns {Promise} API 응답
   */
  getRecentTransactions: (coinId, limit = 5) => {
    return axiosInstance.get(`/transactions/${coinId}/recent`, {
      params: { limit }
    });
  },

  /**
   * 고래 체결 내역을 가져옵니다.
   * @param {number} coinId - 코인 ID
   * @param {number} limit - 반환할 결과 개수
   * @returns {Promise} API 응답
   */
  getWhaleTransactions: (coinId, limit = 5) => {
    return axiosInstance.get(`/transactions/${coinId}/whale`, {
      params: { limit }
    });
  },
  
  /**
   * 특정 코인의 차트 데이터를 가져옵니다.
   * @param {number} coinId - 코인 ID
   * @param {string} interval - 데이터 간격 (1m, 5m, 15m, 1h, 4h, 1d)
   * @param {number} limit - 반환할 결과 개수
   * @returns {Promise} API 응답
   */
  getChartData: (coinId, interval = '1d', limit = 30) => {
    return axiosInstance.get(`/chart/${coinId}`, {
      params: { interval, limit }
    });
  },
  
  /**
   * 코인 검색 결과를 가져옵니다.
   * @returns {Promise} API 응답
   * @param params
   */
   searchCoins: (params) => {
    return axiosInstance.request({
      method: 'GET',
      url: `/coins/search`,
      params
    });
  },

  /**
   * 공포&탐욕 지수를 가져옵니다.
   * @returns {Promise} API 응답
   */
  getFearGreedIndex: () => {
    return fetch('https://api.alternative.me/fng/')
    .then(res => res.json())
    .then(data => {
      const index = data?.data?.[0];
      return {
        value: Number(index?.value || 0),
        label: index?.value_classification || 'Unknown',
        updatedAt: Number(index?.timestamp || 0),
      };
    });
  },
  
};

export default dashboardApi;