// src/pages/guides/MacdGuide.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';

function MacdGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px] overflow-hidden">
      <Sidebar />
      
      <div className="w-full px-6 py-6 text-white overflow-y-auto h-[calc(100vh-80px)]">
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-br from-[#1E2761] to-[#2A3990] rounded-xl p-8 mb-8 shadow-2xl border border-blue-400/20">
            <h1 className="text-4xl font-bold mb-10 text-center bg-blue-900/50 py-6 rounded-xl shadow-md backdrop-blur-sm border border-blue-500/30">
              MACD <span className="text-blue-300 font-light">(Moving Average Convergence Divergence)</span>
            </h1>
            
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">MACD 설명</h2>
              </div>
              
              <div className="bg-blue-900/40 rounded-xl p-8 mb-8 flex flex-col items-center justify-center shadow-inner backdrop-blur-sm border border-blue-700/50">
                <div className="text-center mb-6">
                  <div className="text-xl mb-4 text-blue-300 font-medium">MACD 계산 공식</div>
                  <div className="bg-[#0A1184]/80 text-blue-100 rounded-lg py-4 px-8 inline-block font-mono shadow-lg border-t border-blue-400/30 text-xl">
                    MACD = 12일 EMA - 26일 EMA
                  </div>
                  <div className="mt-4 bg-[#0A1184]/80 text-blue-100 rounded-lg py-4 px-8 inline-block font-mono shadow-lg border-t border-blue-400/30 text-xl">
                    시그널 = 9일 MACD의 EMA
                  </div>
                </div>
                
                <div className="w-3/4 mt-6 text-center">
                  <p className="text-lg text-blue-100 mb-4">MACD는 가격의 두 이동평균선(EMA) 간 차이를 나타내는 추세 추종형 모멘텀 지표입니다.</p>
                  <div className="flex flex-col items-center mt-6">
                    <div className="flex items-center justify-center mb-3 w-full">
                      <div className="h-4 w-24 bg-blue-500 rounded-md"></div>
                      <span className="ml-3">MACD 라인</span>
                    </div>
                    <div className="flex items-center justify-center mb-3 w-full">
                      <div className="h-4 w-24 bg-red-500 rounded-md"></div>
                      <span className="ml-3">시그널 라인</span>
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <div className="h-4 w-12 bg-green-500 rounded-md"></div>
                      <div className="h-4 w-12 bg-yellow-500 rounded-md"></div>
                      <span className="ml-3">히스토그램 (MACD - 시그널)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 leading-relaxed text-lg border border-blue-800/50">
                <p className="mb-4">
                  <span className="text-blue-300 font-medium">MACD(Moving Average Convergence Divergence)</span>는 단기 이동평균과 장기 이동평균의 차이를 이용해 
                  추세의 방향과 모멘텀을 파악하는 기술적 지표입니다.
                </p>
                <p className="mb-2">
                  일반적으로 12일 지수이동평균(EMA)에서 26일 EMA를 뺀 값(MACD 라인)과 이 값의 9일 EMA(시그널 라인)를 함께 표시하며, 
                  두 선의 교차와 히스토그램을 통해 매수/매도 신호를 파악합니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">MACD 신호 해석</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/50 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-xl mb-1">상승 신호!</p>
                      <p className="text-sm text-green-300/80">매수 포인트 (Buy Signal)</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-green-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-green-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ MACD 라인이 시그널 라인을 아래에서 위로 돌파</p>
                    <p className="text-lg">→ MACD가 0선을 아래에서 위로 돌파</p>
                    <p className="text-lg">→ 히스토그램이 음수에서 양수로 전환</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/50 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-xl mb-1">하락 신호!</p>
                      <p className="text-sm text-red-300/80">매도 포인트 (Sell Signal)</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-red-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-red-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ MACD 라인이 시그널 라인을 위에서 아래로 돌파</p>
                    <p className="text-lg">→ MACD가 0선을 위에서 아래로 돌파</p>
                    <p className="text-lg">→ 히스토그램이 양수에서 음수로 전환</p>
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
                  MACD는 횡보 시장보다 추세가 있는 시장에서 더 효과적이며, 다른 지표와 함께 사용하는 것이 좋습니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">MACD 활용 전략</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">1</div>
                    <p className="font-bold text-xl text-blue-100">교차 신호로 매매 타이밍 잡기</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-green-400">MACD 라인이 시그널 라인을 아래에서 위로 교차할 때 매수 고려</p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-red-400">MACD 라인이 시그널 라인을 위에서 아래로 교차할 때 매도 고려</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">2</div>
                    <p className="font-bold text-xl text-blue-100">히스토그램으로 모멘텀 확인</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">히스토그램 막대가 길어지면 → <span className="text-green-400 font-medium">추세 강도 증가</span></p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">히스토그램 막대가 짧아지면 → <span className="text-red-400 font-medium">추세 약화 신호</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">3</div>
                    <p className="font-bold text-xl text-blue-100">다이버전스(Divergence) 활용</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">가격은 상승하는데 MACD는 하락하면 → <span className="text-red-400 font-medium">약세 다이버전스(매도 신호)</span></p>
                      </div>
                    </div>
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">가격은 하락하는데 MACD는 상승하면 → <span className="text-green-400 font-medium">강세 다이버전스(매수 신호)</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">MACD 활용 시 주요 포인트</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg">고정 파라미터: 본 서비스에서는 표준 설정(12,26)을 사용하여 안정적이고 검증된 신호를 제공합니다</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg">보조 지표와 함께 사용: RSI, 볼린저 밴드, 이동평균선 등과 함께 사용하면 거래 신뢰성 향상</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-lg">시간대 고려: 여러 시간대(일간, 4시간, 1시간 등)에서 MACD를 확인하면 더 명확한 신호 포착 가능</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg">위험 관리: MACD 신호만으로 거래하지 말고, 적절한 진입점, 손절점, 목표가를 함께 설정하여 위험 관리</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacdGuide;