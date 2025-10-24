import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IoMdMore } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { BsArchive } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { TfiExport } from "react-icons/tfi";

export interface ChatType {
  id: string;
  Title: string;
  ModelId: string;
  CreatedAt: number;
  UpdatedAt: number;
  IsArchived: boolean;
  NamedBy: boolean;
}

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

  const chats: ChatType[] = [
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
  ];
  return (
    <div className="w-full flex-col">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-sm font-normal">Chats</h2>
        <hr className=" text-gray-700" />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {chats
          .sort(function (a, b) {
            return b.UpdatedAt - a.UpdatedAt;
          })
          .map((chat) => (
            <Link
              to={`/chat/${chat.id}`}
              key={chat.id}
              className="p-1 group rounded-xl hover:bg-sidebar-hover-chat cursor-pointer justify-between flex items-center relative"
            >
              <div>
                <p className="text-sm font-medium">
                  {chat.Title.length > 30
                    ? chat.Title.slice(0, 30) + "..."
                    : chat.Title}
                </p>
              </div>

              <div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()} // menyuya klikləyəndə bağlanmasın
              >
                <button onClick={() => toggleMenu(chat.id)}>
                  <IoMdMore size={20} />
                </button>

                {openMenu === chat.id && (
                  <div className="absolute right-2 top-10 bg-action-menu-bg  rounded-md shadow-lg w-32 z-10">
                    <div className="flex flex-col m-1 text-amber-50 text-sm  justify-center items-center">
                      <button className="w-full p-2 text-left ro hover:bg-action-menu-hover-bg rounded-md flex items-center">
                        <TfiExport className="inline mr-2" />
                        Export
                      </button>

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
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChatList;
