require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
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

let users = {};

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
        const decoded = JsonWebTokenError.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // { id, email }
        next();
    } catch (err) {
        next(new Error("Authentication error"));
    }
});


io.on("connection", (socket) => {
    console.log("User connected:", socket.user.email);

    socket.on("join", (username) => {
        users[socket.id] = username;
        io.emit("users", Object.values(users));
    });

    socket.on("sendMessage", (text) => {
        io.emit("receiveMessage", {
            text,
            sender: socket.user.email,
            id: Date.now(),
            timestamp: new Date(),
        });
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("users", Object.values(users));
        console.log("User disconnected");
    });
});

server.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
);