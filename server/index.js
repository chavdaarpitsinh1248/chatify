require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use("/api/auth", require("./routes/auth"));

const serverRoutes = require("./routes/servers");
app.use("/apiservers", serverRoutes);

const protectedRoutes = require("./routes/protected");
app.use("/api/protected", protectedRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error("Authentication error"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // { id, email }
        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
});



io.on("connection", (socket) => {
    socket.on("joinChannel", ({ serverId, channelId, username }) => {
        const room = `${serverId}:${channelId}`;
        socket.join(room);

        io.to(room).emit("channelMessage", {
            sender: "System",
            text: `${username} joined the channel`,
            timestamp: new Date(),
        });
    });

    socket.on("sendChannelMessage", ({ serverId, channelId, message }) => {
        const room = `${serverId}:${channelId}`;
        io.to(room).emit("channelMessage", {
            ...message,
            id: Date.now(),
            timestamp: new Date(),
        });
    });
});





server.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
);