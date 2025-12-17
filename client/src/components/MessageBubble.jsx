import { memo } from "react";
import { motion } from "framer-motion";
import { formatTime } from "../utils/time";

function MessageBubble({ msg, currentUserId }) {
    const isOwnMessage = msg.sender?.toString() === currentUserId;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-sm flex flex-col
                ${isOwnMessage
                    ? "ml-auto bg-blue-600 text-white"
                    : "mr-auto bg-gray-200 text-gray-900"
                }`}
        >
            {!isOwnMessage && (
                <span className="text-xs font-semibold mb-1">
                    {msg.senderName}
                </span>
            )}

            <span>{msg.text}</span>

            <span
                className={`text-[10px] mt-1 self-end opacity-70 ${isOwnMessage ? "text-white" : "text-gray-600"
                    }`}
            >
                {formatTime(msg.createdAt)}
            </span>
        </motion.div>
    );
}

export default memo(MessageBubble);
