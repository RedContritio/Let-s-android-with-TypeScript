import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const dummySlice = createSlice({
  name: 'test/dummy',
  initialState: {},
  reducers: {
    dummy: (state, _action: PayloadAction<undefined>) => state,
    default: (state, _action: PayloadAction<undefined>) => state,
  },
});

export const {dummy} = dummySlice.actions;
export const dummyReducer = dummySlice.reducer;
