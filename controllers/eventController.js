const Event = require("../models/event");

//GET ALL EVENTS
async function getAllEvents(req, res) {
    try {
        const events = await Event.find();
        res.json(events);
        } catch (err) {
        res.status(500).json({error: err.message});
        }
}

//GET ONE EVENT
async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({message: "Event not found"});
        res.json(event);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//POST (create) ONE USER
async function registerEvent(req, res) {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//PUT (update) ONE USER
async function updateEvent(req, res) {
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({message: "Event not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({error: err.message });
    }
}

//DELETE ONE USER
async function deleteEvent(req, res) {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({message: "Event not found"}) ;
        res.json({message:"Event deleted"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    registerEvent,
    updateEvent,
    deleteEvent
};