import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'basic/counter',
  initialState: {
    g_value: 0,
  },
  reducers: {
    increment: (state, _action: PayloadAction<undefined>) => {
      state.g_value += 1;
    },
    default: (state, _action: PayloadAction<undefined>) => state,
  },
});

export const {increment} = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
