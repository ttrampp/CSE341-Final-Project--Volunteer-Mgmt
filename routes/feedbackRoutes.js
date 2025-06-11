const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const {ensureAuthenticated} = require("../middleware/authMiddleware");

router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/", ensureAuthenticated, feedbackController.registerFeedback);
router.put("/:id", ensureAuthenticated, feedbackController.updateFeedback);
router.delete("/:id", ensureAuthenticated, feedbackController.deleteFeedback);

module.exports = router;