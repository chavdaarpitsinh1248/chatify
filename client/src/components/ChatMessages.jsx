import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { formatDate } from "../utils/time";
import { motion, AnimatePresence } from "framer-motion";
import TypingIndicator from "./TypingIndicator";


export default function ChatMessages({ messages, botTyping }) {
    const bottomRef = useRef(null);
    const visibleMessage = messages.slice(-50);

    // auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, botTyping]);

    let lastDate = "";

    return (
        <>
            <AnimatePresence>
                {visibleMessage.map((msg) => {
                    const currentDate = formatDate(msg.timestamp);
                    const showDate = currentDate !== lastDate;
                    lastDate = currentDate;

                    return (
                        <motion.div
                            key={msg.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {showDate && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-xs text-gray-500 my-2"
                                >
                                    {currentDate}
                                </motion.div>
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