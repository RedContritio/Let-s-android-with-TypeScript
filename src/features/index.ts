import {combineReducers} from '@reduxjs/toolkit';
import {dummyReducer} from './dummy';
import {timerReducer} from './timer';
import {counterReducer} from './counter';

export const rootReducer = combineReducers({
  dummyReducer,
  timerReducer,
  counterReducer,
});

export * from './dummy';
export * from './timer';
export * from './counter';
