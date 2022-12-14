import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { choreHistoryReducer } from './choreHistorySlice';
import { choreReducer } from './choreSlice';
import { householdReducer } from './householdSlice';
import { profileReducer } from './profileSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    household: householdReducer,
    profile: profileReducer,
    chore: choreReducer,
    choreHistory: choreHistoryReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
