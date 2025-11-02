import { useState, useEffect, useRef, useCallback } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as ChatFunc from "../../services/functions/ChatFunc";

import type ChatType from "../../interfaces/ChatType";
import { IoMdMore } from "react-icons/io";
import { TfiExport } from "react-icons/tfi";
import { BsArchive, BsPencil, BsTrash3 } from "react-icons/bs";

const ChatList = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastChatRef = useRef<HTMLDivElement | null>(null);

  const chats: ChatType[] = useSelector(
    (state: any) => state.chatSlice.chatList
  );

  // ✅ İlk yüklənmə
  useEffect(() => {
    ChatFunc.fetchChats(setError, setLoading, dispatch, 0, 25);
  }, [dispatch]);

  // ✅ Növbəti səhifəni yüklə
  const loadMoreChats = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      // fetchChats funksiyasını append modunda çağır
      var newChats: any;

      newChats = await ChatFunc.fetchChats(
        setError,
        setLoadingMore,
        dispatch,
        nextPage,
        25
      );

      // Əgər gələn chat sayı 25-dən azdırsa, daha chat yoxdur
      if (!newChats || newChats.length < 25) {
        setHasMore(false);
      }

      setPage(nextPage);
    } catch (err) {
      setError("Chat yüklənərkən xəta baş verdi");
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, dispatch]);

  // ✅ Intersection Observer ilə lazy loading
  useEffect(() => {
    if (loadingMore) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        loadMoreChats();
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px", // 100px əvvəl yükləməyə başla
      threshold: 0.1,
    });

    if (lastChatRef.current) {
      observerRef.current.observe(lastChatRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreChats, loadingMore, hasMore, chats.length]);

  // ✅ Ekranda hər klikdə menyunu bağla
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const handleButtonClick = (callback?: () => void) => {
    if (callback) callback();
    setOpenMenu(null);
  };

  const archivedChat = (chat: ChatType) => {
    ChatFunc.acrhivedChat(chat.id);
    ChatFunc.reloadChats(setError, dispatch);

    setHasMore(true);
    setLoadingMore(false);
  };

  const deleteChat = (chat: ChatType) => {
    ChatFunc.deleteChat(chat.id);
    ChatFunc.reloadChats(setError, dispatch);
    setHasMore(true);
    setLoading(false);
  };

  const handleRenameClick = (chat: ChatType) => {
    setEditingChatId(chat.id);
    setNewTitle(chat.title);
    setOpenMenu(null);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50 || value.length < newTitle.length) {
      setNewTitle(value);
    }
  };

  const handleRenameSubmit = (
    e: KeyboardEvent<HTMLInputElement>,
    chatId: string
  ) => {
    if (e.key === "Enter" && newTitle.trim()) {
      ChatFunc.renameChat(chatId, newTitle);
      setEditingChatId(null);
      ChatFunc.reloadChats(setError, dispatch);
      setHasMore(true);
      setLoadingMore(false);
    } else if (e.key === "Escape") {
      setEditingChatId(null);
    }
  };

  if (loading)
    return <p className="p-4 text-sm text-gray-400">Loading chats...</p>;
  if (error) return <p className="p-4 text-sm text-red-500">{error}</p>;

  return (
    <div className="w-full flex-col">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-sm font-normal">Chats</h2>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {chats.map((chat, index) => (
          <div
            ref={index === chats.length - 1 ? lastChatRef : null}
            className={`justify-between flex items-center group  relative hover:bg-sidebar-hover-chat p-1 rounded-xl cursor-pointer ${
              editingChatId === chat.id ? "bg-sidebar-hover-chat" : ""
            }`}
            key={chat.id}
          >
            <div className="w-full">
              {editingChatId === chat.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  onKeyDown={(e) => handleRenameSubmit(e, chat.id)}
                  onBlur={() => setEditingChatId(null)}
                  autoFocus
                  onFocus={(e) => e.target.select()}
                  className="bg-transparent rounded-md text-sm font-medium px-1 outline-none w-full focus:border-gray-400"
                />
              ) : (
                <Link to={`/chat/${chat.id}`} className="w-full block">
                  <p className="text-sm font-medium ml-1">
                    {chat.title.length > 25
                      ? chat.title.slice(0, 25) + "..."
                      : chat.title}
                  </p>
                </Link>
              )}
            </div>

            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => toggleMenu(chat.id)}>
                <IoMdMore size={20} />
              </button>

              {openMenu === chat.id && (
                <div className="absolute right-2 bg-action-menu-bg rounded-md shadow-lg w-32 z-10">
                  <div className="flex flex-col m-1 text-amber-50 text-sm justify-center items-center">
                    <button
                      className="w-full p-2 text-left hover:bg-action-menu-hover-bg rounded-md flex items-center"
                      onClick={() =>
                        handleButtonClick(() => console.log("Export"))
                      }
                    >
                      <TfiExport className="inline mr-2" />
                      Export
                    </button>

                    <button
                      className="w-full p-2 text-left hover:bg-action-menu-hover-bg rounded-md flex items-center"
                      onClick={() =>
                        handleButtonClick(() => handleRenameClick(chat))
                      }
                    >
                      <BsPencil className="inline mr-2" />
                      Rename
                    </button>

                    <button
                      className="w-full text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center"
                      onClick={() =>
                        handleButtonClick(() => archivedChat(chat))
                      }
                    >
                      <BsArchive className="inline mr-2" />
                      Archive
                    </button>

                    <button
                      className="w-full text-red-400 text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center"
                      onClick={() => handleButtonClick(() => deleteChat(chat))}
                    >
                      <BsTrash3 className="inline mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indikator */}
        {loadingMore && (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-400">Daha çox chat yüklənir...</p>
          </div>
        )}

        {/* Daha chat olmadığını göstər */}
        {!hasMore && chats.length > 0 && (
          <div className="p-4 text-center">
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
