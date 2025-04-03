import React, { useState, useEffect } from 'react';
import dashboardApi from '../../api/dashboardApi';
import Tooltip from '../common/Tooltip';
import useTooltipPosition from '../../hooks/useTooltipPosition';

function KimchiPremium() {
  const [premiumData, setPremiumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { visible, position, onMouseEnter, onMouseLeave } = useTooltipPosition();

  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.1);
    }
    .custom-scrollbar::-webkit-scrollbar-horizontal {
      display: none;
    }
  `;
  
  useEffect(() => {
    const fetchKimchiPremium = async () => {
      try {
        setLoading(true);
        const response = await dashboardApi.getKimchiPremium(0, 5);

        if (response && response.contents) {
          setPremiumData(response.contents);
        } else {
          setPremiumData([]);
          console.warn('김치 프리미엄 데이터가 예상된 형식이 아닙니다:', response);
        }
      } catch (err) {
        console.error('김치 프리미엄 데이터 로드 실패:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchKimchiPremium();
  }, []);
  
  // 코인 이미지 렌더링 함수
  const renderCoinImage = (symbol) => (
    <div className="mr-2 w-6 h-6 flex items-center justify-center rounded-full overflow-hidden">
      <img 
        src={`https://static.upbit.com/logos/${symbol}.png`} 
        alt={`${symbol} 로고`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.parentNode.innerHTML = `<div class="bg-yellow-400 w-full h-full flex items-center justify-center"><span class="text-black font-bold text-xs">${symbol?.charAt(0)}</span></div>`;
        }}
      />
    </div>
  );
  
  return (
    <div className="bg-blue-900 rounded-lg p-5 relative h-[300px]">
      <style>{scrollbarStyles}</style>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-xl font-bold">김치 프리미엄</h3>
        <div className="relative">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-white opacity-50 cursor-pointer hover:opacity-100" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          
          <Tooltip visible={visible} position={position}>
            <p className="mb-3"><strong>국내 거래소:</strong> 업비트 / <strong>해외 거래소:</strong> 바이낸스</p>
            <p className="leading-relaxed">국내 거래소에서 코인이 해외 거래소보다 비싸게 거래되는 현상</p>
          </Tooltip>
        </div>
      </div>
      
      <div className="overflow-auto custom-scrollbar h-[calc(100%-56px)]" style={{ scrollbarWidth: 'thin' }}>
        {loading ? (
          <div className="text-center py-6 text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p>로딩 중...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        ) : (
          <table className="w-full text-left text-md">
            <thead className="sticky top-0 bg-blue-900">
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-3 pl-3">코인명</th>
                <th className="py-3 text-right">국내 가격(KRW)</th>
                <th className="py-3 text-right">해외 가격(USDT)</th>
                <th className="py-3 pr-3 text-right">김치 프리미엄</th>
              </tr>
            </thead>
            <tbody>
              {premiumData && premiumData.length > 0 ? (
                premiumData.map((market) => (
                  <tr key={market.premiumId} className="border-b border-gray-800 hover:bg-blue-900 transition-colors">
                    <td className="py-4 pl-3">
                      <div className="flex items-center">
                        {renderCoinImage(market.coin?.symbol)}
                        <span className="text-white font-medium">{market.coin?.symbol || '?'}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right text-white font-medium">
                      {Number(market.domesticPrice).toLocaleString('ko-KR', { maximumFractionDigits: 0 })} <span className="text-gray-400 text-xs">KRW</span>
                    </td>
                    <td className="py-4 text-right text-gray-300">
                      {Number(market.globalPrice).toLocaleString('en-US', { maximumFractionDigits: 2 })} <span className="text-gray-400 text-xs">USDT</span>
                    </td>
                    <td className={`py-4 pr-3 text-right font-bold ${Number(market.kimchiPremium) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {Number(market.kimchiPremium) >= 0 ? '+' : ''}{Number(market.kimchiPremium).toFixed(2)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                    <p>데이터가 없습니다.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default KimchiPremium;