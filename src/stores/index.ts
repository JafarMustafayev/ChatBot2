import { configureStore } from "@reduxjs/toolkit";
import ChatsStore from "./ChatsStore";

const store = configureStore({
  reducer: {
    ChatsStore,
  },
});

export default store;
