import { configureStore } from '@reduxjs/toolkit';
import carReducer from './carSlice';
import raceReducer from './raceSlice';
import winnerReducer from './winnerSlice';
import bannerReducer from './bannerSlice';

const store = configureStore({
  reducer: {
    car: carReducer,
    race: raceReducer,
    winner: winnerReducer,
    banner: bannerReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
