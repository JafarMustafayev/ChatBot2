import ChatWindow from "../components/ChatWindow/ChatWindow";
import { useState, useEffect } from "react";

import { IoMdMore } from "react-icons/io";
import { TfiExport } from "react-icons/tfi";
import { BsArchive, BsPencil, BsTrash3 } from "react-icons/bs";

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
    <>
      {/* Sağ tərəf */}
      <div className="flex-1 flex flex-col relative min-w-0 overflow-hidden">
        <div className=" top-0 right-0  p-4 z-10  gap-2 flex xl:absolute justify-end">
          <button className="mr-2 p-2 bg-transparent hover:bg-button-hover gap-1.5 text-white rounded-3xl flex items-center">
            <TfiExport size={14} />
            <span className="text-sm hidden sm:inline">Export</span>
          </button>

          {/* Menu açan düymə */}
          <div className="relative hover:bg-button-hover rounded-xl">
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
              <div className="absolute right-0 top-8 bg-action-menu-bg border rounded-md shadow-lg w-40 z-10">
                <div className="flex flex-col m-1 text-amber-50 text-sm justify-center items-center">
                  <div className="px-3 py-2 border-b mb-1">
                    {activeChat.name}
                  </div>
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

        {/* ChatWindow */}
        <div className="flex justify-center scrollbar-hide h-screen overflow-hidden">
          <ChatWindow />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
