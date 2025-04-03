// src/pages/guides/FearGreedGuide.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';

function FearGreedGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px] overflow-hidden">
      <Sidebar />
      
      <div className="w-full px-6 py-6 text-white overflow-y-auto h-[calc(100vh-80px)]">
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-br from-[#1E2761] to-[#2A3990] rounded-xl p-8 mb-8 shadow-2xl border border-blue-400/20">
            <h1 className="text-4xl font-bold mb-10 text-center bg-blue-900/50 py-6 rounded-xl shadow-md backdrop-blur-sm border border-blue-500/30">
              공포&탐욕 지수 <span className="text-blue-300 font-light">(Fear & Greed Index)</span>
            </h1>
            
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">공포&탐욕 지수 설명</h2>
              </div>
              
              <div className="bg-blue-900/40 rounded-xl p-8 mb-8 flex flex-col items-center justify-center shadow-inner backdrop-blur-sm border border-blue-700/50">
                <div className="text-center mb-6">
                  <div className="text-xl mb-4 text-blue-300 font-medium">공포&탐욕 지수 계산 공식</div>
                  <div className="bg-[#0A1184]/80 text-blue-100 rounded-lg py-4 px-8 inline-block font-mono shadow-lg border-t border-blue-400/30 text-xl">
                    FGI = 투자자 심리 상태 (0~100)
                  </div>
                </div>
                
                <div className="w-3/4 mt-4">
                  <div className="w-full bg-blue-900/60 h-6 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div className="w-1/3 bg-red-500 h-full"></div>
                      <div className="w-1/3 bg-yellow-500 h-full"></div>
                      <div className="w-1/3 bg-green-500 h-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm opacity-80">
                    <span>극도의 공포 (0)</span>
                    <span>중립 (50)</span>
                    <span>극도의 탐욕 (100)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 leading-relaxed text-lg border border-blue-800/50">
                <p className="mb-4">
                  여기서, <span className="text-blue-300 font-medium">공포&탐욕 지수(Fear & Greed Index)</span>는 투자 기간 동안의 벡금 심리상태를 파악 지표입니다.
                </p>
                <p className="mb-2">
                  숫자가 낮을수록 투자자에 대한 공포를 말하며, 대부분의 자본 시장(스톡마켓)에서 한 지수로 자용으로 제산에 주기 반복에 대한
                  추정할 활 활용한 합니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">공포&탐욕 지수 값</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/50 mr-4">
                      <span className="text-3xl font-bold text-green-400">60+</span>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-xl mb-1">과매수 상태!</p>
                      <p className="text-sm text-green-300/80">탐욕 구간 (Greed)</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-green-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-green-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 가격이 너무 많이 올랐을 가능성이 큽니다.</p>
                    <p className="text-lg">→ 조금더(가격 하락)이 올 수도 있으니 주의하세요.</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/50 mr-4">
                      <span className="text-3xl font-bold text-red-400">40-</span>
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-xl mb-1">과매도 상태!</p>
                      <p className="text-sm text-red-300/80">공포 구간 (Fear)</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-red-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-red-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 가격이 너무 많이 떨어졌을 가능성이 큽니다.</p>
                    <p className="text-lg">→ 반등(가격 상승)이 올 수도 있으니 과적 거래를 합니다.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-yellow-500/10 rounded-xl p-5 flex items-center backdrop-blur-sm">
                <div className="absolute left-0 top-0 h-full w-2 bg-yellow-400 rounded-l-xl"></div>
                <div className="bg-yellow-500/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="italic text-lg text-yellow-200">
                  하지만 항상 보고 배우를 공부하는 것은 위험합니다! 더욱 자세한 용법은 즐겨 보세요!
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">공포&탐욕 지수 활용 포인트</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">1</div>
                    <p className="font-bold text-xl text-blue-100">고점(과/구매도 구간)에서 신호하지 대응하기</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        
                        <p className="ml-3 text-lg text-green-400">공포&탐욕 지수가 60 이상일 때 마켓에 매도하여 올라기</p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        
                        <p className="ml-3 text-lg text-red-400">공포&탐욕 지수가 40 이하일 때 포지션 매도하여 않기</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">2</div>
                    <p className="font-bold text-xl text-blue-100">다이버전스(Divergence) 확인하기</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">

                        <p className="ml-3 text-lg">가격은 오르는데 공포&탐욕 지수는 떨어진다면 → <span className="text-red-400 font-medium">위험 가능성이 있음</span></p>
                      </div>
                    </div>
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        
                        <p className="ml-3 text-lg">가격은 내리는데 공포&탐욕 지수는 오르고 있다면 → <span className="text-green-400 font-medium">상승 가능성이 있음</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">3</div>
                    <p className="font-bold text-xl text-blue-100">다른 보조 지표와 함께 사용하기</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 ml-14">

                    <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                      <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                      <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-lg">RSI, MACD 등의 기술적 지표와 함께 사용하면 더 신뢰성 있는 신호 확인 가능</p>
                    </div>

                    <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                      <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                      <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg">시장의 기본적 분석과 함께 사용하여 투자 결정에 참고</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FearGreedGuide;