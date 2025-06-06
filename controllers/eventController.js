const Event = require("../models/event");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//GET ALL EVENTS
async function getAllEvents(req, res) {
    //#swagger.tags = ['EVENTS']
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//GET ONE EVENT
async function getEventById(req, res) {
    //#swagger.tags = ['EVENTS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find an event');
    }
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//POST (create) ONE EVENT
async function registerEvent(req, res) {
    //#swagger.tags = ['EVENTS']
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: 'Event created successfully!', event });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//PUT (update) ONE EVENT
async function updateEvent(req, res) {
    //#swagger.tags = ['EVENTS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to update an event');
    }
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Event not found" });
        res.status(200).send('Event updated successfully!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//DELETE ONE EVENT
async function deleteEvent(req, res) {
    //#swagger.tags = ['EVENTS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to delete an event');
    }
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Event not found" });
        res.status(200).send('Event successfully deleted!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    registerEvent,
    updateEvent,
    deleteEvent
};