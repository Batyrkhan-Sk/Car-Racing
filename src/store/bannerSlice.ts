import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BannerState {
  winnerName: string | null;
  time: number | null;
  visible: boolean;
}

const initialState: BannerState = {
  winnerName: null,
  time: null,
  visible: false,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setWinnerBanner(state, action: PayloadAction<{ name: string; time: number }>) {
      state.winnerName = action.payload.name;
      state.time = action.payload.time;
      state.visible = true;
    },
    hideWinnerBanner(state) {
      state.winnerName = null;
      state.time = null;
      state.visible = false;
    },
  },
});

export const { setWinnerBanner, hideWinnerBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
