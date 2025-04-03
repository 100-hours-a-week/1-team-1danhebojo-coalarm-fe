import React, { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

// 토스트 설정 컴포넌트
export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      expand={true}
      richColors
      closeButton
      duration={5000}
    />
  );
};

// 커스텀 Info 토스트 컴포넌트
export const InfoToast = ({ message, title }) => {
  useEffect(() => {
    toast.info(
      <div className="flex flex-col gap-1">
        {title && <div className="font-semibold">{title}</div>}
        <div>{message}</div>
        <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
        </div>
      </div>
    );
  }, [message, title]);

  return null;
};

// 토스트 사용 예시
export const showInfoToast = (message, title) => {
  toast.info(
    <div className="flex flex-col gap-1">
      {title && <div className="font-semibold">{title}</div>}
      <div>{message}</div>
      <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
      </div>
    </div>
  );
};

// 주기적 토스트 컴포넌트 (비활성화됨)
export const PeriodicToast = ({ interval = 10000 }) => {
  // 비활성화: 더 이상 주기적인 토스트를 표시하지 않음
  return null;
};