const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getVolunteerById);
router.post("/", isAuthenticated, volunteerController.registerVolunteer);
router.put("/:id", isAuthenticated, volunteerController.updateVolunteer);
router.delete("/:id", isAuthenticated, volunteerController.deleteVolunteer);

module.exports = router;