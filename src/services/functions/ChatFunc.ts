import { addChatList, reload } from "../../stores/chatSlice";
import { ChatService } from "../api";
import type ChatType from "../../interfaces/ChatType";
import type { Dispatch, UnknownAction } from "redux";

// sayt ilk acilanda chat list yuklenmesi ucun

export const fetchChats = async (
  setError: any,
  setLoading: any,
  dispatch: Dispatch<UnknownAction>,
  page: number = 0,
  take: number = 25
) => {
  try {
    setLoading(true);
    const response = await ChatService.getChats<ChatType[]>(page, take, false);
    if (response.data) {
      dispatch(addChatList(response.data));
    } else {
      setError(response.message || "Failed to load chats");
    }
  } catch (err: any) {
    console.error("Chat fetch error:", err);
    setError(err.message || "Unexpected error");
  } finally {
    setLoading(false);
  }
};

export const reloadChats = async (
  setError: any,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    const response = await ChatService.getChats<ChatType[]>(0, 30, false);
    if (response.data) {
      dispatch(reload(response.data));
    } else {
      setError(response.message || "Failed to load chats");
    }
  } catch (err: any) {
    console.error("Chat fetch error:", err);
    setError(err.message || "Unexpected error");
  }
};

//chat rename ucun
export const renameChat = async (id: string, title: string = "testRename") => {
  try {
    const response = await ChatService.renameChat<ChatType[]>(id, title);

    if (response.isSuccess) {
      return response.isSuccess;
    }
  } catch (err: any) {
    console.error(" fetch error:", err);
    alert(err.message || "Unexpected error");
  }
};

export const acrhivedChat = async (id: string) => {
  try {
    const response = await ChatService.acrhivedChat<ChatType[]>(id);

    if (response.isSuccess) {
      return response.isSuccess;
    }
  } catch (err: any) {
    console.error(" fetch error:", err);
    alert(err.message || "Unexpected error");
  }
};

export const unarchivedChat = async (id: string) => {
  try {
    const response = await ChatService.acrhivedChat<ChatType[]>(id);

    if (response.isSuccess) {
      return response.isSuccess;
    }
  } catch (err: any) {
    console.error(" fetch error:", err);
    alert(err.message || "Unexpected error");
  }
};

export const deleteChat = async (id: string) => {
  try {
    const response = await ChatService.deleteChat<ChatType[]>(id);

    if (response.isSuccess) {
      return response.isSuccess;
    }
  } catch (err: any) {
    console.error(" fetch error:", err);
    alert(err.message || "Unexpected error");
  }
};
