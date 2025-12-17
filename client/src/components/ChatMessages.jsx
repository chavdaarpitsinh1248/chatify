import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { formatDate } from "../utils/time";
import { motion, AnimatePresence } from "framer-motion";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({ messages = [], botTyping }) {
    const bottomRef = useRef(null);
    const visibleMessages = messages.slice(-50);

    // auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, botTyping]);

    let lastRenderedDate = null;

    return (
        <>
            <AnimatePresence initial={false}>
                {visibleMessages.map((msg) => {
                    const messageDate = formatDate(msg.createdAt);
                    const showDate = messageDate !== lastRenderedDate;
                    lastRenderedDate = messageDate;

                    return (
                        <motion.div
                            key={msg._id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {showDate && (
                                <div className="text-center text-xs text-gray-500 my-2">
                                    {messageDate}
                                </div>
                            )}

                            <MessageBubble msg={msg} />
                        </motion.div>
                    );
                })}

                {botTyping && <TypingIndicator />}
            </AnimatePresence>

            <div ref={bottomRef} />
        </>
    );
}
