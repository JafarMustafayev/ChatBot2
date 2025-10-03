import Sidebar from "../components/Sidebar/Sidebar";
import ChatWindow from "../components/ChatWindow/ChatWindow";

const ChatPage = () => {
  return (
    <div className="flex h-screen  bg-main-color">
      <div>
        <Sidebar />
      </div>

      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
