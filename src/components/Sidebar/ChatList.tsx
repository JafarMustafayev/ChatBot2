import { useState, useEffect } from "react";

import { IoMdMore } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { BsArchive } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { TfiExport } from "react-icons/tfi";

interface Chat {
  id: number;
  name: string;
  lastMsg: string;
}

const ChatList = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
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

  const chats: Chat[] = [
    { id: 1, name: "Elvin Məmmədov", lastMsg: "Sabah görüşək" },
    { id: 2, name: "Aysel Əliyeva", lastMsg: "Tamamdır, yazaram" },
    { id: 3, name: "Rauf Qasımov", lastMsg: "Sən hardasan?" },
    { id: 4, name: "Nigar Həsənova", lastMsg: "Oldu, sağ ol" },
    { id: 5, name: "Kamran Rzayev", lastMsg: "Bir azdan zəng edərəm" },
    { id: 6, name: "Lalə Hüseynova", lastMsg: "Əla, xəbər edərsən" },
    { id: 7, name: "Fuad Məlikov", lastMsg: "Gəlməyəcəksənsə, deyin" },
    { id: 8, name: "Zəhra Quliyeva", lastMsg: "Baxaram, deyərəm" },
    { id: 9, name: "Orxan İsmayılov", lastMsg: "Çatanda yaz" },
    { id: 10, name: "Aytac Məmmədli", lastMsg: "Hə, yadımda saxlayaram" },
    { id: 11, name: "Eldar Hümbətov", lastMsg: "Mən hazıram" },
    { id: 12, name: "Günay Qasımova", lastMsg: "Bir az gecikirəm" },
    { id: 13, name: "Samirə Əliyeva", lastMsg: "Daha sonra danışarıq" },
    { id: 14, name: "Murad Kərimov", lastMsg: "İndi gəlirəm" },
    { id: 15, name: "Nərmin Rəhimli", lastMsg: "Səni gözləyirəm" },
    { id: 16, name: "Cavid Orucov", lastMsg: "Yaxşı yol!" },
    { id: 17, name: "Şəbnəm Məmmədova", lastMsg: "Çox sağ ol!" },
    { id: 18, name: "Tunar Quliyev", lastMsg: "Problem deyil" },
    { id: 19, name: "Vüsalə Abbasova", lastMsg: "Sabah danışarıq" },
    { id: 20, name: "Emin Hüseynov", lastMsg: "Görüşənədək" },
    { id: 21, name: "Aylin Məmmədova", lastMsg: "Yaniram" },
    { id: 22, name: "Rəşad Əliyev", lastMsg: "Mən də sağ ol" },
    { id: 23, name: "Səbinə Quliyeva", lastMsg: "Yaxşı gecələr" },
  ];
  return (
    <div className="w-full flex-col">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-sm font-normal">Chats</h2>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-2 group rounded-xl hover:bg-sidebar-hover-chat cursor-pointer justify-between flex items-center relative"
          >
            <div>
              <p className="text-sm font-medium">{chat.name}</p>
              <p className="text-xs text-gray-500">{chat.lastMsg}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
