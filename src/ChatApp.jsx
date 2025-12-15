import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import useChat from "./hooks/useChat";


export default function ChatApp() {
    const [state, dispatch] = useChat();

    return (
        <div className="h-screen flex flex-col max-w-md mx-auto border-x bg-white">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto">
                <ChatMessages
                    messages={state.messages}
                    botTyping={state.botTyping}
                />
            </div>
            <ChatInput dispatch={dispatch} />
        </div>
    );
}