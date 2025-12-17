import { useEffect, useState } from "react";
import { getChannelMessages } from "../api/messageApi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatPanel({
    server,
    channel,
    socket,
    token,
    user,
}) {
    const [messages, setMessages] = useState([]);

    // Load history
    useEffect(() => {
        if (!channel) return;

        getChannelMessages(server._id, channel._id, token)
            .then((res) => setMessages(res.data));

        socket.emit("joinChannel", {
            serverId: server._id,
            channelId: channel._id,
        });

        socket.on("newChannelMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("newChannelMessage");
    }, [channel]);

    return (
        <>
            <ChatMessages messages={messages} />
            <ChatInput
                socket={socket}
                serverId={server._id}
                channelId={channel._id}
                user={user}
            />
        </>
    );
}
