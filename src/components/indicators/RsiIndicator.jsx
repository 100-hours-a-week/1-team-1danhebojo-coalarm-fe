// src/components/indicators/RsiIndicator.jsx
import React from 'react';
import Tooltip from '../common/Tooltip';
import useTooltipPosition from '../../hooks/useTooltipPosition';

function RsiIndicator({ value }) {
  const { visible, position, onMouseEnter, onMouseLeave } = useTooltipPosition();
  
  const formatRsiValue = (val) => {
    return Number(val).toFixed(1);
  };

  const getRsiStatusText = () => {
    if (value <= 30) return '과매도';
    if (value >= 70) return '과매수';
    return '중립';
  };

  // 상태 텍스트 색상
  const getStatusColor = () => {
    if (value <= 30) return 'text-[#EF4444]'; // 과매도
    if (value >= 70) return 'text-[#10B981]'; // 과매수
    return 'text-white'; // 중립
  };

  
  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-xl font-bold">RSI</h3>
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
            <p className="mb-3"><strong>30↓:</strong> 과매도, <strong>70↑:</strong> 과매수</p>
            <p className="leading-relaxed">최근 가격 변동 중 상승과 하락의 상대적 강도를 비교하여 과매수/과매도 상태 판단</p>
          </Tooltip>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center mb-4">
      <div className={`text-center font-bold text-2xl ${getStatusColor()}`}>{getRsiStatusText()}</div>
        <div className={`text-white text-5xl font-bold text-center mt-1 ${getStatusColor()}`}>{formatRsiValue(value)}</div>
      </div>
      
      <div className="mt-3">
        {/* 상태 바 */}
        <div className="mt-3">
          <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
            <div className="h-full" style={{ width: `${value}%`, backgroundColor: '#B7BFFF' }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RsiIndicator;