// src/pages/guides/KimchiPremiumGuide.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';

function KimchiPremiumGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px] overflow-hidden">
      <Sidebar />
      
      <div className="w-full px-6 py-6 text-white overflow-y-auto h-[calc(100vh-80px)]">
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-br from-[#1E2761] to-[#2A3990] rounded-xl p-8 mb-8 shadow-2xl border border-blue-400/20">
            <h1 className="text-4xl font-bold mb-10 text-center bg-blue-900/50 py-6 rounded-xl shadow-md backdrop-blur-sm border border-blue-500/30">
              김치 프리미엄 <span className="text-blue-300 font-light">(Kimchi Premium)</span>
            </h1>
            
            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">김치 프리미엄 설명</h2>
              </div>
              
              <div className="bg-blue-900/40 rounded-xl p-8 mb-8 flex flex-col items-center justify-center shadow-inner backdrop-blur-sm border border-blue-700/50">
                <div className="text-center mb-6">
                  <div className="text-xl mb-4 text-blue-300 font-medium">김치 프리미엄 계산 공식</div>
                  <div className="bg-[#0A1184]/80 text-blue-100 rounded-lg py-4 px-8 inline-block font-mono shadow-lg border-t border-blue-400/30 text-xl">
                    김치 프리미엄(%) = ((한국 가격 / (해외 가격 × 환율)) - 1) × 100
                  </div>
                </div>
                
                <div className="w-3/4 mt-6 text-center">
                  <p className="text-lg text-blue-100 mb-4">김치 프리미엄은 해외 암호화폐 거래소 대비 국내 거래소의 가격 프리미엄을 의미합니다.</p>
                  <div className="flex items-center justify-center mb-6 mt-4">
                    <div className="grid grid-cols-3 w-full gap-4">
                      <div className="bg-red-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">한국 &lt; 해외</div>
                        <div className="text-sm">프리미엄 &lt; 0%</div>
                      </div>
                      <div className="bg-yellow-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">한국 ≈ 해외</div>
                        <div className="text-sm">프리미엄 ≈ 0%</div>
                      </div>
                      <div className="bg-green-500/30 rounded-lg p-3 text-center">
                        <div className="font-bold mb-1">한국 &gt; 해외</div>
                        <div className="text-sm">프리미엄 &gt; 0%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 leading-relaxed text-lg border border-blue-800/50">
                <p className="mb-4">
                  <span className="text-blue-300 font-medium">김치 프리미엄(Kimchi Premium)</span>은 해외 거래소(주로 바이낸스, 코인베이스 등)에 비해 
                  한국 거래소(업비트, 빗썸 등)에서 암호화폐가 더 높은 가격에 거래되는 현상을 말합니다.
                </p>
                <p className="mb-2">
                  주로 자본 통제, 시장 격리, 국내 수요와 공급의 불균형, 외국인 투자자 제한 등의 요인으로 발생하며, 
                  시장 심리와 국내 투자자들의 투자 열기를 반영하는 지표로 활용됩니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">김치 프리미엄 해석</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/50 mr-4">
                      <span className="text-2xl font-bold text-green-400">+5%</span>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-xl mb-1">높은 프리미엄</p>
                      <p className="text-sm text-green-300/80">국내 강한 매수세</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-green-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-green-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 국내 투자자들의 매수 수요가 높은 상태</p>
                    <p className="text-lg">→ 단기적으로 시장 과열 신호일 수 있음</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#2A3990]/80 to-[#1E2761]/80 rounded-xl p-6 shadow-xl border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/50 mr-4">
                      <span className="text-2xl font-bold text-red-400">-2%</span>
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-xl mb-1">역(逆) 프리미엄</p>
                      <p className="text-sm text-red-300/80">국내 약한 매수세</p>
                    </div>
                  </div>
                  <div className="relative mt-5 ml-2 bg-red-500/10 p-4 rounded-lg">
                    <div className="absolute left-0 top-0 h-full w-2 bg-red-500/70 rounded-l-lg"></div>
                    <p className="mb-2 text-lg">→ 해외 대비 국내 매수세가 약한 상태</p>
                    <p className="text-lg">→ 국내 시장의 비관적 심리 반영</p>
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
                  김치 프리미엄의 급격한 변화는 종종 시장 방향 전환의 신호가 될 수 있으며, 극단적인 수치는 곧 시장 조정을 의미할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="mb-14">
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">김치 프리미엄 활용 전략</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">1</div>
                    <p className="font-bold text-xl text-blue-100">시장 심리 판단</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-green-400">김치 프리미엄 상승 → 국내 매수세 강화 → 단기 상승장</p>
                      </div>
                    </div>
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg text-red-400">김치 프리미엄 하락 → 국내 매수세 약화 → 조정 가능성</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">2</div>
                    <p className="font-bold text-xl text-blue-100">극단적 수치에서 역추세 매매</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">매우 높은 프리미엄(10%+) → <span className="text-red-400 font-medium">과열 신호, 일부 이익실현 고려</span></p>
                      </div>
                    </div>
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">역(逆) 프리미엄 상태 → <span className="text-green-400 font-medium">저평가 신호, 매수 기회 고려</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2A3990]/70 to-[#1E2761]/70 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/30 text-blue-200 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold border border-blue-400/50 text-xl">3</div>
                    <p className="font-bold text-xl text-blue-100">추세 변화 감지</p>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="relative bg-red-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">지속적 상승 후 급락 → <span className="text-red-400 font-medium">시장 상승 동력 약화, 하락 가능성</span></p>
                      </div>
                    </div>
                    <div className="relative bg-green-500/10 rounded-lg p-3">
                      <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-lg"></div>
                      <div className="flex items-center">
                        <p className="ml-3 text-lg">지속적 하락 후 반등 → <span className="text-green-400 font-medium">시장 하락세 완화, 반등 가능성</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="h-8 w-2 bg-blue-400 rounded-full mr-3"></div>
                <h2 className="text-2xl font-semibold text-blue-200">김치 프리미엄 활용 시 주요 포인트</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg">시장 상황 고려: 전체 시장 추세, 글로벌 뉴스, 한국 특정 이벤트 등을 함께 고려해야 함</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg">통화별 차이: 비트코인과 알트코인의 프리미엄은 다를 수 있으며, 인기 코인일수록 프리미엄이 높은 경향</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-lg">역사적 패턴: 과거 프리미엄 추이를 분석하여 현재의 수준이 역사적으로 높은지 낮은지 판단</p>
                </div>

                <div className="relative bg-blue-800/30 rounded-lg p-4 flex items-center">
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500 rounded-l-lg"></div>
                  <div className="bg-blue-500/20 p-2 rounded-full ml-2 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg">정책 변화: 한국의 암호화폐 규제 변화는 김치 프리미엄에 큰 영향을 미칠 수 있음을 고려</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KimchiPremiumGuide;