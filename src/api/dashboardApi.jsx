import axiosInstance from './axios';

const dashboardApi = {
  /**
   * 통합 대시보드 지표 정보를 가져옵니다.
   * @param {number} coinId - 코인 ID
   * @returns {Promise} API 응답
   */
  getDashboardIndex: (coinId) => {
    return axiosInstance.get(`/dashboard/${coinId}/index`);
  },
  
  /**
   * 김치 프리미엄 데이터를 가져옵니다.
   * @param {number} offset - 페이지 오프셋
   * @param {number} limit - 반환할 결과 개수
   * @returns {Promise} API 응답
   */
  getKimchiPremium: (offset = 0, limit = 5) => {
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
   * @param {string} query - 검색어
   * @returns {Promise} API 응답
   */
  searchCoins: (query) => {
    return axiosInstance.get(`/coins`);
  },

  /**
   * 공포&탐욕 지수를 가져옵니다.
   * @returns {Promise} API 응답
   */
  getFearGreedIndex: () => {
    return axiosInstance.get(`/indicators/fear-greed`);
  },
  
  /**
   * 롱/숏 비율 지표를 가져옵니다.
   * @param {number} coinId - 코인 ID
   * @returns {Promise} API 응답
   */
  getLongShortRatio: (coinId) => {
    return axiosInstance.get(`/indicators/${coinId}/long-short-ratio`);
  },
  
  /**
   * RSI 지표를 가져옵니다.
   * @param {number} coinId - 코인 ID
   * @returns {Promise} API 응답
   */
  getRsiIndicator: (coinId) => {
    return axiosInstance.get(`/indicators/${coinId}/rsi`);
  },
  
  /**
   * MACD 지표를 가져옵니다.
   * @param {number} coinId - 코인 ID
   * @returns {Promise} API 응답
   */
  getMacdIndicator: (coinId) => {
    return axiosInstance.get(`/indicators/${coinId}/macd`);
  }
};

export default dashboardApi;