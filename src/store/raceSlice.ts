import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RaceStatus {
  id: string;
  velocity: number;
  distance: number;
  status: 'idle' | 'started' | 'driving' | 'stopped' | 'broken';
}

interface RaceState {
  races: Record<string, RaceStatus>;
}

const initialState: RaceState = {
  races: {},
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    startRace(state, action: PayloadAction<{ id: string; velocity: number; distance: number }>) {
      state.races[action.payload.id] = {
        id: action.payload.id,
        velocity: action.payload.velocity,
        distance: action.payload.distance,
        status: 'started',
      };
    },
    stopRace(state, action: PayloadAction<string>) {
      if (state.races[action.payload]) {
        state.races[action.payload].status = 'stopped';
      }
    },
    driveRace(state, action: PayloadAction<string>) {
      if (state.races[action.payload]) {
        state.races[action.payload].status = 'driving';
      }
    },
    breakRace(state, action: PayloadAction<string>) {
      if (state.races[action.payload]) {
        state.races[action.payload].status = 'broken';
      }
    },
    resetRaces(state) {
      state.races = {};
    },
  },
});

export const { startRace, stopRace, driveRace, breakRace, resetRaces } = raceSlice.actions;
export default raceSlice.reducer;
