const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const {ensureAuthenticated} = require("../middleware/authMiddleware");

router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getVolunteerById);
router.post("/", ensureAuthenticated, volunteerController.registerVolunteer);
router.put("/:id", ensureAuthenticated, volunteerController.updateVolunteer);
router.delete("/:id", ensureAuthenticated, volunteerController.deleteVolunteer);

module.exports = router;