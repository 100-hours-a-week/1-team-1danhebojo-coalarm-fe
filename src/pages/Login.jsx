// src/pages/Login.jsx
import React from 'react';

// 코인 이미지 임포트
import bitcoin1 from '../assets/images/login/Bitcoin-1.png';
import bitcoin from '../assets/images/login/Bitcoin.png';
import goldCoins1 from '../assets/images/login/Gold Coins-1.png';
import goldCoins from '../assets/images/login/Gold Coins.png';

function Login() {

  return (
    <>
      <div className="w-screen h-screen flex">
        {/* 왼쪽 컨텐츠 영역 */}
        <div className="w-1/2 h-full bg-[#0E106C] flex flex-col justify-start p-12 pl-24 relative">
          {/* 로고 */}
          <div className="text-white text-2xl font-medium mb-20 z-10">
            coalarm
          </div>
          
          {/* 메인 텍스트 */}
          <div className="flex flex-col z-10 mt-24">
            <div className="text-white text-3xl">
              빠르고 직관한 메세지 시그널, 스마트한 투자 파트너
            </div>
            <h1 className="text-white text-9xl font-bold mt-4 mb-20">
              코알람
            </h1>
            
            {/* 설명 텍스트 */}
            <div className="text-white text-2xl mb-10">
              카카오 계정으로 간편하게 로그인하고, 다양한 서비스를 이용해 보세요.
            </div>
            
            {/* 카카오 로그인 버튼 */}
            <button className="bg-yellow-300 text-gray-800 font-medium py-4 px-6 rounded-full w-72 text-center hover:bg-yellow-400 transition-colors text-lg">
              카카오로 로그인
            </button>
          </div>
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="w-1/2 h-full bg-[#0E106C] relative overflow-hidden">
          {/* 비트코인 이미지 배치 - 피그마 디자인에 맞게 정확히 조정 */}
          <div className="absolute top-20 -right-10 w-52 h-52 ">
            <img src={bitcoin1} alt="Bitcoin" className="w-full h-full object-contain" />
          </div>
          
          <div className="absolute top-1/3 right-10 w-70 h-70 -rotate-12">
            <img src={bitcoin} alt="Bitcoin" className="w-full h-full object-contain" />
          </div>
          
          <div className="absolute top-20 right-3/4 w-64 h-64 rotate-6">
            <img src={goldCoins} alt="Gold Coins" className="w-full h-full object-contain opacity-100" />
          </div>
          
          <div className="absolute -bottom-20 right-66 w-96 h-96 -rotate-6">
            <img src={goldCoins1} alt="Gold Coins" className="w-full h-full object-contain" />
          </div>
          
          <div className="absolute bottom-2/3 right-1/3 w-60 h-60 rotate-12">
            <img src={bitcoin} alt="Bitcoin" className="w-full h-full object-contain opacity-40" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;