const express = require("express");
const authenticaion = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  registerUser,
  loginUser,
  searchUsers,
} = require("../controllers/userControllers");

router.get("/", authenticaion, searchUsers);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
