const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/", isAuthenticated, feedbackController.registerFeedback);
router.put("/:id", isAuthenticated, feedbackController.updateFeedback);
router.delete("/:id", isAuthenticated, feedbackController.deleteFeedback);


module.exports = router;