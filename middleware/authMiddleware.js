function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({message: "You must be logged in to access this route."})
}

function ensureSelfOrAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: "You must be logged in."});
    }

    const isAdmin = req.user.role === 'admin';
    const isSelf = req.user._id == req.params.id;

    if (isAdmin || isSelf) {
        return next();
    }

    return res.status(403).json({message: "Not authorized to perform this action."});
}

function ensureAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: "You must be logged in."});
    }

    if (req.user.role === 'admin') {
        return next();
    }

    return res.status(403).json({message: "Sorry, but only admins may access this route."});
}

module.exports = {
    ensureAuthenticated,
    ensureSelfOrAdmin,
    ensureAdmin
};