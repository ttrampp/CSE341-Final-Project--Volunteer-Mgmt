const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, userController.getAllUsers);
router.get("/:id", isAuthenticated, userController.getUserById);
router.post("/", userController.registerUser);
router.put("/:id", isAuthenticated, userController.updateUser);
router.delete("/:id", isAuthenticated, userController.deleteUser);


module.exports = router;