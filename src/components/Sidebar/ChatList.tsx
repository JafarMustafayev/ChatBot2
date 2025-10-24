import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import type ChatType from "../../interfaces/ChatListInterface";

import { IoMdMore } from "react-icons/io";
import { TfiExport } from "react-icons/tfi";
import { BsArchive, BsPencil, BsTrash3 } from "react-icons/bs";

const ChatList = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  // Ekranda hər klikdə menyunu bağlamaq üçün
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const chats: ChatType[] = useSelector(
    (state: any) => state.ChatsStore.chatList
  );

  console.log("Chats from Redux Store:", chats);
  return (
    <div className="w-full flex-col">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-sm font-normal">Chats</h2>
        <hr className=" text-gray-700" />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {chats.map((chat) => (
          <div
            className="justify-between flex items-center group relative hover:bg-sidebar-hover-chat p-1  rounded-xl  cursor-pointer"
            key={chat.id}
          >
            <Link to={`/chat/${chat.id}`} className="w-full">
              <div>
                <p className="text-sm font-medium">
                  {chat.Title.length > 30
                    ? chat.Title.slice(0, 30) + "..."
                    : chat.Title}
                </p>
              </div>
            </Link>

            <div
              className="opacity-0  group-hover:opacity-100 transition-opacity "
              onClick={(e) => e.stopPropagation()} // menyuya klikləyəndə bağlanmasın
            >
              <button onClick={() => toggleMenu(chat.id)}>
                <IoMdMore size={20} />
              </button>

              {openMenu === chat.id && (
                <div className="absolute right-2  bg-action-menu-bg  rounded-md shadow-lg w-32 z-10">
                  <div className="flex flex-col m-1 text-amber-50 text-sm  justify-center items-center">
                    <button className="w-full p-2 text-left ro hover:bg-action-menu-hover-bg rounded-md flex items-center">
                      <TfiExport className="inline mr-2" />
                      Export
                    </button>

                    <button className="w-full p-2 text-left ro hover:bg-action-menu-hover-bg rounded-md flex items-center">
                      <BsPencil className="inline mr-2" />
                      Rename
                    </button>

                    <button className="w-full text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center">
                      <BsArchive className="inline mr-2" />
                      Archive
                    </button>

                    <button className="w-full text-red-400 text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center">
                      <BsTrash3 className="inline mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
