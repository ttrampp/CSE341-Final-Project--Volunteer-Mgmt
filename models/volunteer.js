const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    registrationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' }
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
