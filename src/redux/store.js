// src/store/index.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 카운터 슬라이스 생성 (값 하나만 관리)
const userSlice = createSlice({
  name: "user",
  initialState: { token: "accessToken값을 여기다 넣어서 사용해주세요!" },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const { setToken } = userSlice.actions;

// 스토어 생성
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
