import React, { useState, useEffect } from 'react';
import { IconVolume, IconPagination } from '../../assets/images/mypage/Icons';
import AlarmDetailModal from './AlarmDetailModal';
import userApi from '../../api/userApi';

function NotificationSection({ currentPage, setCurrentPage }) {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const ITEMS_PER_PAGE = 3;

  // 초기 데이터 로드 및 총 페이지 계산
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        const response = await userApi.getAlertHistory(0, ITEMS_PER_PAGE);
        const totalItems = response.data?.totalElements || 0;
        const maxValidPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
        
        setTotalElements(totalItems);
        setTotalPages(maxValidPages);
        
        // 현재 페이지가 총 페이지보다 크면 마지막 페이지로 조정
        if (currentPage > maxValidPages) {
          setCurrentPage(maxValidPages);
        }
        
        setIsInitialized(true);
      } catch (err) {
        console.error('초기 페이지 정보 로드 실패:', err);
        setError('알람 내역을 불러오는데 실패했습니다.');
        setIsInitialized(true);
      } finally {
        setLoading(false);
      }
    };
    
    initializeData();
  }, []);

  // 현재 페이지 데이터 로드
  useEffect(() => {
    // 초기화되지 않았으면 아직 첫번째 useEffect가 실행 중이므로 건너뜀
    if (!isInitialized) return;
    
    const fetchAlertHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const pageNumber = currentPage - 1;
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        
        // 현재 페이지 데이터 로드
        const response = await userApi.getAlertHistory(pageNumber, ITEMS_PER_PAGE);
        console.log('알람 히스토리 조회 결과:', response);
        
        // 응답 구조 확인을 통한 데이터 추출
        const alerts = response.data?.contents || [];
        const totalItems = response.data?.totalElements || 0;
        
        // totalPages 및 totalElements 업데이트
        const calculatedTotalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
        setTotalElements(totalItems);
        setTotalPages(calculatedTotalPages);
        
        // 알림 데이터 설정
        setNotifications(alerts.map((alert, index) => ({
          id: alert.alertHistoryId,
          // 실제 번호 대신 페이지 내에서 역순으로 번호 부여 (가장 최근 알람이 1번)
          displayNumber: totalItems - (pageNumber * ITEMS_PER_PAGE) - index,
          content: alert.alert?.title || `알림 ${alert.alertHistoryId}`,
          // 날짜 포맷팅
          date: new Date(alert.registeredDate).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        })));
        
        // 빈 데이터 처리 - 특별한 경우만 체크
        if (alerts.length === 0 && currentPage !== 1 && totalItems > 0) {
          console.log(`페이지(${currentPage})에 데이터가 없습니다. 마지막 유효 페이지로 이동합니다.`);
          setCurrentPage(calculatedTotalPages);
        }
        
      } catch (err) {
        console.error('알람 히스토리 조회 실패:', err);
        
        // 에러 메시지
        let errorMessage = '알람 내역을 불러오는데 실패했습니다.';
        
        if (err.response && err.response.status === 500) {
          const errorData = err.response.data;
          if (errorData.error && errorData.error.message && 
              errorData.error.message.includes('fromIndex') && 
              errorData.error.message.includes('toIndex')) {
            
            console.log('페이지 범위 초과. 첫 페이지로 이동합니다.');
            setCurrentPage(1);
            setError('요청한 페이지가 범위를 초과했습니다. 첫 페이지로 이동합니다.');
            return; // 함수 종료
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertHistory();
  }, [currentPage, isInitialized]);

  
  const handleNoticeClick = async (notice) => {
    try {
      // 알람 상세 조회 API 호출
      setLoading(true);
      const response = await userApi.getAlertDetail(notice.id);
      console.log('알람 상세 조회 결과:', response);
      
      // 상세 조회 결과에 있는 날짜도 포맷팅
      if (response && response.data && response.data.registeredDate) {
        response.data.formattedDate = new Date(response.data.registeredDate).toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
      
      setSelectedNotice(response);
      setShowModal(true);
    } catch (err) {
      console.error('알람 상세 조회 실패:', err);
      // API 실패 시 에러 처리
      setError(`알람 상세 정보를 불러오는데 실패했습니다. (ID: ${notice.id})`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayPages = 5;
    
    if (totalPages <= 0) return pageNumbers;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
    
    if (endPage - startPage + 1 < maxDisplayPages) {
      startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // 페이지 이동 처리 함수
  const handlePageChange = (pageNumber) => {
    // 유효한 페이지 범위인지 확인
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className="bg-[#081159]/70 backdrop-blur-sm rounded-[30px] p-5 w-[922px] h-[276px] flex flex-col mb-[24px]">
        <div>
          <div className="flex items-center mb-3">
            <IconVolume className="mr-2 text-white w-4 h-4" />
            <h2 className="font-medium text-white text-base ml-2">알람 내역</h2>
          </div>
          
          {/* 알람 테이블 */}
          <div>
            <div className="grid grid-cols-12 py-2.5 px-4 bg-[#2B347A] rounded-t-md text-xs font-medium border-b border-[#2e3a80]">
              <div className="col-span-1 text-center text-gray-200">번호</div>
              <div className="col-span-9 text-gray-200">제목</div>
              <div className="col-span-2 text-center text-gray-200">일시</div>
            </div>

            <div className="max-h-[120px] overflow-y-auto">
              {loading ? (
                <div className="text-center py-10 text-white">로딩 중...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-400">{error}</div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-10 text-gray-400">알람 내역이 없습니다.</div>
              ) : (
                notifications.map(notice => (
                  <div 
                    key={notice.id} 
                    className="grid grid-cols-12 py-2.5 px-4 border-b border-[#2e3a80] text-xs hover:bg-[#1a2272]/30 cursor-pointer"
                    onClick={() => handleNoticeClick(notice)}
                  >
                    <div className="col-span-1 text-center text-white">{notice.displayNumber}</div>
                    <div className="col-span-9 text-white">{notice.content}</div>
                    <div className="col-span-2 text-center text-white">{notice.date}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* 페이지네이션 - 데이터가 있고 총 페이지가 1보다 클 때만 표시 */}
        {totalElements > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-auto mb-2">
            <button 
              className={`text-gray-300 hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <IconPagination direction="left" className="w-3 h-3" />
            </button>
            
            {renderPageNumbers().map(page => (
              <button 
                key={page}
                className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                  currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className={`text-gray-300 hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <IconPagination direction="right" className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* 알람 상세 모달 */}
      {showModal && (
        <AlarmDetailModal 
          onClose={handleCloseModal} 
          alertData={selectedNotice}
        />
      )}
    </>
  );
}

export default NotificationSection;