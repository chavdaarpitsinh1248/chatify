import { useEffect, useState } from "react";
import { connectSocket, getSocket } from "./socket";
import { useAuth } from "./auth/AuthContext";

import ServerList from "./components/ServerList";
import ChatPanel from "./components/ChatPanel";
import JoinChat from "./components/JoinChat";

export default function ChatApp() {
    const { user, login } = useAuth();
    const [currentServer, setCurrentServer] = useState(null);
    const [socket, setSocket] = useState(null);

    // Connect socket when user is available
    useEffect(() => {
        if (user?.token && !socket) {
            const sock = connectSocket(user.token);
            setSocket(sock);
        }
    }, [user]);

    const handleJoinServer = (server) => {
        setCurrentServer(server);

        socket?.emit("joinServer", {
            serverId: server._id,
            user: user.user,
        });
    };

    if (!user) {
        return <JoinChat onJoin={(name, token) => login({ user: { username: name }, token })} />;
    }

    return (
        <div className="flex h-screen bg-white">
            <ServerList token={user.token} onSelect={handleJoinServer} />

            {currentServer && socket ? (
                <ChatPanel
                    server={currentServer}
                    channel={currentServer.channels[0]} // default first channel
                    socket={socket}
                    token={user.token}
                    user={user.user}
                />
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a server to start chatting
                </div>
            )}
        </div>
    );
}
