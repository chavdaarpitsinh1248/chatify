import { useEffect, useState } from "react";
import socket from "./socket";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import useChat from "./hooks/useChat";
import JoinChat from "./components/JoinChat";


export default function ChatApp() {
    const { state, dispatch } = useChat();
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("users", setUsers);

        return () => {
            socket.off();
        };
    }, []);

    const joinChat = (name) => {
        setUsername(name);
        socket.emit("join", name);
    };

    if (!username) return <JoinChat onJoin={joinChat} />;

    return (
        <div className="h-screen flex flex-col max-w-md mx-auto border-x bg-white">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto">
                <ChatMessages
                    messages={state.messages}
                />
            </div>
            <ChatInput socket={socket} username={username} />
        </div>
    );
}