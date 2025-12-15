import { useEffect, useRef } from "react";

export default function ChatMessages({ messages }) {
    const bottomRef = useRef(null);

    // auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`max-w-[75%] px-4 py-2 rounded-lg text-sm 
                        ${msg.sender === "user"
                            ? "ml-auto bg-blue-600 text-white"
                            : "mr-auto bg-gray-200 text-gray-800"
                        }
                    `}
                >
                    {msg.text}
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}