import { io } from "socket.io-client";

const stored = localStorage.getItem("user");
const token = stored ? JSON.parse(stored).token : null;


let socket = null;

export const connectSocket = (token) => {
    socket = io("http://localhost:5000", {
        auth: { token },
        autoConnect: true,
    });
    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
export default socket;