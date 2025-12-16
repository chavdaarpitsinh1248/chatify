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
    console.log("User connected:", socket.id);

    socket.on("joinServer", ({ serverId, username }) => {
        socket.join(serverId);
        socket.username = username;
        socket.serverId = serverId;
        io.to(serverId).emit("serverMessage", {
            sender: "System",
            text: `${username} joined the server`,
            timeStamp: new Date(),
        });
    });

    socket.on("sendServerMessage", ({ serverId, message }) => {
        io.to(serverId).emit("serverMessage", {
            ...message,
            id: Date.now(),
            timestamp: new Date(),
        });
    });

    socket.on("disconnect", () => {
        const { serverId, username } = socket;
        if (serverId && username) {
            io.to(serverId).emit("serverMessage", {
                sender: "System",
                text: `${username} left the server`,
                timestamp: new Date(),
            });
        }
    });
});




server.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
);