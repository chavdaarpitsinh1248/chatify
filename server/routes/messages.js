const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// Get messages for a channel
router.get("/:serverId/:channelId", auth, async (req, res) => {
    const { serverId, channelId } = req.params;

    const messages = await Message.find({
        serverId,
        channelId,
    })
        .sort({ createAt: 1 })
        .limit(100);

    res.json(messages);
});

module.exports = router;