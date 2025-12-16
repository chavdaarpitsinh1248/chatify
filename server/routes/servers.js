const express = require("express");
const router = express.Router();
const Server = require("../models/Server");
const authMiddleware = require("../middleware/auth");

// Create new server
router.post("/", authMiddleware, async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    const server = new Server({
        name,
        owner: userId,
        members: [userId],
        channels: [{ name: "general", type: "text" }],
    });

    await server.save();
    res.json(server);
});

// Get all servers user is a member of
router.get("/", authMiddleware, async (req, res) => {
    const servers = await Server.find({ members: req.user.id });
    res.json(servers);
});

// Add new channel to a server
router.post("/:serverId/channels", authMiddleware, async (req, res) => {
    const { name, type } = req.body;
    const server = await Server.findById(req.params.serverId);
    if (!server) return res.status(404).json({ error: "Server not found" });

    server.channels.push({ name, type });
    await server.save();
    res.json(server);
});

module.exports = router;