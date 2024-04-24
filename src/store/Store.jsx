import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../store/reducers/movieSlice";
import peopleReducer from "../store/reducers/peopleSlice";
import tvReducer from "../store/reducers/tvSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    people: peopleReducer,
    tv: tvReducer,
  },
});

export default store;
