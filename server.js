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
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Volunteer Management API</h1>
    <p>Status: ${req.isAuthenticated() ? `Logged in as ${req.user.username}` : "Logged out"}</p>
    <ul>
      <li><a href="/auth/github">Login with GitHub</a></li>
      <li><a href="/auth/logout">Logout</a></li>
      <li><a href="/volunteers">View Volunteers</a></li>
      <li><a href="/api-docs">Swagger Documentation</a></li>
    </ul>
  `);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
