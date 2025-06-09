const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const {ensureAuthenticated, ensureSelfOrAdmin,} = require("../middleware/authMiddleware");

router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getVolunteerById);
router.post("/", ensureAuthenticated, volunteerController.registerVolunteer);
router.put("/:id", ensureSelfOrAdmin, volunteerController.updateVolunteer);
router.delete("/:id", ensureSelfOrAdmin, volunteerController.deleteVolunteer);

module.exports = router;