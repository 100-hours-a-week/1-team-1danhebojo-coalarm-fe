// src/utils/upbitWebSocket.js
import axios from "axios";

let socketInstance = null;
let subscribers = {};
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

// 코인 정보(ticker) 구독 관리용 변수
let tickerSubscribers = {};
let marketInfoMap = {};

// 마켓 정보 초기화 함수
export const initializeMarketInfo = async () => {
  try {
    const response = await axios.get('https://api.upbit.com/v1/market/all', {
      params: { isDetails: false }
    });
    
    const markets = response.data;
    const krwMarkets = markets.filter(m => m.market.startsWith('KRW-'));
    
    // 마켓 정보 맵 업데이트
    marketInfoMap = {};
    krwMarkets.forEach(m => {
      marketInfoMap[m.market] = m;
    });
    
    // 웹소켓 연결이 열려있고 ticker 구독자가 있으면 구독 갱신
    if (isConnected && Object.keys(tickerSubscribers).length > 0) {
      subscribeTickerSymbols();
    }
    
    return marketInfoMap;
  } catch (error) {
    console.error('마켓 정보 초기화 실패:', error);
    throw error;
  }
};

// 웹소켓 초기화 함수
export const initializeSocket = () => {
  if (socketInstance !== null) {
    return;
  }
  
  try {
    socketInstance = new WebSocket('wss://api.upbit.com/websocket/v1');
    
    socketInstance.onopen = () => {
      isConnected = true;
      reconnectAttempts = 0;
      
      // 현재 등록된 모든 구독자 재구독
      resubscribeAll();

      // 코인 정보 구독자가 있으면 코인 정보 구독
      if (Object.keys(tickerSubscribers).length > 0) {
        subscribeTickerSymbols();
      }
    };
    
    socketInstance.onclose = () => {
      isConnected = false;
      socketInstance = null;
      
      // 재연결 시도
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        const delay = Math.pow(2, reconnectAttempts) * 1000;
        reconnectAttempts++;

        setTimeout(() => {
          initializeSocket();
        }, delay);
      }
    };
    
    socketInstance.onerror = (error) => {
      console.error('UpbitWebSocket: 오류 발생', error);
    };
    
    socketInstance.onmessage = async (event) => {
      try {
        const buffer = await event.data.arrayBuffer();
        const text = new TextDecoder('utf-8').decode(buffer);
        const data = JSON.parse(text);
        
        // ticker 타입 확인 - 여러 필드 검사
        if (data.type === 'ticker' || data.ty === 'ticker' || 
            (data.code && data.trade_price && data.acc_trade_price_24h)) {
          // 코인 정보(ticker) 메시지 처리
          handleTickerMessage(data);
        } else if (data.cd) {
          // 체결 내역(trade) 메시지 처리
          handleTradeMessage(data);
        }
      } catch (error) {
        console.error('UpbitWebSocket: 메시지 파싱 오류', error);
      }
    };
  } catch (error) {
    console.error('UpbitWebSocket: 초기화 오류', error);
  }
};

 
const handleTickerMessage = (data) => {
  // 데이터 필드 매핑 확인
  const code = data.code || data.cd;
  const tradPrice = data.trade_price || data.tp;
  const accTradePrice24h = data.acc_trade_price_24h || data.atp24h;
  
  if (!code) {
    return;
  }
  
  const info = marketInfoMap[code];
  if (!info) {
    return;
  }

  const symbol = code.split('-')[1];
  const tickerData = {
    coinId: code,
    name: info.korean_name,
    symbol: symbol,
    price: tradPrice,
    volume: Math.round((accTradePrice24h || 0) / 1_000_000),
    englishName: info.english_name,
  }; 

  // 모든 티커 구독자에게 데이터 전달
  Object.values(tickerSubscribers).forEach(callback => {
    try {
      callback(tickerData);
    } catch (err) {
      console.error('티커 데이터 전달 오류:', err);
    }
  });
};

