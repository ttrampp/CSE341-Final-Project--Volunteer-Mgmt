require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../models/event");
const User = require("../models/user"); // import User model

const MONGODB_URI = process.env.MONGODB_URI;

async function seedEvents() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find users by email
    const erik = await User.findOne({ email: "erik@example.com" });
    const krista = await User.findOne({ email: "krista@example.com" });

    if (!erik || !krista) {
      throw new Error("Could not find one or both organizer users. Seed users first.");
    }

    const events = [
      {
        title: "Spring Cleanup",
        date: new Date("2025-04-15"),
        location: "Central Park",
        description: "Help clean up the park after the winter.",
        capacity: 25,
        organizerId: erik._id,
        tags: ["outdoor", "community"]
      },
      {
        title: "Food Drive",
        date: new Date("2025-05-10"),
        location: "Community Center",
        description: "Collecting and sorting food donations for local shelters.",
        capacity: 50,
        organizerId: krista._id,
        tags: ["charity", "indoor"]
      },
      {
        title: "Tree Planting Day",
        date: new Date("2025-06-01"),
        location: "City Greenbelt",
        description: "Join us in planting trees to restore the urban forest.",
        capacity: 30,
        organizerId: erik._id,
        tags: ["environment", "volunteer"]
      }
    ];

    // Remove old events
    await Event.deleteMany({});
    console.log("Old events removed");

    await Event.insertMany(events);
    console.log("Events successfully seeded");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding events:", err);
    process.exit(1);
  }
}

seedEvents();
