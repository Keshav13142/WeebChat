const express = require("express");
const authentication = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  sendMessage,
  fetchMessages,
} = require("../controllers/messageController.js");

router
  .route("/:chatId")
  .get(authentication, fetchMessages)
  .post(authentication, sendMessage);

module.exports = router;
