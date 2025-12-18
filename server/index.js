require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Message = require("./models/Message");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/servers", require("./routes/servers"));
app.use("/api/protected", require("./routes/protected"));
app.use("/api/messages", require("./routes/messages"));

// HTTP server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

// Socket auth
io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));

    try {
        socket.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        next(new Error("Invalid token"));
    }
});

// Room helper
const channelRoom = (channelId) => `channel:${channelId}`;

// Socket events
io.on("connection", (socket) => {

    socket.on("joinChannel", ({ channelId }) => {
        socket.join(channelRoom(channelId));
    });

    socket.on("leaveChannel", ({ channelId }) => {
        socket.leave(channelRoom(channelId));
    });

    socket.on("sendChannelMessage", async ({ serverId, channelId, text }) => {
        if (!text || text.trim().length === 0 || text.length > 2000) return;

        try {
            const message = await Message.create({
                serverId,
                channelId,
                sender: socket.user.id,
                senderName: socket.user.username,
                text: text.trim(),
            });

            io.to(channelRoom(channelId)).emit("newChannelMessage", {
                _id: message._id,
                text: message.text,
                senderName: message.senderName,
                channelId,
                createdAt: message.createdAt,
            });
        } catch (err) {
            console.error("Message save error:", err);
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
