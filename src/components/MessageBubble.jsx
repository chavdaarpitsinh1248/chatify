import { formatTime } from "../utils/time";

export default function MessageBubble({ msg }) {
    const isUser = msg.sender === "user";

    return (
        <div
            className={`max-w-[75%] px-4 py-2 rounded-lg text-sm flex flex-col
                ${isUser ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-gray-200"}
                `}
        >
            <span>{msg.text}</span>
            <span
                className={`text-[10px] mt-1 self-end opacity-70 ${isUser ? "text-white" : "text-gray-600"
                    }`}
            >
                {formatTime(msg.timestamp)}
            </span>
        </div>
    );
}