import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

export default function ChatApp() {
    return (
        <div className="h-screen flex flex-col max-w-md mx-auto border-x bg-white">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </div>
    );
}