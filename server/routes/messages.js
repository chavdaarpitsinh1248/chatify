const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// Get messages for a channel
router.get("/:serverId/:channelId", auth, async (req, res) => {
    const { serverId, channelId } = req.params;

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(serverId) || !mongoose.Types.ObjectId.isValid(channelId)) {
        return res.status(400).json({ error: "Invalid IDs" });
    }

    try {
        const messages = await Message.find({
            serverId,
            channelId,
        })
            .sort({ createdAt: -1 })
            .limit(100);

        res.json(messages.reverser());
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

module.exports = router;