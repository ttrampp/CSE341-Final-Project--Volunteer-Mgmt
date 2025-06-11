const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { ensureAdmin } = require("../middleware/authMiddleware");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", ensureAdmin, eventController.registerEvent);
router.put("/:id", ensureAdmin, eventController.updateEvent);
router.delete("/:id", ensureAdmin, eventController.deleteEvent);

module.exports = router;