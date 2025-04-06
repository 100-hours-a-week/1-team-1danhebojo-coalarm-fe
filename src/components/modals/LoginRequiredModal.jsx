import React from 'react';

function LoginRequiredModal({ onClose }) {
  const handleGoToLogin = () => {
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
  };

  const handleCancel = () => {
    window.location.href = '/'; // 메인 페이지로 리다이렉트
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 전체 화면 블러 처리 배경 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* 모달 컨테이너 - 위치 조정 */}
      <div className="relative flex items-center justify-center mt-[-80px] ml-[114px]">
        <div className="bg-[#343A7D] w-[540px] h-[353px] rounded-3xl text-white p-8 flex flex-col items-center justify-center shadow-xl">
          {/* 정보 아이콘 */}
          <div className="mb-8 w-full flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200/20 to-blue-400/20 flex items-center justify-center">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="28" y="4" width="34" height="34" rx="4" transform="rotate(45 28 4)" fill="#4C8DF8" fillOpacity="0.2"/>
                  <rect x="28" y="10" width="26" height="26" rx="2" transform="rotate(45 28 10)" fill="#4C8DF8" fillOpacity="0.3"/>
                  <circle cx="28" cy="20" r="2" fill="#4C8DF8"/>
                  <path d="M28 26V38" stroke="#4C8DF8" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* 메시지 */}
          <h2 className="text-xl font-medium mb-4 flex items-center justify-center">
            로그인이 필요한 서비스입니다
            <span className="ml-1 text-blue-400">🔒</span>
          </h2>

          <p className="text-gray-300 text-center mb-8 max-w-md">
            해당 기능을 이용하시려면 로그인이 필요합니다.
            로그인 페이지로 이동하시겠습니까?
          </p>
          
          {/* 버튼 영역 */}
          <div className="flex space-x-4">
            <button 
              onClick={handleGoToLogin}
              className="bg-[#1631FE] hover:bg-[#1631FE]/90 text-white font-medium w-[180px] h-[56px] rounded-full transition-colors"
            >
              로그인 하러가기
            </button>
            <button 
              onClick={handleCancel}
              className="bg-[#0D1D98] hover:bg-[#0D1D98]/90 text-white font-medium w-[180px] h-[56px] rounded-full transition-colors"
            >
              나중에 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRequiredModal;