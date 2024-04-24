import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const peopleSlice = createSlice({
  name: "people", // Corrected slice name from "movie" to "people"
  initialState,
  reducers: {
    // Define reducers directly within the "reducers" object
    peopleDetails: (state, action) => {
      state.info = action.payload;
    },
    removePeople: (state) => {
      state.info = null;
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const { peopleDetails, removePeople } = peopleSlice.actions;

export default peopleSlice.reducer;
