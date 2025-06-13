const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/api/users', require('./userRoutes'));
router.use('/api/events', require('./eventRoutes'));
router.use('/api/volunteers', require('./volunteerRoutes'));
router.use('/api/feedback', require('./feedbackRoutes'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;