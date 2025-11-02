import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    chatSlice,
  },
});

export default store;
