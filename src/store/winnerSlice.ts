import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Winner } from '../types/winnerTypes';

interface WinnerState {
  winners: Winner[];
  totalCount: number;
  currentPage: number;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  currentWinner: Winner | null;
  finishers: { id: number; time: number }[];
}

const initialState: WinnerState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortBy: 'id',
  sortOrder: 'ASC',
  currentWinner: null,
  finishers: [],
};

const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinners(state, action: PayloadAction<Winner[]>) {
      state.winners = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSort(
      state,
      action: PayloadAction<{ sortBy: 'id' | 'wins' | 'time'; sortOrder: 'ASC' | 'DESC' }>,
    ) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    addWinner(state, action: PayloadAction<Winner>) {
      state.winners.push(action.payload);
    },
    updateWinner(state, action: PayloadAction<Winner>) {
      const index = state.winners.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.winners[index] = action.payload;
      }
    },
    deleteWinner(state, action: PayloadAction<number>) {
      state.winners = state.winners.filter((w) => w.id !== action.payload);
    },
    setCurrentWinner(state, action: PayloadAction<Winner | null>) {
      state.currentWinner = action.payload;
    },
    addFinisher(state, action: PayloadAction<{ id: number; time: number }>) {
      state.finishers.push(action.payload);
      if (state.finishers.length === 1) {
        state.currentWinner = { id: action.payload.id, time: action.payload.time, wins: 1 };
      }
    },
    resetFinishers(state) {
      state.finishers = [];
      state.currentWinner = null;
    },
  },
});

export const {
  setWinners,
  setTotalCount,
  setCurrentPage,
  setSort,
  addWinner,
  updateWinner,
  deleteWinner,
  setCurrentWinner,
  addFinisher,
  resetFinishers,
} = winnerSlice.actions;

export default winnerSlice.reducer;
