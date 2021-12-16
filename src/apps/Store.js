import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../stores/Counter";

export default configureStore({
  reducer: {
    // counter: counterReducer,
  },
});
