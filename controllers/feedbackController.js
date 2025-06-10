const Feedback = require("../models/feedback");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// GET ALL FEEDBACK
async function getAllFeedbacks(req, res) {
  //#swagger.tags = ['FEEDBACK']
  //#swagger.description = 'Get all feedback entries'
  try {
    const feedbacks = await Feedback.find().populate('userId', 'name email').populate('eventId', 'title');
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// GET ONE FEEDBACK
async function getFeedbackById(req, res) {
  /*
    #swagger.tags = ['FEEDBACK']
    #swagger.description = 'Get a feedback entry by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID of the feedback to retrieve'
    }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use valid ID to find feedback');
  }
  try {
    const feedback = await Feedback.findById(req.params.id).populate('userId', 'name email').populate('eventId', 'title');
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST (create) ONE FEEDBACK
async function registerFeedback(req, res) {
  /*
    #swagger.tags = ['FEEDBACK']
    #swagger.description = 'Create a new feedback entry'
    #swagger.parameters['feedback'] = {
      in: 'body',
      required: true,
      schema: {
        $userId: "60f1a6d2b9c3f842d8c45f88",
        $eventId: "60f1a6d2b9c3f842d8c45f99",
        rating: 4,
        comment: "Great experience!"
      }
    }
  */
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback created successfully!', feedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// PUT (update) ONE FEEDBACK
async function updateFeedback(req, res) {
  /*
    #swagger.tags = ['FEEDBACK']
    #swagger.description = 'Update feedback for an event'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID of the feedback to update'
    }
    #swagger.parameters['feedback'] = {
      in: 'body',
      required: true,
      schema: {
        rating: 5,
        comment: "Even better this time around!"
      }
    }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use valid ID to update feedback');
  }
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: 'Feedback updated successfully!', updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE ONE FEEDBACK
async function deleteFeedback(req, res) {
  /*
    #swagger.tags = ['FEEDBACK']
    #swagger.description = 'Delete feedback by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID of the feedback to delete'
    }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use valid ID to delete feedback');
  }
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: 'Feedback successfully deleted!' });
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
