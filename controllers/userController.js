const User = require("../models/user");

//GET ALL USERS
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//GET ONE USER
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//POST (create) ONE USER
async function registerUser(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//PUT (update) ONE USER
async function updateUser(req, res) {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({message: "User not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({error: err.message });
    }
}

//DELETE ONE USER
async function deleteUser(req, res) {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({message: "User not found"}) ;
        res.json({message:"User deleted"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser
};