require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const connectDB = require("./database/connection");
connectDB();

const app = express();

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

app.get("/", (req, res) => {
  res.send("Welcome to the Volunteer Management API");
});

app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;