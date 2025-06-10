const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {ensureSelfOrAdmin, ensureAdmin } = require("../middleware/authMiddleware");

router.get("/", ensureAdmin, userController.getAllUsers);
router.get("/:id", ensureSelfOrAdmin, userController.getUserById);
router.post("/", userController.registerUser);
router.put("/:id", ensureSelfOrAdmin, userController.updateUser);
router.delete("/:id", ensureSelfOrAdmin, userController.deleteUser);

module.exports = router;