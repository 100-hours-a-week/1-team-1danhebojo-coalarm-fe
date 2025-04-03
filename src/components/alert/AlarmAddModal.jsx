import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import dashboardApi from '../../api/dashboardApi';

function AlarmAddModal({ onClose, onAddAlert }) {
  const [title, setTitle] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [targetPercentage, setTargetPercentage] = useState(''); // 지정가 설정 입력 필드

  const [coinList, setCoinList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const maxChar = 50;
  const charCount = title.length;

  const [showPercentDropdown, setShowPercentDropdown] = useState(false);
  const percentInputRef = useRef(null);
  const percentDropdownRef = useRef(null);
  const coinInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [isCustomInput, setIsCustomInput] = useState(null);

  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '잘못된 시간 형식';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}, ${hh}:${min}:${sec} (KST)`;
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '-';

    const isSmall = price < 1;
    const formatter = new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: isSmall ? 2 : 0,
      maximumFractionDigits: isSmall ? 8 : 0,
    });

    return formatter.format(price);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
          percentDropdownRef.current &&
          !percentDropdownRef.current.contains(event.target) &&
          !percentInputRef.current.contains(event.target)
      ) {
        setShowPercentDropdown(false);
      }

      if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          !coinInputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 코인 검색 API 호출
  useEffect(() => {
    const fetchCoins = async () => {
      if (!searchKeyword.trim()) return;
      try {
        const params = {
          keyword: searchKeyword,
          quoteSymbol: 'KRW'
        }
        const res = await dashboardApi.searchCoins(params);
        setCoinList(res.data || []);
      } catch (err) {
        console.error('코인 검색 실패:', err);
      }
    };
  
    const debounce = setTimeout(fetchCoins, 300);
    return () => clearTimeout(debounce);
  }, [searchKeyword]);

  // 지정가를 이미 선택한 상태에서 코인을 선택할 때 값 변경
  useEffect(() => {
    if (selectedType === "지정가" && selectedCoin?.price && targetPercentage.trim() !== '') {
      const percentage = parseFloat(targetPercentage);
      if (!isNaN(percentage)) {
        const calc = selectedCoin.price * (1 + percentage / 100);
        setCalculatedPrice(Number(calc.toFixed(8)));
      }
    } else {
      setCalculatedPrice(null);
    }
  }, [selectedCoin, selectedType, targetPercentage]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChar) {
      setTitle(value);
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(prev => (prev === type ? '' : type));
  };

  const handleSave = async () => {
    if (!selectedCoin) {
      alert("코인을 선택해주세요!");
      return;
    }

    if (!selectedType) {
      alert("알람 유형을 선택해주세요!");
      return;
    }

    const baseData = {
      symbol: selectedCoin.symbol,
      title: title,
    };

    let payload = {};

    if (selectedType === "지정가") {
      if (!targetPercentage.trim()) {
        alert("지정가 퍼센트를 입력해주세요!");
        return;
      }

      // 실시간 현재가 기반으로 타겟 가격 계산
      const percentage = parseFloat(targetPercentage);

      payload = {
        ...baseData,
        type: "TARGET_PRICE",
        percentage: percentage,
        target_price: calculatedPrice,
      };
    } else if (selectedType === "골든 크로스") {
      payload = {
        ...baseData,
        type: "GOLDEN_CROSS",
      };
    } else if (selectedType === "급등 감지") {
      payload = {
        ...baseData,
        type: "VOLUME_SPIKE",
      };
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/alerts`, payload, {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (response.status === 200) {
        const createdAlert = response.data.data;
        if (onAddAlert) {
          onAddAlert(createdAlert);
        }
        onClose(); // 모달 닫기
      } else if (response.status === 409) {
        alert(response.data.data?.error?.message || "이미 등록된 알람입니다.");
      } else if (response.status === 500) {
        alert("서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
      } else {
        alert(`알 수 없는 오류 발생 (status: ${response.status})`);
      }
    } catch (error) {
      console.error("요청 실패 (Axios 자체 문제 등):", error);
      alert("요청 중 문제가 발생했어요. 네트워크 상태를 확인해주세요.");
    }
  };

  // 색상 클래스 동적 지정
  const getPercentColor = () => {
    const value = parseFloat(targetPercentage);
    if (isNaN(value)) return 'text-gray-800';
    if (value > 0) return 'text-red-500';
    if (value < 0) return 'text-blue-500';
    return 'text-gray-800';
  };

  // 지정자, 골든 크로스, 급등 감지
  const renderTypeDetail = () => {
    switch (selectedType) {
      case "지정가":
        return (
            <div className="bg-[#EAE7FA] p-4 rounded-lg">
              <h3 className="text-[#2D2D2D] font-bold mb-1">지정가 설정</h3>
              <p className="text-[#4A3F7F] text-sm mb-3">
                설정한 가격에 도달하면 알림을 받습니다.
              </p>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#2D2D2D]">현재가 대비</span>

                {/* 드롭다운 포함한 relative wrapper */}
                <div className="relative w-[68px] h-[28px]">
                  <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9\\-]*"  // ← '-'를 escape!
                      ref={percentInputRef}
                      value={targetPercentage}
                      onChange={(e) => {
                        if (!isCustomInput) return;

                        let value = e.target.value;

                        // 빈 값 허용 (모두 지우기)
                        if (value === '') {
                          setTargetPercentage('');
                          setCalculatedPrice(null);
                          return;
                        }

                        // '-' 단독 허용 (마이너스 입력 시작 시)
                        if (value === '-') {
                          setTargetPercentage('-');
                          setCalculatedPrice(null);
                          return;
                        }

                        let parsed = parseInt(value, 10);
                        if (isNaN(parsed)) return;

                        if (parsed > 99) parsed = 99;
                        if (parsed < -99) parsed = -99;

                        const newValue = String(parsed);
                        if (newValue !== value) {
                          e.target.value = newValue;
                        }
                        setTargetPercentage(newValue);

                        if (selectedCoin?.price) {
                          const calc = selectedCoin.price * (1 + parsed / 100);
                          const finalPrice = isNaN(calc) ? null : Number(calc.toFixed(8));
                          setCalculatedPrice(finalPrice);
                        }
                      }}
                      readOnly={!isCustomInput}
                      onClick={() => setShowPercentDropdown(!showPercentDropdown)}
                      placeholder="0"
                      className={`
                                w-full h-full pl-1 pr-5
                                border border-gray-400 rounded-lg
                                text-right text-sm text-[#2D2D2D]
                                ${getPercentColor()} cursor-pointer
                                appearance-none
                              `}
                  />

                  <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-[#2D2D2D] pointer-events-none">%</span>

                  {/* 드롭다운을 input 안에 묶은 상대 위치로 이동 */}
                  {showPercentDropdown && (
                      <ul
                          ref={percentDropdownRef}
                          className="absolute left-0 top-[36px] w-20 bg-white text-black rounded-md border border-gray-300 shadow-lg z-50"
                      >
                        {['10%', '5%', '0%', '-5%', '-10%', '직접 입력'].map((option) => {
                          const isCustom = option === '직접 입력';
                          const numericValue = parseFloat(option);
                          let colorClass = 'text-gray-800';

                          if (!isNaN(numericValue)) {
                            if (numericValue > 0) colorClass = 'text-red-500';
                            else if (numericValue < 0) colorClass = 'text-blue-500';
                          }
                          return (
                              <li
                                  key={option}
                                  onClick={() => {
                                    if (isCustom) {
                                      setIsCustomInput(true);
                                      setShowPercentDropdown(false);
                                      // input 포커스
                                      setTimeout(() => {
                                        percentInputRef.current?.focus();
                                      }, 100);
                                      return;
                                    } else{
                                      setIsCustomInput(false); // 드롭다운 모드
                                      const value = option.replace('%', '');
                                      setTargetPercentage(value);
                                      setShowPercentDropdown(false);
                                      if (selectedCoin?.price) {
                                        const calc = selectedCoin.price * (1 + parseInt(value, 10) / 100);
                                        setCalculatedPrice(Number(calc.toFixed(8)));
                                      }
                                    }

                                    const value = option.replace('%', '');
                                    setTargetPercentage(value);
                                    setShowPercentDropdown(false);

                                    if (selectedCoin?.price) {
                                      const calc = selectedCoin.price * (1 + parseInt(value, 10) / 100);
                                      setCalculatedPrice(Number(calc.toFixed(8)));
                                    }
                                  }}
                                  className={`px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm font-medium ${colorClass}`}
                              >
                                {option}
                              </li>
                          );
                        })}
                      </ul>
                  )}
                </div>

                <span className="text-xs text-gray-500">
                  {calculatedPrice
                      ? `(${formatPrice(calculatedPrice)} 원)`
                      : `(${formatPrice(selectedCoin?.price) || '0'} 원)`
                  }
                </span>
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
        return <div className="text-gray-400 p-4">알람 유형을 선택하세요.</div>;
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

              {/* 선택된 코인이 있을 때 */}
              {selectedCoin ? (
                  <div className="bg-[#E8EAFF] px-4 py-3 rounded-xl flex justify-between items-center">
                    <div className="text-[#2D2D2D] text-sm font-medium flex flex-wrap gap-4">
                      <span>
                        코인명 : <strong>{selectedCoin.name}</strong> <span className="font-bold">{selectedCoin.symbol}</span>
                      </span>
                      <span>현재가 : {formatPrice(selectedCoin.price) || '-'}</span>
                    </div>
                    <button
                        onClick={() => setSelectedCoin(null)}
                        className="text-[#0A1672] hover:text-red-600 ml-4"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
              ) : (
                  // 검색 인풋
                  <div className="relative">
                    <input
                        ref={coinInputRef}
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => {
                          setSearchKeyword(e.target.value);
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                        placeholder="코인명/심볼 검색"
                        className="w-full h-12 bg-[#E8EAFF] px-4 pr-12 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {showDropdown && coinList.length > 0 && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-lg bg-[#E8EAFF] text-black shadow-lg border border-gray-300"
                      >
                        <div className="flex justify-between px-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-300">
                          <span className="w-1/2">코인명 / 심볼</span>
                          <span className="w-1/2 text-right">현재가</span>
                        </div>
                        {coinList
                          .filter((coin) => {
                            const search = searchKeyword.toLowerCase();
                            return (
                              search === '' ||
                              coin.name.toLowerCase().includes(search) ||
                              coin.symbol.toLowerCase().includes(search)
                            );
                          })
                          .map((coin) => (
                            <div
                              key={coin.coinId}
                              onClick={() => {
                                setSelectedCoin(coin);
                                setSearchKeyword('');
                                setShowDropdown(false);
                              }}
                              className="flex justify-between items-center px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                            >
                              <span className="w-1/2 truncate">{coin.name} ({coin.symbol})</span>
                              <span className="w-1/2 text-right">{formatPrice(coin.price) || '-'}</span>
                            </div>
                          ))}
                      </div>
                    )}
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="#0D1D98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
              )}

              <p className="text-[#B7BFFF] text-right text-xs font-medium mt-1">
                {selectedCoin?.timestamp
                  ? `*현재가는 ${formatDateTime(selectedCoin.timestamp)} 기준의 데이터입니다.`
                  : '*현재가 정보가 없습니다.'}
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
                    className="w-[480px] h-[40px] pl-[18px] pr-[72px] py-[10px] rounded-lg bg-[#E8EAFF] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                              className={`w-12 h-6 rounded-full p-1 transition-colors ${selectedType === type ? 'bg-[#4ADE80]' : 'bg-[#c4c4c4]'}`}
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