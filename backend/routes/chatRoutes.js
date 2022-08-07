const express = require("express");
const authenticaion = require("../middlewares/authMiddleware");
const router = express.Router();
const { accessChats, fetchChats } = require("../controllers/chatController");

router
  .route("/")
  .post(authenticaion, accessChats)
  .get(authenticaion, fetchChats);

module.exports = router;
