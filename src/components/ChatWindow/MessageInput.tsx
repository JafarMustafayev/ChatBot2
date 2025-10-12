import { useRef, useEffect, useState, useCallback } from "react";
import { IoSend, IoAttach } from "react-icons/io5";
import { FaPlus, FaCheck } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";

// Constants
const TEXTAREA_CONFIG = {
  MIN_HEIGHT: 24,
  MAX_HEIGHT: 360,
  DEFAULT_HEIGHT: 40,
} as const;

const MessageInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [thinkMode, setThinkMode] = useState(false);
  const [wideInputMode, setWideInputMode] = useState(false);

  const isMobileDevice = useRef(
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  ).current;

  // Textarea hündürlüyünü dinamik olaraq tənzimləmək
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = `${TEXTAREA_CONFIG.MIN_HEIGHT}px`;
    const newHeight = Math.min(
      textarea.scrollHeight,
      TEXTAREA_CONFIG.MAX_HEIGHT
    );
    textarea.style.height = `${newHeight}px`;
  }, []);

  // Input dəyişikliklərini idarə etmək
  const handleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      setMessage(e.currentTarget.value);
      adjustTextareaHeight();
    },
    [adjustTextareaHeight]
  );

  // Textarea enini və hündürlüyünü yoxlayıb wide mode-u avtomatik idarə etmək
  useEffect(() => {
    const span = spanRef.current;
    const container = containerRef.current;
    const textarea = textareaRef.current;

    if (!span || !container || !textarea) return;

    // span-ın real enini ölçürük
    const spanWidth = span.getBoundingClientRect().width;

    // Textarea-nın hündürlüyünü yoxlayırıq (çox sətirli olub-olmadığını anlamaq üçün)
    const textareaHeight = textarea.scrollHeight;
    const isMutiline = textareaHeight > TEXTAREA_CONFIG.DEFAULT_HEIGHT;

    // Parent konteyner enini ölçürük (düymələr çıxılmaqla)
    // İki düymə + gap-lər üçün təxminən 100px çıxırıq
    const parentElement = container.parentElement?.parentElement;
    const availableWidth = parentElement?.offsetWidth || 0;
    const maxWidthForNarrowMode = availableWidth - 120; // düymələr üçün yer

    // Əgər mətn eni maksimum eni keçirsə, çox sətirli olarsa və ya thinkMode aktivdirsə
    if (spanWidth > maxWidthForNarrowMode || isMutiline || thinkMode) {
      setWideInputMode(true);
    }
    // Əgər mesaj tamamilə silinib və thinkMode qapalıdırsa
    else if (message.trim().length === 0 && !thinkMode) {
      setWideInputMode(false);
    }
  }, [message, thinkMode]);

  // Menyu xaricində kliklə menyunu bağlamaq
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenu]);

  // Menyunu toggle etmək
  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu((prev) => !prev);
  }, []);

  // Think mode-u toggle etmək
  const toggleThinkMode = useCallback(() => {
    setThinkMode((prev) => !prev);
    setOpenMenu(false);
  }, []);

  // Fayl yükləmək
  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click();
    setOpenMenu(false);
  }, []);

  // Mesajı göndərmək
  const handleSend = useCallback(() => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Burada mesajı göndərən funksiya çağırılacaq
    console.log("Göndərildi:", trimmedMessage);

    // Input-u təmizlə
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = `${TEXTAREA_CONFIG.DEFAULT_HEIGHT}px`;
    }
  }, [message]);

  // Enter ilə göndərmə
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // Mesajın boş olub olmadığını yoxlamaq
  const isMessageEmpty = !message.trim();

  return (
    <div
      className={`p-2 w-full max-w-[740px] bg-input-bg rounded-3xl flex transition-all duration-200 `}
    >
      {/* Textarea və düymələr konteyneri */}
      <div className=" flex flex-1 flex-col relative">
        {/* Textarea */}
        <div
          className={`items-end gap-2 w-full ${
            !wideInputMode ? "left-8 absolute" : ""
          }`}
        >
          <div
            ref={containerRef}
            className={`flex transition-all duration-200 rounded-lg relative`}
          >
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              value={message}
              rows={1}
              className="resize-none outline-none border-none bg-transparent text-white placeholder:text-gray-400 max-h-[380px] overflow-y-auto p-2 leading-6 w-full"
              placeholder="Mesajınızı bura yazın..."
              aria-label="Mesaj sahəsi"
            />
            {/* görünməyən span - eni hesablamaq üçün */}
            <span
              ref={spanRef}
              className="invisible absolute whitespace-pre text-base p-2 leading-6 pointer-events-none"
              style={{
                left: 0,
                top: 0,
                font: "inherit",
              }}
            >
              {message || " "}
            </span>
          </div>
        </div>

        {/* Alt düymələr və menyu */}
        <div>
          <div className="flex items-end justify-between w-full gap-2">
            {/* Action Menu Button */}
            <div className="flex  ">
              <button
                type="button"
                className="text-white p-2 mb-1 rounded-full hover:bg-action-menu-hover-bg self-end relative flex-shrink-0"
                onClick={toggleMenu}
                aria-label="Əlavə seçimlər"
                aria-expanded={openMenu}
              >
                <FaPlus />
              </button>

              {/* Action Menu */}
              {openMenu && (
                <div
                  ref={menuRef}
                  className=" absolute mb-13 bottom-0  bg-action-menu-bg w-3xs rounded-md shadow-lg z-50"
                  role="menu"
                >
                  <div className="flex flex-col m-1 text-amber-50 text-sm">
                    {/* File Upload */}
                    <div
                      className={`w-full border-b border-white/20 p-2 ${
                        thinkMode ? "opacity-50" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-full text-left p-2 rounded-md flex items-center ${
                          thinkMode
                            ? "text-gray-500 cursor-not-allowed"
                            : "hover:bg-action-menu-hover-bg"
                        }`}
                        disabled={thinkMode}
                        onClick={handleFileUpload}
                        role="menuitem"
                      >
                        <IoAttach className="mr-2" size={20} />
                        Fayl Yüklə
                      </button>
                    </div>

                    {/* Thinking Mode */}
                    <div className="w-full p-2 mb-1">
                      <button
                        type="button"
                        className={`w-full text-left p-2 hover:bg-action-menu-hover-bg rounded-md flex items-center ${
                          thinkMode ? "text-blue-600" : ""
                        }`}
                        onClick={toggleThinkMode}
                        role="menuitem"
                      >
                        <FaRegLightbulb className="inline mr-2" size={20} />
                        Düşünmə Rejimi
                        {thinkMode && <FaCheck className="ml-auto" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Thinking Mode Active Button */}
              {thinkMode && (
                <button
                  type="button"
                  onClick={toggleThinkMode}
                  className="text-white p-2 rounded-full self-end transition-colors flex bg-input-send-button hover:bg-opacity-80 mb-1 flex-shrink-0"
                  title="Düşünmə rejimini söndür"
                  aria-label="Düşünmə rejimini söndür"
                >
                  <FaRegLightbulb size={20} />
                </button>
              )}
            </div>
            {/* Send Button */}
            <div>
              {/* Send Button */}
              <button
                type="button"
                onClick={handleSend}
                disabled={isMessageEmpty}
                className={`text-white p-2 rounded-full justify-end items-end self-end transition-colors flex-shrink-0 mb-1 ${
                  isMessageEmpty
                    ? "bg-input-send-button-disable cursor-not-allowed opacity-80"
                    : "bg-input-send-button hover:bg-opacity-90"
                }`}
                aria-label="Mesajı göndər"
              >
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
};

export default MessageInput;
