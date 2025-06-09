const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Feedback = require("../models/feedback");
const User = require("../models/user");
const Event = require("../models/event");

dotenv.config();

async function seedFeedback() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const users = await User.find({});
    const events = await Event.find({});

    if (users.length === 0 || events.length === 0) {
      throw new Error("Make sure users and events are seeded first.");
    }

    const feedbackData = [
      {
        eventId: events[0]._id,
        userId: users[0]._id,
        rating: 5,
        comment: "Amazing event! Well organized and fun."
      },
      {
        eventId: events[1]?._id || events[0]._id,
        userId: users[1]?._id || users[0]._id,
        rating: 4,
        comment: "Great cause. Looking forward to more events."
      }
    ];

    await Feedback.deleteMany({});
    const inserted = await Feedback.insertMany(feedbackData);
    console.log(`Seeded ${inserted.length} feedback entries`);
    process.exit();
  } catch (err) {
    console.error("Error seeding feedback:", err);
    process.exit(1);
  }
}

seedFeedback();
