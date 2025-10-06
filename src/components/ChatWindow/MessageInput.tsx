import { useRef, useEffect, useState } from "react";
import { IoSend, IoAttach } from "react-icons/io5";
import { FaPlus, FaCheck } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";

const MessageInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [message, setMessage] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [thinkMode, setThinkMode] = useState(false);

  // Textarea hündürlüyünü mesajın hündürlüyünə uyğunlaşdırmaq üçün
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "24px"; // reset hündürlük
      textarea.style.height = Math.min(textarea.scrollHeight, 360) + "px";
      setMessage(textarea.value);
    }
  };

  // Ekranda hər klikdə menyunu bağlamaq üçün
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // menyunu açıb-bağlamaq üçün
  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  // mesajı göndərmək və input təmizləmək üçün
  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Göndərildi:", message);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "40px"; // hündürlüyü sıfırla
    }
  };

  // Enter basanda mesajı göndərmək üçün
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // yeni sətir yaratma
      handleSend();
    }
  };

  return (
    <div className="p-2 w-full max-w-[740px] bg-input-bg rounded-3xl flex">
      <div className="flex items-end-safe w-full gap-2">
        {/* Plus Button */}
        <button
          className="text-white p-2 mb-1 rounded-full hover:bg-action-menu-hover-bg self-end relative flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
        >
          <FaPlus />
        </button>

        {/* Action Menu */}
        {openMenu && (
          <div className="absolute mb-13 bg-action-menu-bg w-3xs rounded-md shadow-lg z-50">
            <div className="flex flex-col m-1 text-amber-50 text-sm justify-center items-center">
              <div
                className={`w-full border-b-white border-2 border-transparent p-2 ${
                  thinkMode ? "cursor-not-allowed" : ""
                }`}
              >
                <button
                  className={`w-full text-left p-2 rounded-md flex items-center ${
                    thinkMode
                      ? "text-gray-500 cursor-not-allowed"
                      : "hover:bg-action-menu-hover-bg"
                  }`}
                  disabled={thinkMode}
                  onClick={() => {
                    const fileInput = document.getElementById("fileInput");
                    fileInput?.click();
                    setOpenMenu(false);
                  }}
                >
                  <IoAttach className="mr-2" size={20} />
                  Upload File
                </button>
              </div>

              <div className="w-full p-2 mb-1">
                <button
                  className={`w-full text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center ${
                    thinkMode ? "text-blue-600" : ""
                  }`}
                  onClick={() => {
                    setThinkMode(true);
                    setOpenMenu(false);
                  }}
                >
                  <FaRegLightbulb className="inline mr-2" size={20} />
                  Thinking
                  {thinkMode && <FaCheck className="ml-auto" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thinking Mode Toggle Button - Plus düyməsinin yanında */}
        {thinkMode && (
          <button
            onClick={() => setThinkMode(false)}
            className="text-white p-2 rounded-full self-end transition-colors bg-input-send-button hover:bg-opacity-80 mb-1 flex-shrink-0"
            title="Turn off thinking mode"
          >
            <FaRegLightbulb size={20} />
          </button>
        )}

        {/* Textarea - thinking mode aktiv olduqda genişlənir və yuxarı qalxır */}
        <div
          className={`flex-1 min-w-0 transition-all duration-200 ${
            !thinkMode ? "" : "mb-[50px]"
          }`}
        >
          <textarea
            ref={textareaRef}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={message}
            rows={1}
            className="bg-input-bg resize-none outline-none border-none text-white placeholder:text-gray-400 w-full max-h-[360px] overflow-y-auto p-2 leading-6 align-text-top z-20"
            placeholder="Type your message here..."
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`text-white p-2 rounded-full items-self-end transition-colors flex-shrink-0 ${
            message.trim()
              ? "bg-input-send-button"
              : "bg-input-send-button-disable cursor-not-allowed opacity-80"
          }`}
        >
          <IoSend size={20} />
        </button>
      </div>
      <input type="file" className="hidden" id="fileInput" />
    </div>
  );
};

export default MessageInput;
