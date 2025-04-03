// src/pages/guides/WhaleTransactionsGuide.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';

function WhaleTransactionsGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px] overflow-hidden">
      <Sidebar />
      
      <div className="w-full px-6 py-6 text-white overflow-y-auto h-[calc(100vh-80px)]">
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-br from-[#1E2761] to-[#2A3990] rounded-xl p-8 mb-8 shadow-2xl border border-blue-400/20">
            <h1 className="text-4xl font-bold mb-10 text-center bg-blue-900/50 py-6 rounded-xl shadow-md backdrop-blur-sm border border-blue-500/30">
              고래 체결 내역 <span className="text-blue-300 font-light">(Whale Transactions)</span>
            </h1>
            
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">고래 체결 내역 설명</h2>
              </div>
              
              <div className="bg-blue-900/40 rounded-xl p-8 mb-8 flex flex-col items-center justify-center shadow-inner backdrop-blur-sm border border-blue-700/50">
                <div className="text-center mb-6">
                  <div className="text-xl mb-4 text-blue-300 font-medium">고래 체결 기준</div>
                  <div className="bg-[#0A1184]/80 text-blue-100 rounded-lg py-4 px-8 inline-block font-mono shadow-lg border-t border-blue-400/30 text-xl">
                    대규모 거래(고래) = 일정 금액 이상의 단일 거래
                  </div>
                </div>
                
                <div className="w-3/4 mt-6 text-center">
                  <p className="text-lg text-blue-100 mb-4">고래 체결 내역은 대규모 자금을 가진 투자자(고래)들의 거래 활동을 추적하는 지표입니다.</p>
                  <div className="flex items-center justify-center mb-6 mt-4">
                    <div className="grid grid-cols-3 w-full gap-4">
                      <div className="bg-red-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">대량 매도</div>
                        <div className="text-sm">고래 매도 {'>'} 매수</div>
                      </div>
                      <div className="bg-yellow-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">균형 상태</div>
                        <div className="text-sm">고래 매도 ≈ 매수</div>
                      </div>
                      <div className="bg-green-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">대량 매수</div>
                        <div className="text-sm">고래 매수 {'>'} 매도</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 leading-relaxed text-lg border border-blue-800/50">
                <p className="mb-4">
                  <span className="text-blue-300 font-medium">고래 체결 내역(Whale Transactions)</span>은 암호화폐 시장에서 큰 영향력을 가진 
                  대형 투자자(고래)들의 거래 활동을 모니터링하는 지표입니다.
                </p>
                <p className="mb-2">
                  대량의 코인을 한 번에 매수하거나 매도하는 행위는 시장 가격에 직접적인 영향을 줄 수 있으며, 
                  고래들의 움직임을 분석함으로써 시장의 방향성과 큰 자금의 흐름을 예측하는 데 도움이 됩니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">고래 체결 내역 해석</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/50 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-xl mb-1">대량 매수 신호</p>
                      <p className="text-sm text-green-300/80">고래들의 자금 유입</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-green-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-green-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 고래들이 적극적으로 매수 중</p>
                    <p className="text-lg">→ 중장기적 가격 상승 신호 가능성</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/50 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-xl mb-1">대량 매도 신호</p>
                      <p className="text-sm text-red-300/80">고래들의 자금 유출</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-red-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-red-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 고래들이 대량으로 매도 중</p>
                    <p className="text-lg">→ 가격 하락 압력 증가 가능성</p>
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
                  고래 체결 내역만으로 시장을 판단하는 것은 위험할 수 있습니다. 또한, 고래들의 전략적 거래(분산 매수/매도)를 주의해야 합니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">고래 체결 내역 활용 전략</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">1</div>
                    <p className="font-bold text-xl text-blue-100">대량 거래 신호 파악</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-green-400">연속적인 고래 매수 거래 → 강한 상승 압력 → 매수 신호</p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-red-400">연속적인 고래 매도 거래 → 강한 하락 압력 → 매도 또는 관망</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">2</div>
                    <p className="font-bold text-xl text-blue-100">누적 거래량 분석</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">특정 가격대에서 누적 고래 매수량 증가 → <span className="text-green-400 font-medium">지지선 형성 가능성</span></p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">특정 가격대에서 누적 고래 매도량 증가 → <span className="text-red-400 font-medium">저항선 형성 가능성</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">3</div>
                    <p className="font-bold text-xl text-blue-100">지갑 추적 활용</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">거래소로 대량 코인 이동 → <span className="text-red-400 font-medium">매도 압력 증가 가능성</span></p>
                      </div>
                    </div>
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">개인 지갑으로 대량 코인 이동 → <span className="text-green-400 font-medium">장기 보유 의도, 매수 압력 증가 가능성</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">고래 체결 내역 활용 시 주요 포인트</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg">거래 맥락 파악: 고래 거래가 발생한 시점의 시장 상황, 뉴스, 이벤트 등을 함께 고려</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg">패턴 분석: 단일 거래보다 일정 기간의 거래 패턴을 분석하여 추세 파악</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-lg">가격 반응 관찰: 대량 거래 후 시장 가격 반응을 분석하여 향후 유사 상황에 대비</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg">오인 주의: 거래소 내부 이동, 관리 목적 거래 등이 고래 거래로 오인될 수 있음을 인지</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhaleTransactionsGuide;