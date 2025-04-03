import React from 'react';
import Tooltip from '../common/Tooltip';
import useTooltipPosition from '../../hooks/useTooltipPosition';

function MacdIndicator({ macd, signal, histogram }) {
  const { visible, position, onMouseEnter, onMouseLeave } = useTooltipPosition();

  const formatNumber = (value) => {
    // Convert to number to ensure proper formatting
    const num = Number(value);
    // Format with commas for thousands and fixed 2 decimal places
    return num.toLocaleString('ko-KR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const getTrendText = () => {
    return Number(macd) > Number(signal) ? '상승' : '하락';
  };

  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-xl font-bold">MACD</h3>
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
            <p className="mb-3"><strong>MACD:</strong> 단기 이동선, 장기 이동선 차이</p>
            <p className="mb-3">음수면 하락세, 양수면 상승세</p>
            <p className="mb-3"><strong>Signal:</strong> 매매 시점 판단 기준</p>
            <p className="mb-3">MACD가 Signal보다 높으면 매수 신호, 낮으면 매도 신호</p>
            <p className="mb-3"><strong>Histogram:</strong> MACD - Signal</p>
            <p className="leading-relaxed"><strong>추세:</strong> 추세 강도 (MACD와 Signal 비교)</p>
          </Tooltip>
        </div>
      </div>

      <div className="text-white mt-4 space-y-3 text-base">
        {[
          { label: 'MACD', value: formatNumber(macd) },
          { label: 'Signal', value: formatNumber(signal) },
          { label: 'Histogram', value: formatNumber(histogram) },
          { label: '추세', value: getTrendText() },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-white/80">{label}</span>
            <span className="text-lg font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MacdIndicator;