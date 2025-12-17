const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, enum: ["text", "voice"], default: "text" },
    },
    { _id: true }
);

const ServerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        channels: [ChannelSchema],
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

ServerSchema.pre("save", function (next) {
    if (!this.members) this.members = [];
    if (!this.members.includes(this.owner)) {
        this.members.push(this.owner);
    }
    next();
});

module.exports = mongoose.model("Server", ServerSchema);