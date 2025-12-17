import { useState } from "react";

export default function ChatInput({
    socket,
    user,
    serverId,
    channelId,
    channelName,
}) {
    const [text, setText] = useState("");

    const sendMessage = () => {
        if (!text.trim()) return;
        if (!socket) return;

        socket.emit("sendChannelMessage", {
            serverId,
            channelId,
            text,
            user: {
                id: user.id,
                username: user.username,
            },
        });

        setText("");
    };

    return (
        <div className="p-3 border-t flex gap-2">
            <input
                className="flex-1 border px-3 py-2 rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message #${channelName || "channel"}`}
            />
            <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Send
            </button>
        </div>
    );
}
