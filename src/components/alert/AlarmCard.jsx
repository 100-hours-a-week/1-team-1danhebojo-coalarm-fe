import React, { useState } from 'react';
import ToggleSwitch from "./ToggleSwitch.jsx";
import axiosInstance from "../../api/axios.jsx";
import {useDispatch} from "react-redux";
import {openDeleteModal} from "../../redux/deleteModalSlice.js";

const AlarmCard = ({
                       alertId,
                       active,
                       title,
                       coin,
                       alertType,
                       goldenCross,
                       targetPrice
}) => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(active);

    const updateAlarmStatus = async (alertId, data) => {
        return await axiosInstance.request({
            method: "PATCH",
            url: `alerts/${alertId}/status`,
            data: data,
        });
    };

    const handleToggle = async (value) => {
        try {
            setIsActive(value);
            await updateAlarmStatus(alertId, {
                status: value,
            });
        } catch (error) {
            console.error("알람 상태 변경 실패:", error);
            setIsActive(!value);
        }
    };

    const deleteAlarm = async (alertId) => {
        return await axiosInstance.request({
            method: "DELETE",
            url: `alerts/${alertId}`,
        });
    };

    const renderAlertInfo = () => {
        switch (alertType) {
            case 'GOLDEN_CROSS':
                return (
                    <>
                        <p className="text-white text-sm">골든 크로스</p>
                        <p className="text-gray-400 text-sm mt-1">단기 이동평균선({goldenCross?.shortMa}일)이 장기 이동평균선({goldenCross?.longMa}일)을 상향 돌파할 때 알람을 받습니다.</p>
                    </>
                );
            case 'VOLUME_SPIKE':
                return (
                    <>
                        <p className="text-white text-sm">거래량 급등 감지</p>
                        <p className="text-gray-400 text-sm mt-1">업비트의 시장 경보 시스템을 기반으로 거래량 급등 발생 시 알람을 받습니다.</p>
                    </>
                );
            case 'TARGET_PRICE':
                return (
                    <>
                        <p className="text-white text-sm">지정가 설정</p>
                        <p className="text-gray-400 text-sm mt-1">
                            코인 가격이 {targetPrice?.percentage}% {targetPrice?.percentage > 0 ? '상승' : '하락'}했을 때
                            ({targetPrice?.price.toLocaleString('ko-KR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8
                        })}원) 알람을 받습니다.
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-[540px] h-[432px] p-[30px] bg-[#081159] rounded-[20px]">
            <div className="flex items-center gap-2 mb-6">
                <img
                    src={`https://static.upbit.com/logos/${coin?.symbol}.png`}
                    className="w-[24px] h-[24px]"
                    alt={coin?.name || '코인'}
                />
                <span className="text-white text-[20px]">{coin?.name}</span>
                <span className="text-gray-300 text-[14px]">{coin?.symbol}/KRW</span>

                <div className="ml-auto">
                    <ToggleSwitch
                        value={isActive}
                        onToggle={handleToggle}
                        offValue={false}
                    />
                </div>
            </div>

            <div className="mb-[32px] w-[480px]">
                <div className="text-white-300 mb-2 border-b-[1px]">제목</div>
                <div className="bg-[#2B347A] p-4 rounded-[10px] min-h-[40px]">
                    {title}
                </div>
            </div>

            <div className="mb-6">
                <div className="text-white-300 mb-2 border-b-[1px]">알람 정보</div>
                <div className="bg-[#2B347A] p-4 mb-[40px] rounded-[10px] min-h-[75px]">
                    {renderAlertInfo()}
                </div>
            </div>

            <div className="mb-6 flex items-center justify-center">
                <div
                    className="w-[179px] h-[48px] leading-[48px] text-center rounded-[100px] bg-[#0D1D98] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] cursor-pointer"
                    onClick={() => dispatch(openDeleteModal(alertId))}
                >
                    삭제하기
                </div>
            </div>
        </div>
    );
};

export default AlarmCard;
