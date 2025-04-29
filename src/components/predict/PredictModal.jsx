import React, { useEffect, useState, useRef } from "react";
import dashboardApi from "../../api/dashboardApi.jsx";
import predictApi from "../../api/predictApi.jsx";

const PredictModal = ({ isOpen, onClose }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [coinList, setCoinList] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [day, setDay] = useState("1");
    const [predictResult, setPredictResult] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const coinInputRef = useRef(null);
    const dropdownRef = useRef(null);

    const formatPrice = (price) => {
        if (price === undefined || price === null) return "-";
        const isSmall = price < 1;
        return new Intl.NumberFormat("ko-KR", {
            minimumFractionDigits: isSmall ? 2 : 0,
            maximumFractionDigits: isSmall ? 8 : 0,
        }).format(price);
    };

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
                console.error("코인 검색 실패:", err);
            }
        };
        const debounce = setTimeout(fetchCoins, 250);
        return () => clearTimeout(debounce);
    }, [searchKeyword]);

    const handleForecast = async () => {
        if (!selectedCoin || !day) {
            alert("코인과 예측 일수를 입력해주세요.");
            return;
        }

        try {
            const params = {
                coin: selectedCoin.name,
                days: day
            }
            const res = await predictApi.getPredict(params);
            setPredictResult(res.data);
            setShowForm(false);
        } catch (error) {
            console.error("예측 실패:", error);
            alert(error?.response?.data?.error?.message || "예측 중 문제가 발생했습니다.");
        }
    };

    const handleRetry = () => {
        setShowForm(true);
        setPredictResult(null);
        setSelectedCoin('');
        setSearchKeyword('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="relative">
                <div className="bg-[#343A7D] w-[540px] rounded-3xl text-white p-8 shadow-xl">
                    {/* 헤더 */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17l6-6 4 4 8-8" />
                            </svg>
                            <h2 className="text-xl font-extrabold">가격 예측</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-300 hover:text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18"
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    {/* 입력 폼 (showForm이 true일 때만 보여주기) */}
                    {showForm && (
                        <div className="transition duration-300 ease-out opacity-100 scale-100">
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

                        {/* 예측 입력 */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">예측 시점</label>
                            <input
                                type="number"
                                min="1"
                                value={day}
                                placeholder="예측할 일 수를 입력해주세요."
                                onChange={(e) => setDay(e.target.value)}
                                className="w-[480px] h-[40px] pl-[18px] pr-[16px] py-[10px] rounded-md bg-[#E8EAFF] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* 예측 버튼 */}
                        <div className="flex flex-col h-full justify-end items-center">
                            <button
                            onClick={handleForecast}
                            className="bg-[#1631FE] hover:bg-[#1631FE]/90 text-white w-[180px] h-[56px] rounded-full font-medium transition"
                            >
                                예측하기
                            </button>
                        </div>
                    </div>
                    )}
                    {/* 예측 결과 */}
                    {predictResult && (
                        <div className="w-full text-black rounded-lg text-sm min-h-[100px] leading-relaxed text-center">
                        {/* 예측 결과 박스 */}
                            <div className="mb-6 bg-[#EAE7FA] text-black p-4 rounded-lg text-sm leading-relaxed">
                                <p>
                                    <strong>{selectedCoin.name}</strong> 의{" "}
                                    <strong>{predictResult.days}일 뒤</strong> 예측 가격은{" "}
                                    <strong>{Math.round(predictResult.price).toLocaleString()}원</strong>입니다.
                                </p>
                                <p className="mt-2">
                                    기영이 차트 유사율: <strong>{Number(predictResult.kiyoung)}%</strong>
                                </p>
                                <p className="text-xs text-red-600 mt-2">
                                    ⚠️ 모든 투자에 대한 책임은 투자자 본인에게 있습니다.
                                </p>
                            </div>

                            {/* 버튼 */}
                            <button
                                onClick={handleRetry}
                                className="bg-[#1631FE] hover:bg-[#1631FE]/90 text-white w-[180px] h-[56px] rounded-full font-medium transition"
                            >
                                다시 예측하기
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PredictModal;
