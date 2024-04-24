import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    TvDetails: (state, action) => {
      state.info = action.payload;
    },
    removeTvDetails: (state) => {
      state.info = null;
    },
  },
});

export const { TvDetails, removeTvDetails } = tvSlice.actions;

export default tvSlice.reducer;
