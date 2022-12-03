import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import playerReducer from '../features/players/playerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playerReducer,
  },
});
