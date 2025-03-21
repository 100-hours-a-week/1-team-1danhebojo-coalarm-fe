import React, { useState } from 'react';

function AlarmAddModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [targetPercentage, setTargetPercentage] = useState(''); // 지정가 설정 입력 필드

  const maxChar = 50;
  const charCount = title.length;

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChar) {
      setTitle(value);
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(prev => (prev === type ? '' : type));
  };

  const handleSave = () => {
    if (!selectedCoin.trim()) {
      alert("코인을 선택해주세요!");
      return;
    }
    if (!selectedType) {
      alert("알람 유형을 선택해주세요!");
      return;
    }

    onSave({
      title,
      coin: selectedCoin,
      type: selectedType
    });

    const alarmData = {
      title,
      coin: selectedCoin,
      type: selectedType
    };

    if (selectedType === "지정가" && !targetPercentage.trim()) {
      alert("지정가 퍼센트를 입력해주세요!");
      return;
    }

    onSave(alarmData);
  };

  const renderTypeDetail = () => {
    switch (selectedType) {
      case "지정가":
        return (
            <div className="bg-[#EAE7FA] p-4 rounded-lg">
              <h3 className="text-[#2D2D2D] font-bold mb-1">지정가 설정</h3>
              <p className="text-[#4A3F7F] text-sm mb-3">
                설정한 가격에 도달하면 알림을 받습니다.
              </p>
              <div className="flex items-center">
                <input
                    type="text"
                    value={targetPercentage}
                    onChange={(e) => setTargetPercentage(e.target.value)}
                    className="w-16 h-8 border border-gray-400 rounded-lg px-2 text-right"
                    placeholder="0"
                />
                <span className="ml-2">%</span>
                <span className="ml-4 text-gray-500">(123,322,333 원)</span>
              </div>
            </div>
        );
      case "골든 크로스":
        return (
            <div className="bg-[#EAE7FA] p-4 rounded-lg">
              <h3 className="text-[#2D2D2D] font-bold mb-1">골든 크로스</h3>
              <p className="text-[#4A3F7F] text-sm">
                단기 이동평균선(7일)이 장기 이동평균선(20일)을 상향 돌파할 때 알림을 받습니다.
              </p>
            </div>
        );
      case "급등 감지":
        return (
            <div className="bg-[#EAE7FA] p-4 rounded-lg">
              <h3 className="text-[#2D2D2D] font-bold mb-1">급등 감지</h3>
              <p className="text-[#4A3F7F] text-sm mb-2">
                업비트의 시장 경보 시스템을 기반으로 가격 급등락 또는 거래량 급등 발생 시 알람을 받습니다.
              </p>
              <ul className="list-disc list-inside text-[#4A3F7F] text-sm">
                <li>전일 종가 대비 50% 이상 가격 등락 발생 시 경보</li>
                <li>거래량 급등 발생 시 경보</li>
              </ul>
            </div>
        );
      default:
        return <div className="text-gray-400">알람 유형을 선택하세요.</div>;
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative">
          <div className="bg-[#343A7D] w-[540px] h-[677px] rounded-3xl text-white p-8 flex flex-col shadow-xl">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path
                      d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="text-[rgba(248,248,248,0.97)] font-inter text-xl font-extrabold leading-[150%] tracking-[-0.22px]">알람 생성</h2>
              </div>
              <button onClick={onClose} className="text-gray-300 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 코인 입력 */}
            <div className="mt-5 mb-6">
              <label className="block text-[rgba(248,248,248,0.97)] font-inter text-sm font-semibold mb-2">코인</label>
              <div className="border-t border-[#B7BFFF]/30 mt-2 mb-2"></div>
              <div className="relative">
                <input
                    type="text"
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    placeholder="코인명/심볼 검색"
                    className="w-full h-12 bg-[#E8EAFF] px-4 pr-12 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-[#B7BFFF] text-right text-xs font-medium mt-1">
                *현재가는 yyyy.mm.dd, hh:mm:ss 기준의 데이터입니다.
              </p>
            </div>

            {/* 제목 */}
            <div className="mb-8">
              <label className="block text-[rgba(248,248,248,0.97)] text-sm font-semibold mb-2">알람 제목</label>
              <div className="border-t border-[#B7BFFF]/30 mt-2 mb-2"></div>
              <div className="relative">
                <input
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="내용을 입력해 주세요."
                    className="w-[480px] h-[40px] pl-[18px] pr-[72px] py-[10px] rounded-lg bg-[#E8EAFF] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400">
                  ({charCount}/{maxChar})
                </div>
              </div>
            </div>

            {/* 유형 선택 */}
            <div>
              <label className="block text-[rgba(248,248,248,0.97)] text-sm font-semibold mb-2">유형</label>
              <div className="border-t border-[#B7BFFF]/30 mt-2 mb-2"></div>
              <div className="flex">
                <div className="w-[184px] h-[111px]">
                  <div className="bg-[#E8EAFF] p-4 rounded-lg">
                    {['지정가', '골든 크로스', '급등 감지'].map((type) => (
                        <div key={type} className="flex justify-between items-center mb-4 last:mb-0">
                          <span className="text-[#2D2D2D]">{type}</span>
                          <button
                              className={`w-12 h-6 rounded-full p-1 transition-colors ${selectedType === type ? 'bg-[#1631FE]' : 'bg-[#606588]'}`}
                              onClick={() => handleTypeSelect(type)}
                          >
                            <div
                                className={`w-4 h-4 bg-white rounded-full transform transition-transform ${selectedType === type ? 'translate-x-6' : ''}`}>
                            </div>
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 pl-2">
                  <div className="bg-[#293282] rounded-lg h-full">
                    {/* 동적 옵션 자리 */}
                    {renderTypeDetail()}
                  </div>
                </div>
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex flex-col h-full justify-end items-center">
              <button
                  onClick={handleSave}
                  className="bg-[#1631FE] hover:bg-[#1631FE]/90 text-white font-medium w-[180px] h-[56px] rounded-full transition-colors"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AlarmAddModal;
