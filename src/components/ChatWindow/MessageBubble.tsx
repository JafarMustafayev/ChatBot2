import React from "react";

interface MessageBubbleProps {
  role: string;
  text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={` p-3  text-white rounded-2xl text-sm ${
          isUser
            ? "bg-blue-500 max-w-[70%] rounded-br-none"
            : "  rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
