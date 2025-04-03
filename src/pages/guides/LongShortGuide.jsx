// src/pages/guides/LongShortGuide.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';

function LongShortGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px] overflow-hidden">
      <Sidebar />
      
      <div className="w-full px-6 py-6 text-white overflow-y-auto h-[calc(100vh-80px)]">
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-br from-[#1E2761] to-[#2A3990] rounded-xl p-8 mb-8 shadow-2xl border border-blue-400/20">
            <h1 className="text-4xl font-bold mb-10 text-center bg-blue-900/50 py-6 rounded-xl shadow-md backdrop-blur-sm border border-blue-500/30">
              롱/숏 비율 <span className="text-blue-300 font-light">(Long/Short Ratio)</span>
            </h1>
            
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">롱/숏 비율 설명</h2>
              </div>
              
              <div className="bg-blue-900/40 rounded-xl p-8 mb-8 flex flex-col items-center justify-center shadow-inner backdrop-blur-sm border border-blue-700/50">
                <div className="text-center mb-6">
                  <div className="text-xl mb-4 text-blue-300 font-medium">롱/숏 비율 계산 공식</div>
                  <div className="bg-[#0A1184]/80 text-blue-100 rounded-lg py-4 px-8 inline-block font-mono shadow-lg border-t border-blue-400/30 text-xl">
                    롱/숏 비율 = 롱 포지션 금액 / 숏 포지션 금액
                  </div>
                </div>
                
                <div className="w-3/4 mt-6 text-center">
                  <p className="text-lg text-blue-100 mb-4">롱/숏 비율은 시장에서 롱 포지션(가격 상승 예상)과 숏 포지션(가격 하락 예상)의 비율을 나타내는 지표입니다.</p>
                  <div className="flex items-center justify-center mb-6 mt-4">
                    <div className="grid grid-cols-3 w-full gap-4">
                      <div className="bg-red-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">롱 &lt; 숏</div>
                        <div className="text-sm">비율 &lt; 1.0</div>
                      </div>
                      <div className="bg-yellow-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">롱 ≈ 숏</div>
                        <div className="text-sm">비율 ≈ 1.0</div>
                      </div>
                      <div className="bg-green-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">롱 {'>'} 숏</div>
                        <div className="text-sm">비율 {'>'} 1.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 leading-relaxed text-lg border border-blue-800/50">
                <p className="mb-4">
                  <span className="text-blue-300 font-medium">롱/숏 비율(Long/Short Ratio)</span>은 시장 참여자들의 정서와 방향성을 파악하는 데 유용한 지표입니다.
                </p>
                <p className="mb-2">
                  파생상품 시장(선물, 옵션 등)에서 주로 사용되며, 비율이 1보다 크면 시장이 전반적으로 상승을 예상하고 있음을, 
                  1보다 작으면 시장이 하락을 예상하고 있음을 나타냅니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">롱/숏 비율 해석</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/50 mr-4">
                      <span className="text-3xl font-bold text-green-400">2.0+</span>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-xl mb-1">롱 {'>'} 숏 (강한 상승 예상)</p>
                      <p className="text-sm text-green-300/80">시장이 강한 상승을 예상 중</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-green-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-green-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 시장 참여자들이 가격 상승에 배팅하고 있습니다.</p>
                    <p className="text-lg">→ 과도하게 높을 경우(3.0+) 과열 신호로 볼 수 있습니다.</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/50 mr-4">
                      <span className="text-3xl font-bold text-red-400">0.5-</span>
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-xl mb-1">롱 {'<'} 숏 (강한 하락 예상)</p>
                      <p className="text-sm text-red-300/80">시장이 강한 하락을 예상 중</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-red-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-red-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 시장 참여자들이 가격 하락에 배팅하고 있습니다.</p>
                    <p className="text-lg">→ 과도하게 낮을 경우(0.3-) 과매도 신호로 볼 수 있습니다.</p>
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
                  롱/숏 비율은 역추세(반대) 지표로도 활용될 수 있습니다. 극단적인 비율은 종종 반전 신호가 될 수 있습니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">롱/숏 비율 활용 전략</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">1</div>
                    <p className="font-bold text-xl text-blue-100">군중 심리 반대 매매</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-green-400">롱/숏 비율이 매우 낮을 때(0.5 이하) 매수 고려 → 과도한 비관론 활용</p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-red-400">롱/숏 비율이 매우 높을 때(2.0 이상) 매도 고려 → 과도한 낙관론 활용</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">2</div>
                    <p className="font-bold text-xl text-blue-100">추세 확인 및 강도 측정</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">지속적으로 1.0 이상 유지 → <span className="text-green-400 font-medium">상승 추세 확인 및 강화</span></p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">지속적으로 1.0 이하 유지 → <span className="text-red-400 font-medium">하락 추세 확인 및 강화</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">3</div>
                    <p className="font-bold text-xl text-blue-100">급격한 변화 감지</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">롱/숏 비율이 급격히 하락 → <span className="text-red-400 font-medium">시장 심리 악화, 가격 하락 가능성 증가</span></p>
                      </div>
                    </div>
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">롱/숏 비율이 급격히 상승 → <span className="text-green-400 font-medium">시장 심리 개선, 가격 상승 가능성 증가</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">롱/숏 비율 활용 시 주요 포인트</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg">거래소별 차이: 거래소마다 측정 방식이 다를 수 있으며, 동일 시장에서도 거래소별로 비율이 다를 수 있음</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg">다른 지표와 함께 사용: 가격 차트, 거래량, 기타 기술적 지표와 함께 분석하여 신뢰성 향상</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-lg">시간대별 분석: 단기(1시간), 중기(4시간), 장기(일간) 비율을 비교하여 보다 종합적인 시장 분석 가능</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg">역발상 지표로 활용: 극단적인 비율은 반대 방향으로의 가격 반전 가능성을 시사할 수 있음</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LongShortGuide;