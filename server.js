// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const connectDB = require("./database/connection");
connectDB();

// Create Express app
const app = express();

// Middleware
app
  .use(bodyParser.json())
  .use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'UPDATE'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Z-key',
        'Authorization'
      ]
    })
  )
  .use('/', require('./routes'));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Volunteer Management API");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
