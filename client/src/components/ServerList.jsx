import { useEffect, useState } from "react";
import { getServers } from "../api/serverApi";

export default function ServerList({ token, onSelect }) {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        getServers(token).then((res) => setServers(res.data));
    }, [token]);

    return (
        <div className="w-60 border-r h-screen p-2 space-y-2">
            {servers.map((s) => (
                <div
                    key={s._id}
                    onClick={() => onSelect(s)}
                    className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                    {s.name}
                </div>
            ))}
        </div>
    );
}