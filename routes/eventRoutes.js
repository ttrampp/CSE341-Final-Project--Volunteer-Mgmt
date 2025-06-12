const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", isAuthenticated, eventController.registerEvent);
router.put("/:id", isAuthenticated, eventController.updateEvent);
router.delete("/:id", isAuthenticated, eventController.deleteEvent);


module.exports = router;