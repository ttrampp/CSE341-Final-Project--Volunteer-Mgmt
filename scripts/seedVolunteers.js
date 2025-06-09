const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Volunteer = require("../models/volunteer");
const User = require("../models/user");
const Event = require("../models/event");

dotenv.config();

async function seedVolunteers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const users = await User.find({});
    const events = await Event.find({});

    if (users.length === 0 || events.length === 0) {
      throw new Error("Please seed users and events before seeding volunteers.");
    }

    const volunteerData = [
      {
        userId: users[0]._id,
        eventId: events[0]._id,
        status: "approved"
      },
      {
        userId: users[1]?._id || users[0]._id,
        eventId: events[1]?._id || events[0]._id,
        status: "pending"
      }
    ];

    await Volunteer.deleteMany({});
    const inserted = await Volunteer.insertMany(volunteerData);
    console.log(`Seeded ${inserted.length} volunteer entries`);
    process.exit();
  } catch (err) {
    console.error("Error seeding volunteers:", err);
    process.exit(1);
  }
}

seedVolunteers();
