const Volunteer = require("../models/volunteer");

//GET ALL EVENTS
async function getAllVolunteers(req, res) {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
        } catch (err) {
        res.status(500).json({error: err.message});
        }
}

//GET ONE EVENT
async function getVolunteerById(req, res) {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) return res.status(404).json({message: "Volunteer not found"});
        res.json(volunteer);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//POST (create) ONE USER
async function registerVolunteer(req, res) {
    try {
        const volunteer = new Volunteer(req.body);
        await volunteer.save();
        res.status(201).json(volunteer);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//PUT (update) ONE USER
async function updateVolunteer(req, res) {
    try {
        const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({message: "Volunteer not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({error: err.message });
    }
}

//DELETE ONE USER
async function deleteVolunteer(req, res) {
    try {
        const deleted = await Volunteer.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({message: "Volunteer not found"}) ;
        res.json({message:"Volunteer deleted"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    getAllVolunteers,
    getVolunteerById,
    registerVolunteer,
    updateVolunteer,
    deleteVolunteer
};