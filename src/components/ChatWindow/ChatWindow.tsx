import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import MessageWindow from "./MessageWindow";

interface Message {
  id: string;
  text: string;
  thinkMode: boolean;
  timestamp: Date;
}

const ChatWindow = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // Scroll-u aşağı aparan funksiya
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Yeni mesaj əlavə olunanda scroll et
  useEffect(() => {
    // Yalnız istifadəçi scroll etmirsə, avtomatik scroll et
    if (!isUserScrolling) {
      scrollToBottom();
    }
  }, [messages, isUserScrolling]);

  // Mesaj göndərmə handler-i
  const handleSendMessage = (messageText: string, thinkMode: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      thinkMode: thinkMode,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Yeni mesaj göndəriləndə həmişə scroll et və user scrolling-i sıfırla
    setIsUserScrolling(false);
    setTimeout(() => scrollToBottom("smooth"), 100);
  };

  // İstifadəçinin manual scroll etdiyini izləmək (optional - daha təkmil variant)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 10;

    setIsUserScrolling(!isAtBottom);
  };

  return (
    <div className="w-full flex justify-center overflow-x-hidden">
      <div className="flex flex-col gap-2 w-full max-w-[740px] min-w-0 px-4 sm:px-0">
        {/* Mesajlar bölməsi */}
        <div className="flex flex-col gap-2" onScroll={handleScroll}>
          <MessageWindow />
          {/* Bu invisible div scroll reference point-dir */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bölməsi */}
        <div className="flex justify-center items-center w-full sticky bottom-0 bg-main-color pb-2 rounded-t-3xl">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
