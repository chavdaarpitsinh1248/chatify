import { useEffect, useState } from "react";
import { getChannelMessages } from "../api/messageApi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatPanel({ server, channel, socket, token, user }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!server || !channel) return;

        setMessages([]); // reset when switching channels

        getChannelMessages(server._id, channel._id, token)
            .then((res) => setMessages(res.data))
            .catch(() => console.error("Failed to fetch messages"));

        socket.emit("joinChannel", {
            serverId: server._id,
            channelId: channel._id,
        });

        const handleNewMessage = (msg) => setMessages((prev) => [...prev, msg]);
        socket.on("newChannelMessage", handleNewMessage);

        return () => socket.off("newChannelMessage", handleNewMessage);
    }, [server?._id, channel?._id, socket, token]);

    if (!server || !channel) return <div className="p-4">Select a channel</div>;

    return (
        <div className="flex-1 flex flex-col h-full">
            <ChatMessages messages={messages} currentUserId={user.id} />
            <ChatInput
                socket={socket}
                user={user}
                serverId={server._id}
                channelId={channel._id}
                channelName={channel.name}
            />
        </div>
    );
}
