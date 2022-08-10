const express = require("express");
const authenticaion = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  createGroup,
  renameGroup,
  leaveGroup,
  addUserToGroup,
  removeUser,
} = require("../controllers/groupController");

router.post("/", authenticaion, createGroup);

router.put("/rename", authenticaion, renameGroup);

router.put("/leave", authenticaion, leaveGroup);

router.put("/remove", authenticaion, removeUser);

router.put("/adduser", authenticaion, addUserToGroup);

module.exports = router;
