const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuthenticated, ensureAdmin, ensureSelfOrAdmin } = require("../middleware/authMiddleware");


console.log("userController loaded:", Object.keys(userController));

router.get("/", ensureAuthenticated, userController.getAllUsers);
router.get("/:id", ensureAuthenticated, userController.getUserById);
router.post("/", userController.registerUser);
router.put("/:id", ensureAuthenticated, userController.updateUser);
router.delete("/:id", ensureAuthenticated, userController.deleteUser);

module.exports = router;