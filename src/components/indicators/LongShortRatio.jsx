import React from 'react';
import Tooltip from '../common/Tooltip';
import useTooltipPosition from '../../hooks/useTooltipPosition';

function LongShortRatio({ longRatio, shortRatio }) {
  const { visible, position, onMouseEnter, onMouseLeave } = useTooltipPosition();

  const formatRatio = (val) => `${Number(val).toFixed(2)}%`;

  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      {/* 제목 강조 */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-xl font-bold">공매수/공매도</h3>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white opacity-50 cursor-pointer hover:opacity-100"
            viewBox="0 0 20 20"
            fill="currentColor"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <Tooltip visible={visible} position={position}>
            <p className="mb-3">바이낸스 선물 비트코인 롱/숏 포지션 비율</p>
            <p className="mb-3"><strong>롱 포지션:</strong> 상승을 예상한 매수 포지션</p>
            <p className="leading-relaxed"><strong>숏 포지션:</strong> 하락을 예상한 매도 포지션</p>
          </Tooltip>
        </div>
      </div>

      {/* 상태 바 */}
      <div className="w-full h-8 bg-gray-600 rounded-full overflow-hidden relative flex mt-14">
        {/* 롱 바 */}
        <div
          className="flex items-center justify-start text-white text-[13px] font-bold pl-3 leading-none"
          style={{
            width: `${longRatio}%`,
            backgroundColor: '#1631FE',
            borderTopLeftRadius: '9999px',
            borderBottomLeftRadius: '9999px',
          }}
        >
          {longRatio > 10 && `LONG ${formatRatio(longRatio)}`}
        </div>

        {/* 숏 바 */}
        <div
          className="flex items-center justify-end text-white text-[13px] font-bold pr-3 leading-none"
          style={{
            width: `${shortRatio}%`,
            backgroundColor: '#FF7E0E',
            borderTopRightRadius: '9999px',
            borderBottomRightRadius: '9999px',
          }}
        >
          {shortRatio > 10 && `SHORT ${formatRatio(shortRatio)}`}
        </div>
      </div>
    </div>
  );
}

export default LongShortRatio;