import { useEffect, useState } from "react";
import { getChannelMessages } from "../api/messageApi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatPanel({ server, channel, socket, token, user }) {
    const [messages, setMessages] = useState([]);

    // Join / leave channel socket room
    useEffect(() => {
        if (!channel) return;

        socket.emit("joinChannel", {
            channelId: channel._id,
        });

        return () => {
            socket.emit("leaveChannel", {
                channelId: channel._id,
            });
        };
    }, [channel, socket]);

    // Load message history + realtime updates
    useEffect(() => {
        if (!channel) return;

        setMessages([]); // reset when switching channel

        getChannelMessages(server._id, channel._id, token)
            .then(res => setMessages(res.data))
            .catch(err => console.error(err));

        const handleNewMessage = (msg) => {
            if (msg.channelId === channel._id) {
                setMessages(prev => [...prev, msg]);
            }
        };

        socket.on("newChannelMessage", handleNewMessage);

        return () => {
            socket.off("newChannelMessage", handleNewMessage);
        };
    }, [channel, server, token, socket]);

    if (!server || !channel) {
        return <div className="p-4">Select a channel</div>;
    }

    return (
        <div className="flex-1 flex flex-col h-full">
            <ChatMessages
                messages={messages}
                currentUserId={user.id}
            />

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
