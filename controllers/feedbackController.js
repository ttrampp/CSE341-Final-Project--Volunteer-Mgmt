const Feedback = require("../models/feedback");

//GET ALL EVENTS
async function getAllFeedbacks(req, res) {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
        } catch (err) {
        res.status(500).json({error: err.message});
        }
}

//GET ONE EVENT
async function getFeedbackById(req, res) {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({message: "Feedback not found"});
        res.json(feedback);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//POST (create) ONE USER
async function registerFeedback(req, res) {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//PUT (update) ONE USER
async function updateFeedback(req, res) {
    try {
        const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({message: "Feedback not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({error: err.message });
    }
}

//DELETE ONE USER
async function deleteFeedback(req, res) {
    try {
        const deleted = await Feedback.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({message: "Feedback not found"}) ;
        res.json({message:"Feedback deleted"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    getAllFeedbacks,
    getFeedbackById,
    registerFeedback,
    updateFeedback,
    deleteFeedback
};