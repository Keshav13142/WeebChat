const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const createGroup = asyncHandler(async (req, res) => {
  const { users, chatName } = req.body;

  if (users.length < 2) {
    res.status(401);
    throw new Error("Group chats must have more than 2 members!!");
  }

  users.push(req.user);

  var chat = await Chat.create({
    isGroupChat: true,
    users: users,
    chatName,
    groupAdmin: await User.findOne({ _id: req.user._id }),
  });

  chat = await Chat.find({ _id: chat._id })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("groupAdmin", "-password");
  res.status(200).json(chat);
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const chat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName });
  if (chat) res.status(200).json({ chatName: chatName });
});

const leaveGroup = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  const chat = await Chat.updateOne(
    { _id: chatId },
    { $pullAll: { users: [{ _id: req.user._id }] } }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");
  if (chat) res.json(chat);
  else throw new Error("Chat not found!!!");
});

const addUserToGroup = asyncHandler(async (req, res) => {
  const { chatId, user } = req.body;
  const chat = await Chat.findByIdAndUpdate(chatId, {
    $addToSet: { users: user },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");
  if (chat) res.json(chat);
  else throw new Error("Chat not found!!!");
});

module.exports = { createGroup, renameGroup, leaveGroup, addUserToGroup };
