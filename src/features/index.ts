import {combineReducers} from '@reduxjs/toolkit';
import {dummyReducer} from './dummy';
import {timerReducer} from './timer';

export const rootReducer = combineReducers({
  dummyReducer,
  timerReducer,
});
