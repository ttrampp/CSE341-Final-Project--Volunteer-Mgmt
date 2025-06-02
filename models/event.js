const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: String,
    description: String,
    capacity: Number,
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [String]
});

module.exports = mongoose.model("Event", eventSchema);
