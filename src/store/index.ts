import AsyncStorage from '@react-native-community/async-storage';
import {configureStore, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from '../features';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  predicate: (_, action: PayloadAction) => {
    if (action.type.startsWith('basic/timer')) {
      return false;
    }
    return true;
  },
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export default store;

export const persistor = persistStore(store);
