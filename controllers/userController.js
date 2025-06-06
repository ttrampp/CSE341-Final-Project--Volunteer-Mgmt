const User = require("../models/user");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//GET ALL USERS
async function getAllUsers(req, res) {
    //#swagger.tags = ['USERS']
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//GET ONE USER
async function getUserById(req, res) {
    //#swagger.tags = ['USERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find a user');
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//POST (create) ONE USER
async function registerUser(req, res) {
    //#swagger.tags = ['USERS']
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//PUT (update) ONE USER
async function updateUser(req, res) {
    //#swagger.tags = ['USERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to update a user');
    }
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "User not found" });
        res.status(200).send('User updated successfully!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//DELETE ONE USER
async function deleteUser(req, res) {
    //#swagger.tags = ['USERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to delete a user');
    }
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.status(200).send('User successfully deleted!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser
};