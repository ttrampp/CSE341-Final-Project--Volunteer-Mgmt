const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { use } = require("passport");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register", userController.registerUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;