import Sidebar from "../components/Sidebar/Sidebar";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { useState, useEffect } from "react";

import { TfiExport } from "react-icons/tfi";
import { IoMdMore } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { BsArchive } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";

interface Chat {
  id: number;
  name: string;
}

const ChatPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeChatId, setActiveChatId] = useState<number | null>(1);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // test üçün sadə chat list
  const chats: Chat[] = [
    { id: 1, name: "Elvin Məmmədov" },
    { id: 2, name: "Aysel Əliyeva" },
    { id: 3, name: "Rauf Qasımov" },
  ];

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="flex h-screen bg-main-color relative">
      <div>
        <Sidebar />
      </div>

      {/* Sağ tərəf */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute top-0 right-0 flex p-4 z-10  items-center gap-2">
          <button className="mr-2 p-2 bg-transparent hover:bg-button-hover gap-1.5 text-white rounded-3xl flex items-center">
            <TfiExport size={14} />
            <span className="text-sm">Export</span>
          </button>

          {/* Menu açan düymə */}
          <div className="relative  hover:bg-button-hover rounded-xl ">
            <button
              className="p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // yoxsa dərhal bağlanar
                toggleMenu();
              }}
            >
              <IoMdMore size={20} />
            </button>

            {openMenu && activeChat && (
              <div className="absolute right-0 top-8  bg-action-menu-bg border rounded-md shadow-lg w-40 z-10 ">
                <div className="flex flex-col m-1 text-amber-50 text-sm  justify-center items-center">
                  <div className="px-3 py-2  border-b mb-1">
                    {activeChat.name}
                  </div>
                  <button className="w-full p-2 text-left ro hover:bg-action-menu-hover-bg rounded-md flex items-center">
                    <LuPencil className="inline mr-2" />
                    Rename
                  </button>
                  <button className="w-full text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center">
                    <BsArchive className="inline mr-2" />
                    Archive
                  </button>
                  <button className="w-full text-red-400 text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center">
                    <FaRegTrashCan className="inline mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ChatWindow */}
        <div className="flex items-end justify-center overflow-y-auto bg-main-color scrollbar-hide h-screen py-2">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
