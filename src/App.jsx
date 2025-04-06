import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { connectSSE } from './components/toast/AlertContext'; // SSE 연결 유틸리티 가져오기
import { getTokenFromCookie } from './utils/cookieUtils';

import { PeriodicToast } from './components/toast/Toast';
import { useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Discord from './pages/Discord';
import Dashboard from './pages/Dashboard';
import Mypage from './pages/Mypage';
import AlertPage from "./pages/alert/AlertPage.jsx";

// 가이드 페이지 임포트
import FearGreedGuide from './pages/guides/FearGreedGuide';
import RsiGuide from './pages/guides/RsiGuide';
import MacdGuide from './pages/guides/MacdGuide';
import LongShortGuide from './pages/guides/LongShortGuide';
import KimchiPremiumGuide from './pages/guides/KimchiPremiumGuide';
import WhaleTransactionsGuide from './pages/guides/WhaleTransactionsGuide';
import Header from "./components/Header.jsx";
import { Navigate } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // SSE 연결 설정
  useEffect(() => {
    // 로그인 상태 확인
    const token = getTokenFromCookie();

    if (token && !isLoginPage) {
      console.log('SSE 연결 시도...');
      const eventSource = connectSSE();
      
      // 컴포넌트 언마운트 시 연결 해제
      return () => {
        if (eventSource) {
          console.log('SSE 연결 종료');
          eventSource.close();
        }
      };
    }
  }, [isLoginPage]);

  return (
    <>
      {!isLoginPage && <Header />}
      <div className="w-screen h-screen bg-gradient-to-br from-[#0A1184] via-[#341684] to-[#0F5BAF]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/discord" element={<Discord />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/mypage" element={<Mypage />} />
          
          {/* 알람 라우트*/}
          <Route path="/alert" element={<AlertPage />} />

          {/* 가이드 라우트 */}
          <Route path="/guide/fear-greed" element={<FearGreedGuide />} />
          <Route path="/guide/rsi" element={<RsiGuide />} />
          <Route path="/guide/macd" element={<MacdGuide />} />
          <Route path="/guide/long-short" element={<LongShortGuide />} />
          <Route path="/guide/kimchi-premium" element={<KimchiPremiumGuide />} />
          <Route path="/guide/whale-transactions" element={<WhaleTransactionsGuide />} />
          
          {/* No matching routes - Redirect to "/" */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <PeriodicToast interval={5000} />
      <Toaster
        position="bottom-right"
        expand={true}
        richColors
        closeButton
        duration={10000}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;