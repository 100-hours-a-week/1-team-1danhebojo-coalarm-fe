import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileSection from '../components/mypage/ProfileSection';
import NotificationSection from '../components/mypage/NotificationSection';
import DiscordIntegrationSection from '../components/mypage/DiscordIntegrationSection';
import WithdrawalConfirmationModal from '../components/mypage/WithdrawalConfirmationModal';

import userApi from '../api/userApi';

function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  // 사용자 정보 조회
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const userData = await userApi.getUserInfo();
      console.log('사용자 정보 조회 결과:', userData);
      setUserInfo(userData);
    } catch (error) {
      console.error('사용자 정보 조회 에러:', error);
      let errorMessage = '사용자 정보를 불러오는데 실패했습니다.';
      
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          errorMessage = '로그인이 필요합니다.';
          // 로그인 페이지로 리다이렉트
          navigate('/');
        } else if (status === 404) {
          errorMessage = '존재하지 않는 회원입니다.';
        } else if (error.response.data?.error?.message) {
          errorMessage = error.response.data.error.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [navigate]);

  // 프로필 업데이트 핸들러
  const handleProfileUpdate = async (updatedUserInfo) => {
    try {
      // 부분 업데이트 반영
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        ...updatedUserInfo
      }));
      
      // 최신 사용자 정보를 다시 가져옴
      await fetchUserInfo();
      console.log('사용자 정보 갱신 완료');
    } catch (error) {
      console.error('사용자 정보 갱신 실패:', error);
    }
  };

  // 디스코드 웹훅 업데이트 핸들러
  const handleWebhookUpdate = async (newWebhookUrl) => {
    // userInfo 객체를 복제하고 웹훅 URL 업데이트
    setUserInfo(prevUserInfo => {
      if (!prevUserInfo) return null;
      
      return {
        ...prevUserInfo,
        discordWebhook: newWebhookUrl
      };
    });
    
    console.log('디스코드 웹훅 URL 업데이트:', newWebhookUrl);
    
    // 최신 데이터로 다시 갱신 (선택적)
    try {
      await fetchUserInfo();
    } catch (error) {
      console.error('디스코드 웹훅 업데이트 후 사용자 정보 갱신 실패:', error);
    }
  };

  // 회원 탈퇴 모달
  const handleWithdrawalClick = () => {
    setShowWithdrawalModal(true);
  };

  const handleCloseWithdrawalModal = () => {
    setShowWithdrawalModal(false);
  };

  // 회원 탈퇴 성공 핸들러
  const handleWithdrawalSuccess = () => {
    // 모달 닫기
    setShowWithdrawalModal(false);
    
    // 성공 메시지 설정
    setSuccessMessage('회원 탈퇴가 완료되었습니다.');
    
    // 3초 후 로그인 페이지로 리다이렉트
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="flex text-white h-screen pt-[80px] pl-[300px]">
      {/* 사이드바 - 고정 너비 */}
      <Sidebar />

      {/* 메인 컨텐츠 */}
      <div className="flex-grow p-6 flex flex-col items-center overflow-y-auto w-full">

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2">로딩 중...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 mt-8">{error}</div>
        ) : successMessage ? (
          <div className="bg-green-400/20 text-green-400 p-4 rounded-lg mt-8">
            {successMessage}
          </div>
        ) : (
          <div className="max-w-2xl w-full flex flex-col items-center">
            {/* 프로필 섹션 */}
            {userInfo && (
              <ProfileSection 
                userInfo={userInfo} 
                onProfileUpdate={handleProfileUpdate} 
              />
            )}

            {/* 알람 섹션 */}
            <NotificationSection
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            {/* 디스코드 연동 섹션 */}
            <DiscordIntegrationSection 
              discordWebhook={userInfo?.discordWebhook} 
              onWebhookUpdate={handleWebhookUpdate}
            />

            {/* 회원 탈퇴 링크 */}
            <div className="mt-[40px] text-center">
              <span
                className="text-s text-blue-300 hover:underline cursor-pointer"
                onClick={handleWithdrawalClick}
              >
                회원 탈퇴하기
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 회원 탈퇴 확인 모달 */}
      {showWithdrawalModal && (
        <WithdrawalConfirmationModal
          onClose={handleCloseWithdrawalModal}
          onConfirm={handleWithdrawalSuccess}
        />
      )}
    </div>
  );
}

export default MyPage;