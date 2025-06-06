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
    /*
      #swagger.tags = ['EVENTS']
      #swagger.description = 'Create a new event'
      #swagger.parameters['event'] = {
          in: 'body',
          description: 'Event details',
          required: true,
          schema: {
              title: 'Community Cleanup',
              date: '2025-07-01T10:00:00Z',
              location: 'Central Park',
              description: 'Cleaning up trash and planting trees',
              capacity: 50,
              organizerId: '60f1a6d2b9c3f842d8c45f88',
              tags: ['environment', 'volunteer']
          }
      }
    */
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
    /* 
      #swagger.tags = ['EVENTS']
      #swagger.description = 'Update an existing event by ID'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Event ID to update',
          required: true,
          type: 'string'
      }
      #swagger.parameters['event'] = {
          in: 'body',
          description: 'Updated event details',
          required: true,
          schema: {
              title: 'Updated Event Title',
              date: '2025-08-01T14:30:00Z',
              location: 'Updated Location',
              description: 'Updated description for the event',
              capacity: 100,
              organizerId: '60f1a6d2b9c3f842d8c45f88',
              tags: ['community', 'outreach']
          }
      }
    */
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