import MessageInput from "./MessageInput";
import MessageWindow from "./MessageWindow";

const ChatWindow = () => {
  return (
    <div className="w-full flex justify-center overflow-x-hidden">
      {/* Chat mesajları buraya gələcək */}
      <div className="flex flex-col gap-2 py-3.5 w-full max-w-[740px] min-w-0 justify-between h-screen px-4 sm:px-0">
        <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          <MessageWindow />
        </div>
        <div className="flex justify-center items-center w-full">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
