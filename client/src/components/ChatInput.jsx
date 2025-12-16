export default function ChatInput({
    socket,
    username,
    serverId,
    channelId,
}) {
    const [text, setText] = useState("");

    const sendMessage = () => {
        if (!text.trim()) return;

        socket.emit("sendChannelMessage", {
            serverId,
            channelId,
            message: {
                sender: username,
                text,
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
                placeholder={`Message #${channelId}`}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
