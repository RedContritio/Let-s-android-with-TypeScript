import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import performanceNow from 'performance-now';

export const timerSlice = createSlice({
  name: 'basic/timer',
  initialState: {
    g_time_base: performanceNow() / 1000,
    g_time: 0,
    g_time_delta: 0,
  },
  reducers: {
    tick: (state, action: PayloadAction<number>) => {
      const ntime = action.payload / 1000 - state.g_time_base;
      state.g_time_delta = ntime - state.g_time;
      state.g_time = ntime;
    },
    default: (state, _action: PayloadAction<undefined>) => state,
  },
});

export const {tick} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
