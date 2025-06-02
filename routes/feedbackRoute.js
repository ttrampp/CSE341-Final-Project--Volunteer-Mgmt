const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const { use } = require("passport");

router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/register", feedbackController.registerFeedback);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;