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
    console.log("User connected:", socket.user.email);

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", {
            id: crypto.randomUUID(),
            text: message.text,
            sender: socket.user.username,
            userId: socket.user.id,
            timestamp: new Date(),
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.user.email);
    });
});




server.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
);