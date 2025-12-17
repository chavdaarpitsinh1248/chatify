require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/servers", require("./routes/servers"));
app.use("/api/protected", require("./routes/protected"));
app.use("/api/messages", require("./routes/messages"));

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Socket.IO authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
        return next(new Error("Authentication error"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // { id, email, username }
        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
});

// Helper function for room names
const getRoom = (serverId, channelId) => `${serverId}:${channelId}`;

// Socket.IO events
io.on("connection", (socket) => {

    // Join a channel room
    socket.on("joinChannel", ({ serverId, channelId }) => {
        const room = getRoom(serverId, channelId);
        socket.join(room);
    });

    // Send a message to a channel
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

            io.to(getRoom(serverId, channelId)).emit("newChannelMessage", {
                _id: message._id,
                text: message.text,
                senderName: message.senderName,
                channelId,
                createdAt: message.createdAt,
            });
        } catch (err) {
            console.error("Error saving message:", err);
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
