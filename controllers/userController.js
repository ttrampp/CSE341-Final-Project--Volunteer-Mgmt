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
    /* 
      #swagger.tags = ['USERS']
      #swagger.description = 'Create a new user'
      #swagger.parameters['user'] = {
          in: 'body',
          description: 'User info',
          required: true,
          schema: {
              name: 'Jane Doe2',
              email: 'jane@example.com',
              role: 'volunteer',
              passwordHash: 'hashedPassword123',
              location: 'New York',
              phone: '555-123-4567',
              availability: 'Weekends only'
          }
      }
    */
    try {
        if (!req.body || Object.keys(req.body).length === 0 || Array.isArray(req.body)) {
            return res.status(400).json({ error: "Request body must be a non-empty object" });
        }

        const { name, email, role, passwordHash, location, phone, availability } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: "'name' is required and must be a string" });
        }
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: "'email' is required and must be a string" });
        }
        if (!role || typeof role !== 'string') {
            return res.status(400).json({ error: "'role' is required and must be a string" });
        }
        if (!passwordHash || typeof passwordHash !== 'string') {
            return res.status(400).json({ error: "'passwordHash' is required and must be a string" });
        }

        const user = new User({
            name,
            email,
            role,
            passwordHash,
            location,
            phone,
            availability
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//PUT (update) ONE USER
async function updateUser(req, res) {
    /* 
      #swagger.tags = ['USERS']
      #swagger.description = 'Update a user by ID'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID to update',
          required: true,
          type: 'string'
      }
      #swagger.parameters['user'] = {
          in: 'body',
          description: 'Fields to update for the user',
          required: true,
          schema: {
              name: 'Jane Doe',
              email: 'jane@example.com',
              role: 'admin',
              passwordHash: 'updatedHash123',
              location: 'San Francisco',
              phone: '555-987-6543',
              availability: 'Weekdays'
          }
      }
    */
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use valid ID to update a user' });
    }

    if (!req.body || Object.keys(req.body).length === 0 || Array.isArray(req.body)) {
        return res.status(400).json({ error: "Request body must be a non-empty object" });
    }

    const { email, phone } = req.body;

    if (email && typeof email !== 'string') {
        return res.status(400).json({ error: "'email' must be a string" });
    }

    if (phone && typeof phone !== 'string') {
        return res.status(400).json({ error: "'phone' must be a string" });
    }

    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "User not found" });
        res.status(200).send('User updated successfully!');
    } catch (err) {
        res.status(500).json({ error: err.message });
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