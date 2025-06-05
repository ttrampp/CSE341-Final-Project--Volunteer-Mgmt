const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { use } = require("passport");

router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getVolunteerById);
router.post("/", volunteerController.registerVolunteer);
router.put("/:id", volunteerController.updateVolunteer);
router.delete("/:id", volunteerController.deleteVolunteer);

module.exports = router;