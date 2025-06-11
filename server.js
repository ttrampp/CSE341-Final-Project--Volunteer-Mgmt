// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require('express');
const session = require('express-session')
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger.json');
const connectDB = require("./database/connection");
const authRoute = require('./routes/authRoute');


// Create Express app
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Session setup -- needed for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: true
  })
);

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize the user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Middleware function to check if a user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({error: "You must be logged in to access this."});
}

// Routes
const userRoutes = require('./routes/userRoutes');         
app.use('/api/users', userRoutes);                        

const eventRoutes = require('./routes/eventRoutes');        
app.use('/api/events', eventRoutes);      

const volunteerRoutes = require('./routes/volunteerRoutes');         
app.use('/api/volunteers', volunteerRoutes);                        

const feedbackRoutes = require('./routes/feedbackRoutes');        
app.use('/api/feedback', feedbackRoutes);     

app.use("/auth", authRoute);


// Redirects to GitHub for Login
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"]}));

// GitHub redirects here after login
app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login-failure",
        successRedirect: "/login-success",
    })
);

// Login status check routes because it makes me feel better and people like to know if it worked
app.get("/login-success", (req, res) => {
    res.send(`Welcome ${req.user.username}, you are logged in with GitHub!`);
});

app.get("/login-failure", (req, res) => {
    res.send("Login failed. Please try again.");
});

app.get("/protected", ensureAuthenticated, (req, res) => {
    res.send("Only those who are logged-in can see this.");
});

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Volunteer Management API</h1>
    <p>Status: ${req.isAuthenticated() ? `Logged in as ${req.user.username}` : 'Logged out'}</p>
    <ul>
      <li><a href="/auth/github">Login with GitHub</a></li>
      <li><a href="/auth/logout">Logout</a></li>
      <li><a href="/users">View Users (Modifications are Protected)</a></li>
      <li><a href="/events">View Events (Modifications are Protected)</a></li>
      <li><a href="/volunteers">View Volunteers (Modifications are Protected)</a></li>
      <li><a href="/feedback">View Feedback (Modifications are Protected)</a></li>
      <li><a href="/api-docs">Swagger Documentation</a></li>
    </ul>
  `);
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  oauth2RedirectUrl: 'https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/api-docs/oauth2-redirect.html', // or Render version
  swaggerOptions: {
    oauth: {
      clientId: process.env.GITHUB_CLIENT_ID,
      usePkceWithAuthorizationCodeGrant: true
    }
  }
}));

const path = require('path');
//app.use('/api-docs', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));


// Connect to DB and start server
connectDB()                                           //Hey database, are you there and ready?
  .then(() => {
      app.listen(PORT, () => {
        const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
        console.log(`✅ Server is running at ${baseUrl}`);
      });
  })
  .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
  });
