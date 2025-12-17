const express = require("express");
const router = express.Router();
const Server = require("../models/Server");
const authMiddleware = require("../middleware/authMiddleware");

// Create new server
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        if (!name) return res.status(400).json({ error: "Server name required" });

        const server = new Server({
            name,
            owner: userId,
            members: [userId],
            channels: [{ name: "general", type: "text" }],
        });

        await server.save();
        res.json(server);
    } catch (err) {
        res.status(500).json({ error: "Failed to create server" });
    }
});

// Get all servers user is a member of
router.get("/", authMiddleware, async (req, res) => {
    try {
        const servers = await Server.find({ members: req.user.id });
        res.json(servers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch servers" });
    }
});

// Add new channel to a server
router.post("/:serverId/channels", authMiddleware, async (req, res) => {
    try {
        const { name, type } = req.body;
        const { serverId } = req.params;

        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(serverId)) {
            return res.status(400).json({ error: "Invalid server ID" });
        }

        const server = await Server.findById(serverId);
        if (!server) return res.status(404).json({ error: "Server not found" });

        if (server.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: "Only owner can add channels" });
        }

        if (!name || !["text", "voice"].includes(type)) {
            return res.status(400).json({ error: "Valid channel name and type required" });
        }

        server.channels.push({ name: name.trim(), type });
        await server.save();
        res.json(server);
    } catch (err) {
        res.status(500).json({ error: "Failed to add channel" });
    }
});

module.exports = router;
