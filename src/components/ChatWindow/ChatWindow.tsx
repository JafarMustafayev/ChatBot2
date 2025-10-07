import MessageInput from "./MessageInput";
import MessageWindow from "./MessageWindow";

const ChatWindow = () => {
  return (
    <div className="w-full flex justify-center overflow-x-hidden">
      {/* Chat mesajları buraya gələcək */}
      <div className="flex flex-col gap-2 py-3.5 w-full max-w-[740px] min-w-0 px-4 sm:px-0">
        <div className="flex flex-col gap-2">
          <MessageWindow />
        </div>
        <div className="flex justify-center items-center w-full sticky bottom-0 bg-main-color pb-2 rounded-t-3xl">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
