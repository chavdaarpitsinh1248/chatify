import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { formatDate } from "../utils/time";


export default function ChatMessages({ messages, botTyping }) {
    const bottomRef = useRef(null);

    // auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, botTyping]);

    let lastDate = "";

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => {
                const currentDate = formatDate(msg.timestamp);
                const showDate = currentDate !== lastDate;
                lastDate = currentDate;

                return (
                    <div key={msg.id}>
                        {showDate && (
                            <div className="text-center text-xs text-gray-500 my-2">
                                {currentDate}
                            </div>
                        )}
                        <MessageBubble msg={msg} />
                    </div>
                );
            })}

            {botTyping && (
                <div className="mr-auto bg-gray-200 px-4 py-2 rounded-lg text-sm italic">
                    Bot is typing...
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    );
}