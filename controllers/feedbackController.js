const Feedback = require("../models/feedback");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//GET ALL FEEDBACK
async function getAllFeedbacks(req, res) {
    //#swagger.tags = ['FEEDBACK']
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//GET ONE FEEDBACK
async function getFeedbackById(req, res) {
    //#swagger.tags = ['FEEDBACK']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find feedback');
    }
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//POST (create) ONE FEEDBACK
async function registerFeedback(req, res) {
    //#swagger.tags = ['FEEDBACK']
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: 'Feedback created successfully!', feedback });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//PUT (update) ONE FEEDBACK
async function updateFeedback(req, res) {
    //#swagger.tags = ['FEEDBACK']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to update feedback');
    }
    try {
        const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Feedback not found" });
        res.status(200).send('Feedback updated successfully!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//DELETE ONE USER
async function deleteFeedback(req, res) {
    //#swagger.tags = ['FEEDBACK']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to delete feedback');
    }
    try {
        const deleted = await Feedback.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Feedback not found" });
        res.status(200).send('Feedback successfully deleted!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllFeedbacks,
    getFeedbackById,
    registerFeedback,
    updateFeedback,
    deleteFeedback
};