import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session'
// import counterReducer from '../../features/counter/counterSlice';
import authReducer from '../reducer/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage: storageSession,
}

const userPersistedReducer = persistReducer(authPersistConfig, authReducer);

const combinedReducer = {
  auth: userPersistedReducer,
}

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store);

export const getState = store.getState;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
