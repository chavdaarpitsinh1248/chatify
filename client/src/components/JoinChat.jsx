import { useState } from "react";

export default function JoinChat({ onJoin }) {
    const [name, setName] = useState("");

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="p-6 border rounded-lg w-80 space-y-4">
                <h2 className="text-xl font-semibold">Join Chat</h2>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter username"
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    onClick={() => name && onJoin(name)}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Join
                </button>
            </div>
        </div>
    );
}