import { useState } from "react";

export default function ChatInput({ dispatch }) {
    const [text, setText] = useState("");

    const sendMessage = () => {
        if (!text.trim()) return;

        dispatch({
            type: "SEND_MESSAGE",
            payload: {
                id: Date.now(),
                text,
                sender: "user",
                timestamp: new Date(),
            },
        });

        setText("");
    };

    return (
        <div className="p-4 border-t bg-white flex gap-2">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
            />
            <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Send
            </button>
        </div>
    );
}