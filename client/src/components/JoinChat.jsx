import { useState } from "react";

export default function JoinChat({ onJoin }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleJoin = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            setError("Username cannot be empty");
            return;
        }
        setError("");
        onJoin(trimmed);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="p-6 border rounded-lg w-80 space-y-4">
                <h2 className="text-xl font-semibold">Join Chat</h2>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter username"
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                    onClick={handleJoin}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Join
                </button>
            </div>
        </div>
    );
}
