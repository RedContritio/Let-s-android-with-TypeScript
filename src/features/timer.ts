import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'basic/timer',
  initialState: {
    g_frame: 0,
  },
  reducers: {
    tick: (state, _action: PayloadAction<number>) => {
      state.g_frame += 1;
    },
    default: (state, _action: PayloadAction<undefined>) => state,
  },
});

export const {tick} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
