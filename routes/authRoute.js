const express = require("express");
const router = express.Router();

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Optional: clears the cookie
      res.send("You have been logged out.");
    });
  });
});

module.exports = router;