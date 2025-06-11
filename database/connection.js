const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'volunteerDB';    //fallback

  if (!uri) {
    console.error("Missing MONGODB_URI in .env file");
    process.exit(1);
  }
    await mongoose.connect(uri, {
      dbName,
    });
    console.log(`MongoDB connected to ${dbName}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
