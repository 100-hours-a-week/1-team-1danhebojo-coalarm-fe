// src/pages/guides/RsiGuide.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';

function RsiGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px] overflow-hidden">
      <Sidebar />
      
      <div className="w-full px-6 py-6 text-white overflow-y-auto h-[calc(100vh-80px)]">
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-br from-[#1E2761] to-[#2A3990] rounded-xl p-8 mb-8 shadow-2xl border border-blue-400/20">
            <h1 className="text-4xl font-bold mb-10 text-center bg-blue-900/50 py-6 rounded-xl shadow-md backdrop-blur-sm border border-blue-500/30">
              RSI <span className="text-blue-300 font-light">(Relative Strength Index)</span>
            </h1>
            
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">RSI 설명</h2>
              </div>
              
              <div className="bg-blue-900/40 rounded-xl p-8 mb-8 flex flex-col items-center justify-center shadow-inner backdrop-blur-sm border border-blue-700/50">
                <div className="text-center mb-6">
                  <div className="text-xl mb-4 text-blue-300 font-medium">RSI 계산 공식</div>
                  <div className="bg-[#0A1184]/80 text-blue-100 rounded-lg py-4 px-8 inline-block font-mono shadow-lg border-t border-blue-400/30 text-xl">
                    RSI = 100 - (100 / (1 + RS))
                  </div>
                </div>
                
                <div className="w-3/4 mt-6 text-center">
                  <p className="text-lg text-blue-100 mb-4">여기서, RS(Relative Strength)는 특정 기간의 평균 상승폭을 평균 하락폭으로 나눈 값입니다.</p>
                  <div className="w-full bg-blue-900/60 h-6 rounded-full overflow-hidden mt-6">
                    <div className="flex h-full">
                      <div className="w-1/3 bg-red-500 h-full"></div>
                      <div className="w-1/3 bg-yellow-500 h-full"></div>
                      <div className="w-1/3 bg-green-500 h-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm opacity-80">
                    <span>과매도 (0-30)</span>
                    <span>중립 (30-70)</span>
                    <span>과매수 (70-100)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 leading-relaxed text-lg border border-blue-800/50">
                <p className="mb-4">
                  여기서, <span className="text-blue-300 font-medium">RSI(Relative Strength Index)</span>는 특정 기간 동안의 가격 움직임을 기반으로 한 모멘텀 오실레이터입니다.
                </p>
                <p className="mb-2">
                  숫자가 낮을수록 자산이 과매도 상태임을 나타내며, 대부분의 자본 시장(주식, 암호화폐 등)에서 시장의 과매수 또는 과매도 상태를 파악하는 지표로 활용됩니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">RSI 값 해석</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/50 mr-4">
                      <span className="text-3xl font-bold text-green-400">70+</span>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-xl mb-1">과매수 상태!</p>
                      <p className="text-sm text-green-300/80">매도 신호 (Sell Signal)</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-green-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-green-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 자산 가격이 너무 많이 올랐을 가능성이 큽니다.</p>
                    <p className="text-lg">→ 조만간 가격 하락이 올 수 있으니 매도를 고려하세요.</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/50 mr-4">
                      <span className="text-3xl font-bold text-red-400">30-</span>
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-xl mb-1">과매도 상태!</p>
                      <p className="text-sm text-red-300/80">매수 신호 (Buy Signal)</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-red-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-red-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 자산 가격이 너무 많이 떨어졌을 가능성이 큽니다.</p>
                    <p className="text-lg">→ 조만간 반등이 올 수 있으니 매수를 고려하세요.</p>
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
                  단, RSI만으로 투자 결정을 내리는 것은 위험합니다! 다른 지표와 함께 활용하세요.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">RSI 활용 전략</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">1</div>
                    <p className="font-bold text-xl text-blue-100">과매수/과매도 구간에서 신호 대응하기</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-green-400">RSI가 70 이상일 때 매도 신호로 해석, 매도 고려</p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-red-400">RSI가 30 이하일 때 매수 신호로 해석, 매수 고려</p>
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
                        <p className="ml-3 text-lg">가격은 상승하는데 RSI는 하락한다면 → <span className="text-red-400 font-medium">약세 다이버전스(하락 신호)</span></p>
                      </div>
                    </div>
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">가격은 하락하는데 RSI는 상승한다면 → <span className="text-green-400 font-medium">강세 다이버전스(상승 신호)</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">3</div>
                    <p className="font-bold text-xl text-blue-100">중앙선 돌파 전략</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">RSI가 50 아래에서 위로 돌파 → <span className="text-green-400 font-medium">상승 추세 시작 가능성</span></p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">RSI가 50 위에서 아래로 돌파 → <span className="text-red-400 font-medium">하락 추세 시작 가능성</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">RSI 활용 시 주요 포인트</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg">기간 설정: 일반적으로 14일이 표준이지만, 단기 9일, 장기 25일 등 다양한 기간 설정 가능</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg">다른 지표와 함께 사용: MACD, 이동평균선, 볼린저 밴드 등과 함께 사용하면 신뢰성 향상</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-lg">추세 확인: RSI는 추세의 강도를 측정하는 데 유용, 강한 추세에서는 과매수/과매도 신호가 오래 지속될 수 있음</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg">항상 시장 상황 고려: 강한 상승/하락 추세에서는 RSI가 과매수/과매도 구간에 오래 머무를 수 있음을 감안</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RsiGuide;