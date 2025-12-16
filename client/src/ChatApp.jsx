import { useEffect, useState } from "react";
import socket from "./socket";

import ServerList from "./components/ServerList";
import ChatPanel from "./components/ChatPanel";
import JoinChat from "./components/JoinChat";

export default function ChatApp() {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState(null);
    const [currentServer, setCurrentServer] = useState(null);

    // Example: restore auth from localStorage (adjust to your auth logic)
    useEffect(() => {
        const savedUser = localStorage.getItem("username");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUsername(savedUser);
            setToken(savedToken);
        }
    }, []);

    // Join server via socket
    const handleJoinServer = (server) => {
        setCurrentServer(server);

        socket.emit("joinServer", {
            serverId: server._id,
            username,
        });
    };

    // If user is NOT authenticated yet
    if (!username || !token) {
        return (
            <JoinChat
                onJoin={(name, jwtToken) => {
                    setUsername(name);
                    setToken(jwtToken);
                    localStorage.setItem("username", name);
                    localStorage.setItem("token", jwtToken);
                }}
            />
        );
    }

    return (
        <div className="flex h-screen bg-white">
            {/* LEFT SIDEBAR — SERVERS */}
            <ServerList token={token} onSelect={handleJoinServer} />

            {/* MAIN CHAT AREA */}
            {currentServer ? (
                <ChatPanel
                    server={currentServer}
                    username={username}
                    socket={socket}
                />
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a server to start chatting
                </div>
            )}
        </div>
    );
}
