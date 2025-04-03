import React, { useState } from 'react';
import userApi from '../../api/userApi';

function WithdrawalConfirmationModal({ onClose, onConfirm }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleWithdrawal = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // API 호출
      await userApi.deleteAccount();
      
      // 상위 컴포넌트에 성공 알림
      onConfirm();
      
      // 로그인 페이지로 리다이렉트
      window.location.href = '/'; // 또는 React Router를 사용
    } catch (error) {
      let errorMessage = '회원 탈퇴 처리 중 오류가 발생했습니다.';
      
      if (error.response) {
        const status = error.response.status;
        
        if (status === 401) {
          errorMessage = '인증되지 않은 사용자입니다.';
        } else if (status === 404) {
          errorMessage = '존재하지 않는 회원입니다.';
        } else if (error.response.data?.error?.message) {
          errorMessage = error.response.data.error.message;
        }
      }
      
      setError(errorMessage);
      console.error('회원 탈퇴 오류:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 전체 화면 블러 처리 배경 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* 모달 컨테이너 - 위치 조정 */}
      <div className="relative flex items-center justify-center mt-[-80px] ml-[114px]">
        <div className="bg-[#343A7D] w-[540px] h-[353px] rounded-3xl text-white p-8 flex flex-col items-center justify-center shadow-xl">
          {/* 경고 아이콘 */}
          <div className="mb-8 w-full flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200/20 to-yellow-400/20 flex items-center justify-center">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="28" y="4" width="34" height="34" rx="4" transform="rotate(45 28 4)" fill="#F8B64C" fillOpacity="0.2"/>
                  <rect x="28" y="10" width="26" height="26" rx="2" transform="rotate(45 28 10)" fill="#F8B64C" fillOpacity="0.3"/>
                  <path d="M28 20V32" stroke="#F8B64C" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="28" cy="38" r="2" fill="#F8B64C"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* 메시지 */}
          <h2 className="text-xl font-medium mb-4 flex items-center justify-center">
            정말 코알람을 떠나시나요? 
            <span className="ml-1 text-yellow-400">😢</span>
          </h2>

          <p className="text-gray-300 text-center mb-8 max-w-md">
            회원 탈퇴시 모든 알림과 데이터가 삭제되어 복구되지 않습니다.
          </p>
          
          {/* 에러 메시지 */}
          {error && (
            <div className="text-red-400 text-sm mb-4">
              {error}
            </div>
          )}
          
          {/* 버튼 영역 */}
          <div className="flex space-x-4">
            <button 
              onClick={handleWithdrawal}
              disabled={isProcessing}
              className={`bg-[#0D1D98] hover:bg-[#0D1D98]/90 text-white font-medium w-[180px] h-[56px] rounded-full transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? '처리 중...' : '네'}
            </button>
            <button 
              onClick={onClose}
              disabled={isProcessing}
              className={`bg-[#1631FE] hover:bg-[#1631FE]/90 text-white font-medium w-[180px] h-[56px] rounded-full transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalConfirmationModal;