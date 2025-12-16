import { useEffect, useState } from "react";
import ChannelList from "./ChannelList";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatPanel({ server, socket, username }) {
    const [currentChannel, setCurrentChannel] = useState(server.channels[0]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!currentChannel) return;

        socket.emit("joinChannel", {
            serverId: server._id,
            channelId: currentChannel._id,
            username,
        });

        setMessages([]);

        socket.on("channelMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("channelMessage");
    }, [currentChannel]);

    return (
        <div className="flex flex-1">
            <ChannelList
                channels={server.channels}
                activeChannel={currentChannel}
                onSelect={setCurrentChannel}
            />

            <div className="flex-1 flex flex-col">
                <div className="border-b p-3 font-semibold">
                    #{currentChannel.name}
                </div>

                <ChatMessages messages={messages} />

                <ChatInput
                    socket={socket}
                    username={username}
                    serverId={server._id}
                    channelId={currentChannel._id}
                />
            </div>
        </div>
    );
}
