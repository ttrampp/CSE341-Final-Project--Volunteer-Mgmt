const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'volunteer'], default: 'volunteer' },
    passwordHash: { type: String },
    location: String,
    phone: String,
    availability: String
})