import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";

export default function ChatPanel({ server, username, socket }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleServerMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("serverMessage", handleServerMessage);

        return () => {
            socket.off("serverMessage", handleServerMessage);
        };
    }, [socket]);

    return (
        <div className="flex-1 flex flex-col border">
            <ChatHeader users={[]} serverName={server.name} />
            <ChatMessages messages={messages} />
            <ChatInput
                socket={socket}
                username={username}
                serverId={server._id}
            />
        </div>
    );
}
