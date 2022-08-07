const express = require("express");
const authenticaion = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  searchUsers,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/login", authenticaion, loginUser);
router.get("/", authenticaion, searchUsers);
router.post("/register", authenticaion, registerUser);

module.exports = router;
