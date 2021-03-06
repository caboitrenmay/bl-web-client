import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import newsReducer from '../../application';
import logger from 'redux-logger';
import { IS_LOGGER } from '../envConfig';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
  middleware: getDefaultMiddleware =>
    IS_LOGGER ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

console.log('reducer: ', store.getState);
