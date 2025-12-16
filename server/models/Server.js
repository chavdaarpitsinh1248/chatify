const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["text", "voice"], default: "text" },
});

const ServerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channels: [ChannelSchema],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Server", ServerSchema);