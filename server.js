// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection");
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Volunteer Management API");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
