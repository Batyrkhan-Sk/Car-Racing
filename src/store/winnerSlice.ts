import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Winner {
  id: string;
  wins: number;
  time: number;
}

interface WinnerState {
  winners: Winner[];
}

const initialState: WinnerState = {
  winners: [],
};

const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinners(state, action: PayloadAction<Winner[]>) {
      state.winners = action.payload;
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
    deleteWinner(state, action: PayloadAction<string>) {
      state.winners = state.winners.filter((w) => w.id !== action.payload);
    },
  },
});

export const { setWinners, addWinner, updateWinner, deleteWinner } = winnerSlice.actions;
export default winnerSlice.reducer;
