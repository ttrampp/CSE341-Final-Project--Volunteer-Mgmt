const Volunteer = require("../models/volunteer");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//GET ALL VOLUNTEERS
async function getAllVolunteers(req, res) {
    //#swagger.tags = ['VOLUNTEERS']
    try {
        const volunteers = await Volunteer.find().populate('userId', 'name email').populate('eventId', 'title');
        res.status(200).json(volunteers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//GET ONE VOLUNTEER
async function getVolunteerById(req, res) {
    /*
        #swagger.tags = ['VOLUNTEERS']
        #swagger.description = 'Get volunteer registration by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'string'
        }
    */
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find a volunteer');
    }
    try {
        const volunteer = await Volunteer.findById(req.params.id).populate('userID', 'name email').populate('eventID', 'title');
        if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).json(volunteer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//POST (create) ONE VOLUNTEER
async function registerVolunteer(req, res) {
    /*
        #swagger.tags = ['VOLUNTEERS']
        #swagger.description = 'Register a new volunteer'
        #swagger.parameters['volunteer'] = {
            in: 'body',
            description: 'Volunteer registration info',
            required: true,
            schema: {
            $userId: "60f1a6d2b9c3f842d8c45f88",
            $eventId: "60f1a6d2b9c3f842d8c45f99",
            status: "pending"
            }
        }
    */
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
    /*
        #swagger.tags = ['VOLUNTEERS']
        #swagger.description = 'Update a volunteer registration'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Volunteer ID',
            required: true,
            type: 'string'
        }
        #swagger.parameters['volunteer'] = {
            in: 'body',
            description: 'Updated volunteer info',
            required: true,
            schema: {
            status: "approved"
            }
        }
    */
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
    /*
        #swagger.tags = ['VOLUNTEERS']
        #swagger.description = 'Delete a volunteer by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'string'
        }
    */
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