import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    // Correctly define the moviedetails reducer
    moviedetails: (state, action) => {
      state.info = action.payload;
    },
    // Correctly define the removedetails reducer
    removedetails: (state) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { moviedetails, removedetails } = movieSlice.actions;

export default movieSlice.reducer;
