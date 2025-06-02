const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { use } = require("passport");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/register", eventController.registerEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;