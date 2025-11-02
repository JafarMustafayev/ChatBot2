import { del, get, patch } from "./request";
import type { ResponseType } from "../../interfaces/Response";

export const getChats = async <T>(
  page: number = 0,
  take: number = 25,
  is_archived: boolean = false
): Promise<ResponseType<T>> => {
  const response = await get<T>(
    `/conversations?page=${page}&take=${take}&is_archived=${is_archived}`
  );
  if (!response.isSuccess) throw new Error("Failed to fetch chats");

  return response;
};

export const getChatDetails = async <T>(
  id: string
): Promise<ResponseType<T>> => {
  const response = await get<T>(`/conversations/${id}`);
  if (!response.isSuccess) throw new Error("Failed to fetch chats");

  return response;
};

export const renameChat = async <T>(
  id: string,
  title: string
): Promise<ResponseType<T>> => {
  const response = await patch<T>(`/conversations/${id}`, { title: title });
  if (!response.isSuccess) throw new Error("Failed to rename chat");

  return response;
};

export const acrhivedChat = async <T>(id: string): Promise<ResponseType<T>> => {
  const response = await patch<T>(`/conversations/${id}/archive`, {
    is_archived: true,
  });
  if (!response.isSuccess) throw new Error("Failed to archived chat");

  return response;
};

export const unarchivedChat = async <T>(
  id: string
): Promise<ResponseType<T>> => {
  const response = await patch<T>(`/conversations/${id}/archive`, {
    is_archived: false,
  });
  if (!response.isSuccess) throw new Error("Failed to unarchived chat");

  return response;
};

export const deleteChat = async <T>(id: string): Promise<ResponseType<T>> => {
  const response = await del<T>(`/conversations/${id}`);
  if (!response.isSuccess) throw new Error("Failed to delete chat");

  return response;
};
