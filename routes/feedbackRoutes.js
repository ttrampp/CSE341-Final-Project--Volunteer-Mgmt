const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const {ensureAuthenticated, ensureSelfOrAdmin,} = require("../middleware/authMiddleware");

router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/", ensureAuthenticated, feedbackController.registerFeedback);
router.put("/:id", ensureSelfOrAdmin, feedbackController.updateFeedback);
router.delete("/:id", ensureSelfOrAdmin, feedbackController.deleteFeedback);

module.exports = router;