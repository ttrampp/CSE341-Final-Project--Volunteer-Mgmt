require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user"); 

const MONGODB_URI = process.env.MONGODB_URI;

const users = [
  {
    name: "Erik Burton",
    email: "erik@example.com",
    role: "admin",
    passwordHash: "hashedpassword123", 
    location: "Texas",
    phone: "123-456-7890",
    availability: "Weekends"
  },
  {
    name: "Krista Jones",
    email: "krista@example.com",
    role: "volunteer",
    passwordHash: "hashedpassword456",
    location: "Utah",
    phone: "987-654-3210",
    availability: "Evenings"
  }
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing users 
    // await User.deleteMany({});
    // console.log("Existing users removed");

    // Insert seed users
    await User.insertMany(users);
    console.log("Seed users added");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
