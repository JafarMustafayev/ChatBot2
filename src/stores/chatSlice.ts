// createSlice ile Redux slice'ını oluşturuyoruz
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type ChatType from "../interfaces/ChatType";

// Initial state
const initialState: { chatList: ChatType[] } = {
  chatList: [],
};

// Slice
const chats = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatType>) => {
      state.chatList.push(action.payload);
    },
    addChatList: (state, action: PayloadAction<ChatType[]>) => {
      action.payload.forEach((chat) => {
        state.chatList.push(chat);
      });
    },
    reload: (state, action: PayloadAction<ChatType[]>) => {
      state.chatList = [];
      action.payload.forEach((chat) => {
        state.chatList.push(chat);
      });
    },
  },
});

export const { addChat, addChatList, reload } = chats.actions;

export default chats.reducer;
