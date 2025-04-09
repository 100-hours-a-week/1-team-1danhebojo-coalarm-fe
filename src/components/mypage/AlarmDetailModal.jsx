import React from 'react';

// 사이드바 너비 상수 정의 (Sidebar 컴포넌트와 일치해야 함)
const SIDEBAR_WIDTH = 228; // px

function AlarmDetailModal({ onClose, alertData }) {
  // API 응답 데이터 형식에 맞게 구조 분해 할당
  const { alertHistoryId, alert, registeredDate } = alertData?.data || {};
  const { title, coin, alertType, goldenCross } = alert || {};
  const { name, symbol } = coin || {};

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch (error) {
      return dateString;
    }
  };

  // 알람 유형에 따른 설명 텍스트
  const getAlertTypeDescription = () => {
    switch(alertType) {
      case 'GOLDEN_CROSS':
        return {
          title: '골든 크로스',
          description: `단기 이동평균선(${goldenCross?.shortMa}일)이 장기 이동평균선(${goldenCross?.longMa}일)을 상향 돌파할 때 알람을 받습니다.`
        };
      case 'VOLUME_SPIKE':
        return {
          title: '급등 감지',
          description: '거래량이 급격하게 증가하고 가격이 상승할 때 알람을 받습니다.'
        };
      case 'TARGET_PRICE':
        return {
          title: '지정가 설정',
          description: '설정한 가격에 도달하면 알람을 받습니다.'
        };
      default:
        return {
          title: '알람 설정',
          description: '코인 가격 변동에 대한 알람을 받습니다.'
        };
    }
  };

  const alertTypeDesc = getAlertTypeDescription();

  // 포맷된 날짜
  const formattedDate = formatDate(registeredDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 전체 화면 블러 처리 배경 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* 모달 컨테이너 - 사이드바를 고려하여 위치 조정 */}
      <div className="relative flex items-center justify-center ml-[114px] mt-[-40px]">
        <div className="bg-[#343A7D] w-[540px] h-[650px] rounded-3xl text-white p-8 flex flex-col shadow-xl z-10">
          {/* 헤더 및 닫기 버튼 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-medium">알람 설정 상세보기</h2>
            </div>
            <button onClick={onClose} className="text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* 코인 정보 */}
          <div className="mb-6">
            <p className="text-gray-300 mb-2 pb-1 border-b border-[#B7BFFF]">코인</p>
            <div className="bg-[#E8EAFF] text-[#343A7D] py-3 px-4 rounded-[10px]">
              <p className="font-medium text-s">코인명 : {name || "비트코인"} {symbol || "BTC"}</p>
            </div>
          </div>

          {/* 제목 */}
          <div className="mb-6">
            <p className="text-gray-300 mb-2 pb-1 border-b border-[#B7BFFF]">제목</p>
            <div className="bg-[#E8EAFF] text-[#343A7D] py-3 px-4 rounded-[10px]">
              <p className="font-medium">{title || "골든 크로스 알람"}</p>
            </div>
          </div>

          {/* 유형 */}
          <div className="mb-6">
            <p className="text-gray-300 mb-2 pb-1 border-b border-[#B7BFFF]">유형</p>
            <div className="flex space-x-4">
              <div className="bg-[#E8EAFF] text-[#343A7D] p-4 rounded-xl flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span>지정가 설정</span>
                  <div className={`w-12 h-6 rounded-[10px] flex items-center px-1 ${alertType === 'TARGET_PRICE' ? 'bg-[#B7BFFF]' : 'bg-[#0A1672]'}`}>
                    <div className={`w-5 h-5 rounded-[10px] bg-white transform ${alertType === 'TARGET_PRICE' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span>골든 크로스</span>
                  <div className={`w-12 h-6 rounded-[10px] flex items-center px-1 ${alertType === 'GOLDEN_CROSS' ? 'bg-[#B7BFFF]' : 'bg-[#0A1672]'}`}>
                    <div className={`w-5 h-5 rounded-[10px] bg-white transform ${alertType === 'GOLDEN_CROSS' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>급등 감지</span>
                  <div className={`w-12 h-6 rounded-[10px] flex items-center px-1 ${alertType === 'VOLUME_SPIKE' ? 'bg-[#B7BFFF]' : 'bg-[#0A1672]'}`}>
                    <div className={`w-5 h-5 rounded-[10px] bg-white transform ${alertType === 'VOLUME_SPIKE' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
              <div className="bg-[#E8EAFF] text-[#343A7D] p-4 rounded-[10px] flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  <p>{alertTypeDesc.description}</p>
                </div>
                {alertType === 'TARGET_PRICE' && (
                  <div>
                    <p>설정한 조건 : -5% (3,132원)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 알람 발생 일시 */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <p className="text-gray-300 pb-1 border-b border-[#B7BFFF] w-full">알람 발생 일시</p>
            </div>
            <div className="bg-[#E8EAFF] text-[#343A7D] py-3 px-4 rounded-[10px]">
              <p className="font-medium">{formattedDate || "2025-03-12 12:34:56"}</p>
            </div>
          </div>

          {/* 확인 버튼 */}
          <div className="flex justify-center mt-auto">
            <button 
              className="bg-[#1631FE] hover:bg-[#1631FE]/90 text-white w-[150px] h-[48px] rounded-full font-medium transition-all duration-200"
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlarmDetailModal;