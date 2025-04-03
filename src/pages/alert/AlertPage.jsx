// src/pages/AlertPage.jsx
import Sidebar from "../../components/Sidebar.jsx";
import ToggleSwitch from "../../components/alert/ToggleSwitch.jsx";
import React, {useEffect, useRef, useState} from "react";
import AlarmCard from "../../components/alert/AlarmCard.jsx";
import alertApi from "../../api/alertApi.js";
import CoinItem from "../../components/alert/CoinItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {closeDeleteModal} from "../../redux/deleteModalSlice.js";
import {openModal, closeModal} from "../../redux/createAlertModalSlice.js";
import AlarmDeleteModal from "../../components/alert/AlarmDeleteModal.jsx";
import AlarmAddModal from "../../components/alert/AlarmAddModal.jsx";

const AlertPage = () => {
    // 삭제 모달 전역 상태
    const { isOpen: isDeleteOpen, alertId } = useSelector((state) => state.deleteModal);
    const { isOpen: isCreateOpen } = useSelector((state) => state.createAlertModal);
    const dispatch = useDispatch();

    // 추가: 알람 등록 시 새 알람 추가
    const handleAlertAdd = (newAlert) => {
        setAlerts((prev) => [newAlert, ...prev]); // 최신순으로 추가
        setTotalCount((prev) => prev + 1);
        if (sortOption !== 'LATEST') {
            setSortOption('LATEST');
            alert("새 알람이 추가되어 최신순으로 정렬되었어요.");
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await alertApi.deleteAlert(alertId);

            // 삭제된 알람 목록에서 제거
            setAlerts((prev) => prev.filter((alert) => alert.alertId !== alertId));
            setTotalCount((prev) => prev - 1);
            dispatch(closeDeleteModal());
        } catch (err) {
            console.error("알람을 삭제하는데 실패했습니다.", err);
        }
    };
    // 코인 목록 드롭다운
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [coins, setCoins] = useState([]);

    // 알람 목록 필터링
    const [selectedCoin, setSelectedCoin] = useState([]);
    const [active, setActive] = useState(true);
    const [sortOption, setSortOption] = useState('LATEST');
    const sortOptions = [
        { label: '최신순', value: 'LATEST' },
        { label: '등록순', value: 'OLDEST' }
    ];

    // 알람 목록 인피니티 스크롤
    const [alerts, setAlerts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const limit = 4;

    const alertIdSet = useRef(new Set());
    const loadMoreRef = useRef(null);

// 필터/정렬 바뀌면 초기화
    useEffect(() => {
        setAlerts([]);
        setOffset(0);
        setHasNext(true);
        alertIdSet.current.clear(); // 중복 방지용 세트 초기화
    }, [active, selectedCoin, sortOption]);

// 알람 목록 불러오기
    const fetchAlerts = async (customOffset = offset) => {
        if (!hasNext || isFetching) return;

        setIsFetching(true);
        try {
            const params = {
                offset: customOffset,
                limit,
                active,
                symbol: selectedCoin?.symbol || null,
                sort: sortOption,
            };

            const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== null));
            const res = await alertApi.getAlerts(cleanParams);
            const { contents, hasNext: nextPageExists, totalElements } = res.data;

            const unique = contents.filter((a) => !alertIdSet.current.has(a.alertId));
            unique.forEach((a) => alertIdSet.current.add(a.alertId));

            setAlerts((prev) => [...prev, ...unique]);
            setOffset(customOffset + limit);
            setHasNext(nextPageExists);
            setTotalCount(totalElements);
        } catch (err) {
            console.error('알람 목록 로딩 실패:', err);
        } finally {
            setIsFetching(false);
        }
    };

    // IntersectionObserver 등록
    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchAlerts(offset);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(loadMoreRef.current);

        return () => {
            observer.disconnect();
        };
    }, [hasNext, offset]);

    // 사용자가 설정한 알람의 코인 목록 불러오기
    useEffect(() => {
        const fetchMyAlertCoins = async () => {
            try {
                // API에서 사용자의 알람에 설정된 코인 목록만 불러오기
                const response = await alertApi.getMyAlertCoins();
                const data = response.data
                setCoins(data);
            } catch (err) {
                console.error('사용자가 설정한 알람의 코인 목록을 불러오는데 실패했습니다:', err);
            }
        };

        fetchMyAlertCoins();
    }, [alerts]);

    // 코인 목록 드롭 다운
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    // 코인 선택
    const selectCoin = (coin) => {
        if (selectedCoin?.coinId === coin.coinId) {
            setSelectedCoin(null); // 이미 선택된 코인 클릭 → 해제
        } else {
            setSelectedCoin(coin); // 새로운 코인 선택
        }
    };

    return (
        <>
            <Sidebar />
            <div className="flex text-white h-screen pt-[80px] pl-[300px]">
                <div className="flex-1 h-full overflow-y-auto px-4 md:px-8 lg:px-[120px] xl:px-[220px] py-[60px]">
                    {/*알람 등록 버튼*/}
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={() => dispatch(openModal())}
                            className="bg-blue-600 text-white px-6 py-2 rounded-[100px] bg-[#1631FE] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] w-[212px] h-[48px]">
                            알림 설정하기
                        </button>
                    </div>

                    <div className="bg-[#0a1537] rounded-[30px] py-[33px] px-[31px] mb-8 flex flex-col">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            {/* 코인 목록 드롭다운 버튼*/}
                            <div
                                className="border border-[rgba(183,191,255,0.30)] bg-[#2B347A] flex justify-between w-[176px] rounded-[20px]"
                                onClick={toggleDropdown}
                            >
                                <div className="text-white w-[176px] h-[60px] px-[22px] rounded-lg leading-[60px]">
                                    코인
                                </div>
                                <div className="inset-y-0 flex items-center px-[22px]">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                            {/* 알람 활성화 토글 버튼*/}
                            <div className="flex items-center">
                                <span className="mr-[20px]">활성화된 알람만 보기</span>
                                <ToggleSwitch
                                    value={active}
                                    onToggle={setActive}
                                    offValue={null}
                                />
                            </div>
                        </div>
                        {/* 코인 목록 드롭다운 메뉴*/}
                        {isDropdownOpen && (
                            <div className="border-t-[#rgba(150, 158, 221, 0.30)] border-t-[1px] mt-[20px] ">
                                <div className="mt-[20px] max-h-[200px] overflow-y-auto flex flex-wrap gap-[12px]">
                                    {coins.map((coin) => (
                                        <CoinItem
                                            key={coin.coinId}
                                            coin={coin}
                                            selected={selectedCoin?.coinId === coin.coinId}
                                            onSelect={selectCoin}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 알람 개수 & 정렬 기준 */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white-800 pb-2 gap-2">
                        <h1 className="text-lg font-medium">총 {totalCount}개의 알림이 있어요.</h1>

                        {/* 정렬 기준 */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="appearance-none bg-transparent rounded py-2 px-4 pr-8 text-white cursor-pointer focus:outline-none"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* 알람 목록 - 반응형 그리드 적용 */}
                    <div className="mt-[44px] grid grid-cols-1 3xl:grid-cols-2 gap-[40px]">
                        {alerts.map((alert) => (
                            <AlarmCard key={alert.alertId} {...alert}/>
                        ))}

                        {/* 로딩 중 표시 */}
                        {isFetching && (
                            <div className="col-span-1 lg:col-span-2 flex justify-center items-center py-72">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}

                        {/* 더 불러올 감시용 ref */}
                        <div ref={loadMoreRef} className="h-[40px] bg-transparent"/>
                    </div>

                    {isDeleteOpen && (
                        <AlarmDeleteModal
                            onClose={() => dispatch(closeDeleteModal())}
                            onConfirm={handleDeleteConfirm}
                        />
                    )}

                    {isCreateOpen && (
                        <AlarmAddModal
                            onAddAlert={handleAlertAdd}
                            onClose={() => dispatch(closeModal())}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default AlertPage;