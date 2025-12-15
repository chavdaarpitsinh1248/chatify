import { useReducer } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { chatReducer, initialState } from "./chatReducer";


export default function ChatApp() {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <div className="h-screen flex flex-col max-w-md mx-auto border-x bg-white">
            <ChatHeader />
            <ChatMessages
                messages={state.messages}
                botTyping={state.botTyping}
            />
            <ChatInput dispatch={dispatch} />
        </div>
    );
}