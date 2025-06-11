// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
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
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
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

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
    //});
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Volunteer Management API</h1>
    <p>Status: ${req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Logged out'}</p>
    <ul>
      <li><a href="/login">Login with GitHub</a></li>
      <li><a href="/logout">Logout</a></li>
      <li><a href="/api/users">View Users (Modifications are Protected)</a></li>
      <li><a href="/api/events">View Events (Modifications are Protected)</a></li>
      <li><a href="/api/volunteers">View Volunteers (Modifications are Protected)</a></li>
      <li><a href="/api/feedback">View Feedback (Modifications are Protected)</a></li>
      <li><a href="/api-docs">Swagger Documentation</a></li>
    </ul>
  `);
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect('/');
  });

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught Exception: ${err})\n` + `Exception origin: ${origin}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;