import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habit-slice";

const store = configureStore({
  reducer: {
    habits: habitReducer, // Make sure this matches the slice name
  },
});

export default store;
