import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../stores/counter.js";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
