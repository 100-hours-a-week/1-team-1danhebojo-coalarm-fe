// src/components/modals/DiscordWebhookModal.jsx
import React, { useState, useEffect } from 'react';

function DiscordWebhookModal({ isOpen, onClose, onSubmit, isLoading, error, initialValue = '' }) {
  const [webhookUrl, setWebhookUrl] = useState(initialValue);
  const [validationError, setValidationError] = useState('');

  // initialValue가 변경될 때 입력 상태 업데이트
  useEffect(() => {
    if (isOpen) {
      setWebhookUrl(initialValue);
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!webhookUrl.trim()) {
      setValidationError('웹훅 URL을 입력해주세요.');
      return;
    }

    // 기본적인 디스코드 웹훅 URL 형식 검사
    const discordWebhookRegex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
    if (!discordWebhookRegex.test(webhookUrl)) {
      setValidationError('유효하지 않은 디스코드 웹훅 URL입니다.');
      return;
    }

    // 검증 통과 시 제출
    setValidationError('');
    onSubmit(webhookUrl);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E2140] w-[540px] rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl font-medium">디스코드 웹훅 연동</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 본문 */}
          <div className="mb-6">
            <p className="text-white text-base mb-4">
              디스코드 웹훅 URL을 입력하여 코알람의 실시간 알림을 받아보세요.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              채널 편집 &gt; 연동 &gt; 웹후크 만들기 &gt; 새 웹후크에서 URL을 복사하여 붙여넣으세요.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="webhook-url" className="block text-white text-sm font-medium mb-2">
                  웹훅 URL
                </label>
                <input
                  type="text"
                  id="webhook-url"
                  value={webhookUrl}
                  onChange={(e) => {
                    setWebhookUrl(e.target.value);
                    setValidationError(''); // 입력이 변경되면 유효성 오류 메시지 초기화
                  }}
                  placeholder="https://discord.com/api/webhooks/..."
                  className="w-full px-4 py-3 bg-[#0E106C] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                {/* 유효성 검사 오류 메시지 */}
                {validationError && (
                  <p className="text-red-400 text-sm mt-2">{validationError}</p>
                )}
                
                {/* API 오류 메시지 */}
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>

              {/* 버튼 영역 */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-700 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      연동 중...
                    </span>
                  ) : '연동하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscordWebhookModal;