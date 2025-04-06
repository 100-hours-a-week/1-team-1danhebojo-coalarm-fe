import { EventSourcePolyfill } from 'event-source-polyfill';
import { toast } from 'sonner';

// 오디오 컨텍스트와 사운드 생성
let audioContext = null;
let audioBuffer = null;
let isAudioInitialized = false;

// 소리 설정을 로컬 스토리지에서 관리
const SOUND_ENABLED_KEY = 'alertSoundEnabled';

// 소리 활성화 상태 가져오기 (기본값: false)
export const getAlertSoundEnabled = () => {
  const storedValue = localStorage.getItem(SOUND_ENABLED_KEY);
  return storedValue === null ? false : storedValue === 'true';
};

// 소리 활성화 상태 설정하기
export const setAlertSoundEnabled = (enabled) => {
  localStorage.setItem(SOUND_ENABLED_KEY, enabled);
  return enabled;
};

// 소리 활성화 상태 토글하기
export const toggleAlertSound = () => {
  const currentState = getAlertSoundEnabled();
  const newState = !currentState;
  setAlertSoundEnabled(newState);
  
  // 소리를 켰을 때 오디오 컨텍스트 초기화 (사용자 상호작용 이용)
  if (newState && !isAudioInitialized) {
    initializeAudio();
  }
  
  return newState;
};

// 오디오 컨텍스트 초기화 및 사운드 로드
const initializeAudio = async () => {
  try {
    // AudioContext 생성 (브라우저 호환성 고려)
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    
    // 사운드 파일 가져오기
    const response = await fetch('/kuaa.mp3');
    const arrayBuffer = await response.arrayBuffer();
    
    // 오디오 버퍼로 디코딩
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    isAudioInitialized = true;
    
    console.log('오디오 초기화 완료');
  } catch (error) {
    console.error('오디오 초기화 실패:', error);
  }
};

// 페이지 로드 시 사용자 인터랙션을 기다렸다가 오디오 초기화
export const setupAudioForAutoplay = () => {
  const initOnInteraction = () => {
    if (getAlertSoundEnabled() && !isAudioInitialized) {
      initializeAudio();
    }
    
    // 이벤트 리스너 제거
    document.removeEventListener('click', initOnInteraction);
    document.removeEventListener('keydown', initOnInteraction);
    document.removeEventListener('touchstart', initOnInteraction);
  };
  
  // 사용자 상호작용 이벤트에 리스너 추가
  document.addEventListener('click', initOnInteraction);
  document.addEventListener('keydown', initOnInteraction);
  document.addEventListener('touchstart', initOnInteraction);
};

export const connectSSE = () => {
  // 쿠키에서 토큰 가져오기
  const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };
  
  const authToken = getCookieValue('Authorization');
  console.log('토큰 존재 여부:', !!authToken);
  
  // SSE 연결 설정 (타임아웃 연장) 
  const eventSource = new EventSourcePolyfill(import.meta.env.VITE_BASE_URL+'/alerts/subscribe', {
    headers: {
      Authorization: authToken
    },
    withCredentials: true,
    heartbeatTimeout: 300000 // 5분(300,000ms)으로 타임아웃 연장
  });
  
  // 연결 성공 이벤트
  eventSource.onopen = (event) => {
    console.log('SSE 연결 성공', event);
  };
  
  // 일반 메시지 수신 이벤트 (이름이 없는 이벤트)
  eventSource.onmessage = (event) => {
    console.log('SSE 기본 메시지 데이터:', event.data);
  };
  
  // "alert" 이벤트 리스너 등록 (서버에서 명시적으로 지정한 이벤트 이름)
  eventSource.addEventListener('alert', (event) => {
    console.log('SSE alert 이벤트 데이터:', event.data);
    
    // JSON 파싱 시도
    try {
      const alertData = JSON.parse(event.data);
      console.log('파싱된 알림 데이터:', alertData);
      
      // 토스트 메시지 표시
      showAlertToast(alertData);
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
    }
  });
  
  // 오류 이벤트
  eventSource.onerror = (error) => {
    console.log('SSE 연결 오류:', error);
  };
  
  return eventSource;
};

const playAlertSound = () => {
  // 소리가 비활성화되어 있으면 재생하지 않음
  if (!getAlertSoundEnabled()) {
    console.log('알림 소리가 비활성화되어 있어 재생하지 않습니다.');
    return;
  }

  // 오디오가 초기화되어 있지 않으면 재생하지 않음
  if (!isAudioInitialized || !audioContext || !audioBuffer) {
    console.log('오디오가 아직 초기화되지 않았습니다.');
    return;
  }

  try {
    // AudioContext가 suspended 상태인 경우 resume
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // 소리 재생 (Web Audio API 사용)
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    
    console.log('알림 소리 재생 성공');
  } catch (error) {
    console.error('알람 소리 재생 중 예외 발생:', error);
  }
};

// 가격 포맷 함수 - 1원 이상은 소수점 2자리, 1원 미만은 소수점 8자리
const formatPrice = (price) => {
  if (price >= 1) {
    return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  } else {
    return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 });
  }
};

// 알림 데이터를 토스트로 표시하는 함수
const showAlertToast = (alertData) => {
  let title = "알림";
  let message = "";
  
  // 알림 유형에 따라 다른 메시지 및 제목 설정
  if (alertData.targetPriceFlag) {
    title = "가격 알림";
    const formattedPrice = formatPrice(alertData.targetPrice.price);
    message = `${alertData.title}\n 목표 가격 ${formattedPrice}에 도달했습니다 (${alertData.targetPrice.percentage}% 변동)`;
  } else if (alertData.goldenCrossFlag) {
    title = "골든 크로스 알림";
    message = `${alertData.title}\n 골든 크로스가 발생했습니다`;
  } else if (alertData.volumeSpikeFlag) {
    title = "거래량 급증 알림";
    message = `${alertData.title}\n 거래량이 급증했습니다`;
  } else {
    message = alertData.title || "새로운 알림이 도착했습니다";
  }

  playAlertSound();

  // 소리 상태 아이콘 결정
  const soundEnabled = getAlertSoundEnabled();
  const soundIcon = soundEnabled 
    ? <SoundOnIcon onClick={handleSoundToggle} /> 
    : <SoundOffIcon onClick={handleSoundToggle} />;

  // 토스트 메시지 표시
  toast.info(
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div className="font-semibold">{title}</div>
        <div className="cursor-pointer">{soundIcon}</div>
      </div>
      <div style={{ whiteSpace: "pre-line" }}>{message}</div>
      <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
      </div>
    </div>
  );
};

// 소리 토글 핸들러
const handleSoundToggle = () => {
  const enabled = toggleAlertSound();
  console.log(`알림 소리가 ${enabled ? '활성화' : '비활성화'}되었습니다.`);
  
  // 소리 상태 변경을 알리는 토스트
  toast.success(
    <div>
      알림 소리가 {enabled ? '켜졌습니다' : '꺼졌습니다'}
    </div>,
    { duration: 2000 }
  );
};

// 소리 켜짐 아이콘 컴포넌트
const SoundOnIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
    className="cursor-pointer"
  >
    <path d="M11 5L6 9H2v6h4l5 4zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

// 소리 꺼짐 아이콘 컴포넌트
const SoundOffIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
    className="cursor-pointer"
  >
    <path d="M11 5L6 9H2v6h4l5 4z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);