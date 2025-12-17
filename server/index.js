require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Message = require("./models/Message");

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

const messageRoutes = require("./routes/messages");
app.use("/api/messages", messageRoutes);

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
    socket.on("joinChannel", ({ serverId, channelId }) => {
        const room = `${serverId}:${channelId}`;
        socket.join(room);

    });

    socket.on("sendChannelMessage", async ({ serverId, channelId, text, user }) => {
        const message = await Message.create({
            serverId,
            channelId,
            sender: user.id,
            senderName: user.username,
            text,
        });
        io.to(`${serverId}:${channelId}`).emit("newChannelMessage", {
            _id: message._id,
            text: message.text,
            senderName: message.senderName,
            channelId,
            createdAt: message.createdAt,
        });
    });
});





server.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
);