const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const {ensureAuthenticated} = require("../middleware/authMiddleware");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", ensureAuthenticated, eventController.registerEvent);
router.put("/:id", ensureAuthenticated, eventController.updateEvent);
router.delete("/:id", ensureAuthenticated, eventController.deleteEvent);

module.exports = router;