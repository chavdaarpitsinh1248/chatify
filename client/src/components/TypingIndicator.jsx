import { motion } from "framer-motion";

export default function TypingIndicator() {
    return (
        <div className="mr-auto bg-gray-200 px-4 py-2 rounded-lg flex gap-1">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
}