// 거래 내역 메시지 처리 함수 추가
const handleTradeMessage = (data) => {
  // 데이터를 받으면 모든 구독자에게 전달
  Object.keys(subscribers).forEach(key => {
    const { symbol, callback, isWhale } = subscribers[key];
    
    // code 필드가 있는 경우만 확인
    if (data && data.cd) {
      const coinCode = `KRW-${symbol}`;
      
      // 해당 코인에 대한 데이터만 필터링
      if (data.cd === coinCode) {
        // 고래 거래 필터링 (1,000만원 이상)
        const tradeAmount = data.tp * data.tv;
        
        if ((isWhale && tradeAmount >= 10000000) || (!isWhale)) {
          callback(data);
        }
      }
    }
  });
};

// 모든 구독자 재구독
const resubscribeAll = () => {
  if (!isConnected || !socketInstance) return;
  
  const symbols = [...new Set(Object.values(subscribers).map(s => s.symbol))];
  
  if (symbols.length > 0) {
    const subscribeMsg = [
      { ticket: `trade_all_${Date.now()}` },
      { type: 'trade', codes: symbols.map(s => `KRW-${s}`) },
      { format: 'SIMPLE' }
    ];
    
    socketInstance.send(JSON.stringify(subscribeMsg));
  }
};

// 코인 정보 구독 함수
const subscribeTickerSymbols = () => {
  if (!isConnected || !socketInstance) return;
  
  const krwMarkets = Object.keys(marketInfoMap);
  if (krwMarkets.length === 0) return;
  
  const subscribeMsg = [
    { ticket: `ticker_${Date.now()}` },
    { type: 'ticker', codes: krwMarkets },
    { format: 'DEFAULT' } // SIMPLE에서 DEFAULT로 변경
  ];
  
  try {
    if (socketInstance.readyState === WebSocket.OPEN) {
      socketInstance.send(JSON.stringify(subscribeMsg));
    } else {
      console.warn("아직 WebSocket이 연결되지 않음 (CONNECTING 상태)"); 
    }
  } catch (err) {
    console.error("코인 정보 구독 오류:", err);
  }
};


// 거래 내역 구독 함수
export const subscribe = (id, symbol, callback, isWhale = false) => {
  // 고유 ID로 구독 저장
  subscribers[id] = { symbol, callback, isWhale };
  
  // 웹소켓이 없으면 초기화
  if (!socketInstance) {
    initializeSocket();
    return;
  }
  
  // 이미 연결되어 있으면 바로 구독 요청
  if (isConnected) {
    resubscribeAll();
  }
  
  // 구독 해제 함수 반환
  return () => {
    unsubscribe(id);
  };
};

// 거래 내역 구독 해제 함수
export const unsubscribe = (id) => {
  if (subscribers[id]) {
    delete subscribers[id];
    
    // 모든 구독자가 없을 때만 연결 종료
    checkAndCloseConnection();
  }
};

// 코인 정보 구독 함수
export const subscribeTicker = (id, callback) => {
  // 마켓 정보가 없으면 초기화
  if (Object.keys(marketInfoMap).length === 0) {
    initializeMarketInfo().catch(err => console.error('마켓 정보 초기화 실패:', err));
  }
  
  // 고유 ID로 구독 저장
  tickerSubscribers[id] = callback;
  
  // 웹소켓이 없으면 초기화
  if (!socketInstance) {
    initializeSocket();
  } else if (isConnected) {
    // 이미 연결되어 있으면 바로 구독 요청
    subscribeTickerSymbols();
  }
  
  // 구독 해제 함수 반환
  return () => {
    unsubscribeTicker(id);
  };
};

// 코인 정보 구독 해제 함수
export const unsubscribeTicker = (id) => {
  if (tickerSubscribers[id]) {
    delete tickerSubscribers[id];
    
    // 모든 구독자가 없을 때만 연결 종료
    checkAndCloseConnection();
  }
};


// 모든 구독자가 없을 때 연결 종료하는 함수
const checkAndCloseConnection = () => {
  const hasTradeSubscribers = Object.keys(subscribers).length > 0;
  const hasTickerSubscribers = Object.keys(tickerSubscribers).length > 0;

  // WebSocket이 연결 중이면 종료하지 않음
  if (!hasTradeSubscribers && !hasTickerSubscribers && socketInstance) {
    if (socketInstance.readyState === WebSocket.CONNECTING) {
      return;
    }

    socketInstance.close();
    socketInstance = null;
    isConnected = false;
  }
};