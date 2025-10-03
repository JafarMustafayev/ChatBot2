import { useState, useEffect } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { FiSidebar } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import ChatList from "./ChatList";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [sidebarMenu, setSidebarMenu] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setSidebarMenu(open);
      }, 150);
    } else {
      setSidebarMenu(open);
    }
  }, [open]);

  return (
    <div className="flex h-screen">
      <div
        className={`
          ${open ? "w-64" : "w-12"} 
          bg-sidebar text-white transition-all duration-300 
          flex flex-col
        `}
      >
        {/* Toggle Button */}
        <div className="m-1 shrink-0">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl hover:bg-gray-600 w-9"
          >
            <FiSidebar size={20} />
          </button>
        </div>

        {/* Main Scrollable Area */}
        <div className="flex-1 flex flex-col mx-1 mt-4 overflow-y-auto scrollbar-hide">
          <nav className="flex flex-col gap-1">
            <a
              href="#"
              className={`p-3 hover:bg-gray-700 rounded-xl gap-1.5 ${
                sidebarMenu ? "flex items-center" : "justify-center"
              }`}
            >
              <HiPencilSquare size={20} />
              {sidebarMenu && <span className="text-sm">New</span>}
            </a>
            <a
              href="#"
              className={`p-3 hover:bg-gray-700 rounded-xl gap-1.5 ${
                sidebarMenu ? "flex items-center" : "justify-center"
              }`}
            >
              <FaSearch size={20} />
              {sidebarMenu && <span className="text-sm">Search</span>}
            </a>
            <a
              href="#"
              className={`p-3 hover:bg-gray-700 rounded-xl gap-1.5 ${
                sidebarMenu ? "flex items-center" : "justify-center"
              }`}
            >
              <BsImages size={20} />
              {sidebarMenu && <span className="text-sm">Library</span>}
            </a>
          </nav>

          {/* Chat list scrollable olacaq */}

          <div
            className={`mt-4 flex-1 overflow-y-auto scrollbar-hide ${
              sidebarMenu ? "block" : "hidden"
            }`}
          >
            <ChatList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
