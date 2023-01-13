const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { chatId } = req.params;
  if (!content || !chatId || content.length === 0 || chatId.length === 0) {
    res.send(401);
    throw new Error("Invalid Message");
  }

  let message = await Message.create({
    chat: chatId,
    content,
    sender: req.user._id,
  });

  await Chat.findByIdAndUpdate(
    chatId,
    { latestMessage: message },
    { new: true }
  );

  message = await message.populate("sender", "-password");

  message = await message.populate("chat");

  message = await User.populate(message, {
    path: "chat.users",
    select: "name email pic",
  });

  message = await Message.populate(message, {
    path: "chat.latestMessage",
    select: "content sender",
  });

  res.json(message);
});

const fetchMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const message = await Message.find({ chat: chatId }).populate(
    "sender",
    "-password"
  );
  res.json(message);
});

module.exports = { sendMessage, fetchMessages };
