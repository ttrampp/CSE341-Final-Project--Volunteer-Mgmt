const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json('You must be logged in to gain access.');
    }
    next();
}

module.exports = {
    isAuthenticated,
};