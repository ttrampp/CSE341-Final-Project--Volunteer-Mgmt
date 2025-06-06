const Volunteer = require("../models/volunteer");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//GET ALL VOLUNTEERS
async function getAllVolunteers(req, res) {
    //#swagger.tags = ['VOLUNTEERS']
    try {
        const volunteers = await Volunteer.find();
        res.status(200).json(volunteers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//GET ONE VOLUNTEER
async function getVolunteerById(req, res) {
    //#swagger.tags = ['VOLUNTEERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find a volunteer');
    }
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).json(volunteer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//POST (create) ONE VOLUNTEER
async function registerVolunteer(req, res) {
    //#swagger.tags = ['VOLUNTEERS']
    try {
        const volunteer = new Volunteer(req.body);
        await volunteer.save();
        res.status(201).json({ message: 'Volunteer created successfully!', volunteer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//PUT (update) ONE VOLUNTEER
async function updateVolunteer(req, res) {
    //#swagger.tags = ['VOLUNTEERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to update a volunteer');
    }
    try {
        const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//DELETE ONE VOLUNTEER
async function deleteVolunteer(req, res) {
    //#swagger.tags = ['VOLUNTEERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to delete a volunteer');
    }
    try {
        const deleted = await Volunteer.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).send('Volunteer successfully deleted!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllVolunteers,
    getVolunteerById,
    registerVolunteer,
    updateVolunteer,
    deleteVolunteer
};