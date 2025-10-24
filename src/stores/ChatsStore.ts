// createSlice ile Redux slice'ını oluşturuyoruz
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type ChatType from "../interfaces/ChatListInterface";

// Initial state
const initialState: { chatList: ChatType[] } = {
  chatList: [
    {
      id: "1",
      Title: "Human Data Supervisor",
      ModelId: "95cf1a7ca4816eeabab31fcb",
      CreatedAt: 1760391080,
      UpdatedAt: 1760391020,
      IsArchived: false,
      NamedBy: false,
    },
    {
      id: "2",
      Title: "Chief Accounts Specialist  and Budget Officer to the Mayor",
      ModelId: "ed1227e77dd0f3fe1bd98a83",
      CreatedAt: 1760391020,
      UpdatedAt: 1760391080,
      IsArchived: false,
      NamedBy: false,
    },
  ],
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
  },
});

export const { addChat } = chats.actions;

export default chats.reducer;
