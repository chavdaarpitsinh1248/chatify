const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    serverId: { type: mongoose.Schema.Types.ObjectId, ref: "Server", required: true },
    channelId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
