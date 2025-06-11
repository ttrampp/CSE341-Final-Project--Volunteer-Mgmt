const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/api/users', require('./userRoutes'));
router.use('/api/events', require('./eventRoutes'));
router.use('/api/volunteers', require('./volunteerRoutes'));
router.use('/api/feedback', require('./feedbackRoutes'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

// // Login status check routes because it makes me feel better and people like to know if it worked
// router.get("/login-success", (req, res) => {
//     res.send(`Welcome ${req.user.username}, you are logged in with GitHub!`);
// });

// router.get("/login-failure", (req, res) => {
//     res.send("Login failed. Please try again.");
// });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;