// src/components/mypage/DiscordIntegrationSection.jsx
import React, { useState, useEffect } from 'react';
import { IconSettings } from '../../assets/images/mypage/Icons';
import DiscordWebhookModal from '../modals/DiscordWebhookModal';
import Toast from '../common/Toast';
import userApi from '../../api/userApi';

function DiscordIntegrationSection({ discordWebhook, onWebhookUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState(discordWebhook || '');
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    setWebhookUrl(discordWebhook || '');
  }, [discordWebhook]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  const closeToast = () => {
    setToast(prev => ({
      ...prev,
      show: false
    }));
  };

  // 웹훅 URL을 가독성을 위해 일부만 표시
  const formatWebhookUrl = (url) => {
    if (!url) return '';
    
    // https://discord.com/api/webhooks/1234567890/abcdefg... 형태에서
    // 마지막 부분의 토큰을 축약해서 표시
    const urlParts = url.split('/');
    if (urlParts.length >= 6) {
      const serverPart = urlParts[5];
      const tokenPart = urlParts[6];
      
      // 토큰의 앞부분만 표시하고 나머지는 ...으로 처리
      const shortenedToken = tokenPart.length > 8 
        ? `${tokenPart.substring(0, 8)}...` 
        : tokenPart;
        
      return `${urlParts.slice(0, 6).join('/')}/${shortenedToken}`;
    }
    
    return url;
  };

  const handleSubmitWebhook = async (newWebhookUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await userApi.connectDiscord(newWebhookUrl);
      
      // 성공적으로 연동된 경우
      setWebhookUrl(newWebhookUrl);
      setIsModalOpen(false);
      
      // 부모 컴포넌트에 업데이트 알림
      if (onWebhookUpdate) {
        onWebhookUpdate(newWebhookUrl);
      }
      
      // 성공 토스트 메시지 표시
      showToast('디스코드 웹훅이 성공적으로 연동되었습니다!', 'success');
      
    } catch (err) {
      console.error('Discord webhook 연동 오류:', err);
      
      // 에러 메시지 처리
      const errorMessage = err.response?.data?.error?.message || 
                          err.message || 
                          '알 수 없는 오류가 발생했습니다.';
      
      setError(errorMessage);
      // 오류 토스트 메시지 표시
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 웹훅 삭제 처리
  const handleDeleteWebhook = async () => {
    setIsLoading(true);
    
    try {
      // 웹훅 URL을 null로 설정하여 삭제
      const response = await userApi.disconnectDiscord();
      
      // 상태 업데이트
      setWebhookUrl('');
      
      // 부모 컴포넌트에 업데이트 알림
      if (onWebhookUpdate) {
        onWebhookUpdate(null);
      }
      
      // 성공 메시지 표시
      showToast('디스코드 웹훅 연동이 해제되었습니다.', 'success');
    } catch (err) {
      console.error('Discord webhook 삭제 오류:', err);
      
      // 에러 메시지 처리
      const errorMessage = err.response?.data?.error?.message || 
                          err.message || 
                          '알 수 없는 오류가 발생했습니다.';
      
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#081159] backdrop-blur-sm rounded-3xl p-6 w-[922px] h-[124px] flex flex-col justify-between">
      {/* 제목 부분 */}
      <div className="flex items-center mb-3">
        <div className="bg-[#0a1865] p-1.5 rounded-full mr-2">
          <IconSettings className="text-white w-4 h-4" />
        </div>
        <h2 className="font-medium text-white text-base">디스코드 연동</h2>
      </div>
      
      {/* 내용과 버튼 */}
      <div className="flex justify-between items-center mt-[-20px]">
        <div className="text-sm text-gray-300 ml-10">
          {webhookUrl ? (
            <div className="flex items-center">
              <span className="font-medium text-blue-300 mr-2">연동됨:</span>
              <span className="bg-[#0A1865] px-3 py-1 rounded-lg text-gray-300 overflow-hidden max-w-[380px] truncate">
                {formatWebhookUrl(webhookUrl)}
              </span>
            </div>
          ) : (
            <p>디스코드를 통해 각종 코인 알을 받을 수 있어요.</p>
          )}
        </div>
        
        {webhookUrl ? (
          <div className="flex space-x-3">
            <button 
              className="bg-[#2D3A8C] hover:bg-[#3949AB] text-white rounded-full w-[120px] h-[48px] text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={handleOpenModal}
            >
              수정
            </button>
            <button 
              className="bg-[#911414] hover:bg-[#b81818] text-white rounded-full w-[120px] h-[48px] text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={handleDeleteWebhook}
              disabled={isLoading}
            >
              {isLoading ? '처리 중...' : '연동 해제'}
            </button>
          </div>
        ) : (
          <button 
            className="bg-[#0D1D98] hover:bg-[#1147e4]/90 text-white rounded-full w-[183px] h-[48px] text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={handleOpenModal}
          >
            디스코드 연동
          </button>
        )}
      </div>

      {/* 디스코드 웹훅 모달 */}
      <DiscordWebhookModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitWebhook}
        isLoading={isLoading}
        error={error}
        initialValue={webhookUrl}
      />

      {/* 토스트 메시지 */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
        duration={1000}
      />
    </div>
  );
}

export default DiscordIntegrationSection;