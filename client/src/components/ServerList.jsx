import { useEffect, useState } from "react";
import { getServers } from "../api/serverApi";

export default function ServerList({ token, onSelect, activeServer }) {
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) return;

        setLoading(true);
        setError("");

        getServers(token)
            .then((res) => setServers(res.data))
            .catch(() => setError("Failed to load servers"))
            .finally(() => setLoading(false));
    }, [token]);

    return (
        <div className="w-60 border-r h-screen p-2 space-y-2">
            {loading && <p className="text-sm text-gray-500">Loading...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {servers.map((s) => (
                <div
                    key={s._id}
                    onClick={() => onSelect(s)}
                    className={`p-2 rounded cursor-pointer
                        ${activeServer?._id === s._id
                            ? "bg-gray-300 font-semibold"
                            : "hover:bg-gray-200"
                        }`}
                >
                    {s.name}
                </div>
            ))}
        </div>
    );
}
