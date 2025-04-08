import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import dashboardApi from '../api/dashboardApi';

// 지표 컴포넌트 import
import FearGreedIndex from '../components/indicators/FearGreedIndex';
import MacdIndicator from '../components/indicators/MacdIndicator';
import RsiIndicator from '../components/indicators/RsiIndicator';
import LongShortRatio from '../components/indicators/LongShortRatio';
import KimchiPremium from '../components/indicators/KimchiPremium';
import TransactionList from '../components/transactions/TransactionList';

import TradingViewChart from '../components/dashboard/TradingViewChart';
import CoinSearch from '../components/dashboard/CoinSearch';

function Dashboard() {
  const { symbol = "BTC" } = useParams();

  const [coinData, setCoinData] = useState({ symbol: 'BTC', name: '비트코인' });
  const [fearGreedIndex, setFearGreedIndex] = useState(null);
  const [macdData, setMacdData] = useState({ 
    macd: -987.29, 
    signal: -687.23, 
    histogram: -489.38,
    trend: 'FALL'
  });
  const [rsiData, setRsiData] = useState(45.7);
  const [shortLongData, setShortLongData] = useState({ longRatio: 52.39, shortRatio: 47.61 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  

  // API 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 통합 대시보드 API 요청
        const dashboardResponse = await dashboardApi.getDashboardIndex(symbol);
        console.log(dashboardResponse)
        // 요청 성공 및 데이터 확인
        if (dashboardResponse.status === "success" && dashboardResponse.data) {
          const dashboardData = dashboardResponse.data;
          console.log(dashboardData);
          
          // 코인 정보 설정
          if (dashboardData.coin) {
            setCoinData({
              coinId: dashboardData.coin.coinId,
              symbol: dashboardData.coin.symbol,
              name: dashboardData.coin.name
            });
          }
          
          // RSI 데이터 설정
          if (dashboardData.rsi && dashboardData.rsi.value !== undefined) {
            setRsiData(Number(dashboardData.rsi.value));
          }
          
          // MACD 데이터 설정
          if (dashboardData.macd) {
            setMacdData({
              macd: Number(dashboardData.macd.value),
              signal: Number(dashboardData.macd.signal),
              histogram: Number(dashboardData.macd.histogram),
              trend: dashboardData.macd.trend
            });
          }
          
          // 롱/숏 비율 데이터 설정
          if (dashboardData.ratio && 
              dashboardData.ratio.longRatio !== undefined && 
              dashboardData.ratio.shortRatio !== undefined) {
            setShortLongData({
              longRatio: Number(dashboardData.ratio.longRatio),
              shortRatio: Number(dashboardData.ratio.shortRatio)
            });
          }
          
        }
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();

    // 15초마다 데이터 업데이트
    // const intervalId = setInterval(fetchData, 15000);
    
    // 최근 검색 기록 불러오기
    const savedSearches = localStorage.getItem('recentCoinSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
    // return () => clearInterval(intervalId);
  }, [symbol]); // symbol이 변경될 때마다 데이터 재요청

  useEffect(() => {
    dashboardApi.getFearGreedIndex()
      .then((fg) => {
        setFearGreedIndex(fg.value);
      })
      .catch((err) => {
        console.error("공포탐욕 API 실패", err);
      });
  }, []);

  // 통화 포맷 함수
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  // 코인 선택 핸들러 추가
  const handleCoinSelect = (selectedCoin) => {
    if (selectedCoin && selectedCoin.coinId && selectedCoin.symbol && selectedCoin.name) {
      // 코인 데이터 업데이트
      setCoinData({
        coinId: selectedCoin.coinId,
        symbol: selectedCoin.symbol,
        name: selectedCoin.name
      });
    } else {
      console.error("유효하지 않은 코인 데이터:", selectedCoin);
    }
  };


  return (
    <div className="flex bg-[#0E106C] min-h-screen overflow-hidden">
      {/* 사이드바 컴포넌트 */}
      <Sidebar />
      
      {/* 메인 컨텐츠 */}
      <div className="flex-1 p-5 overflow-y-auto h-[calc(100vh-80px)] mt-[80px] ml-[300px]">
        {/* 알림 배너 */}
        <div className="flex items-center bg-blue-800 rounded-md p-3 mb-5 relative">
          <div className="mr-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white text-m">모든 투자에 대한 책임은 전적으로 투자자 본인에게 있습니다. 코알람은 투자 판단을 돕기 위한 정보 제공 서비스일 뿐, 어떠한 투자 결정도 대신하지 않습니다.</p>
          <button className="absolute right-3 text-white">
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-white">데이터를 불러오는 중...</span>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            {/* 지표 카드 그리드 */}
            <div className="grid grid-cols-4 gap-4 mb-5">
              {/* 공포 & 탐욕 지수 */}
              <FearGreedIndex value={fearGreedIndex} />
              
              {/* MACD */}
              <MacdIndicator 
                macd={macdData.macd}
                signal={macdData.signal}
                histogram={macdData.histogram}
                trend={macdData.trend}
              />
              
              {/* RSI */}
              <RsiIndicator value={rsiData} />
              
              {/* 공매수/공매도 */}
              <LongShortRatio 
                longRatio={shortLongData.longRatio}
                shortRatio={shortLongData.shortRatio}
              />
            </div>
            
            <div className="flex gap-4 mb-5">
              {/* 비트코인 차트 영역 */}
              <div className="flex-grow">
                <div className="bg-blue-900 rounded-lg p-4 h-[464px]">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <div className="mr-2 w-6 h-6 flex items-center justify-center rounded-full overflow-hidden">
                        <img 
                          src={`https://static.upbit.com/logos/${coinData.symbol}.png`} 
                          alt={`${coinData.symbol} 로고`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentNode.innerHTML = `<div class="bg-yellow-400 w-full h-full flex items-center justify-center"><span class="text-black font-bold text-xs">${coinData.symbol.charAt(0)}</span></div>`;
                          }}
                        />
                      </div>
                      <h3 className="text-white font-medium">{coinData.name}</h3>
                      <span className="text-gray-300 ml-2 text-sm">{coinData.symbol}/KRW</span>
                    </div>
                  </div>
                  {/* TradingView 차트 컴포넌트 추가 */}
                  <div className="bg-blue-950 h-[390px] rounded-md">
                    <TradingViewChart 
                      symbol={`${coinData.symbol}KRW`} 
                      exchange="UPBIT" 
                      theme="dark"
                      interval="1" // 분봉
                    />
                  </div>
                </div>
              </div>
              
              {/* 오른쪽 검색 영역 */}  
              <div className="w-80">
                <div>
                  <CoinSearch onSelectCoin={handleCoinSelect} />
                </div>
              </div>
            </div>
            
            {/* 김치 프리미엄, 실시간 체결 내역, 고래 체결 내역 섹션 */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {/* 김치 프리미엄 */}
              <div>
                <KimchiPremium />
              </div>

              {/* 실시간 체결 내역 */}
              <div>
                <TransactionList 
                  title={`${coinData.name} 실시간 체결 내역`}
                  symbol={coinData.symbol} 
                  isWhale={false}
                />
              </div>
              
              {/* 실시간 고래 체결 내역 */}
              <div>
                <TransactionList 
                  title={`${coinData.name} 고래 체결 내역`}
                  symbol={coinData.symbol} 
                  isWhale={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;