const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateJWT");
const Session = require("../models/sessionModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Mandatory feilds cannot be empty");
  }
  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("Email is already Registered");
  } else {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      pic,
    });
    if (user) {
      res.status(200).json({
        name,
        email,
        pic,
        token: await generateToken(user._id),
      });
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error("Invalid credentials");
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid Credentials");
    } else if (!(await bcrypt.compare(password, user.password))) {
      res.status(400);
      throw new Error("Invalid credentials");
    } else {
      res.status(200).json({
        name: user.name,
        email,
        pic: user.pic,
        token: await generateToken(user._id),
      });
    }
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  if (search) {
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).find({ _id: { $ne: req.user._id } });
    res.json(users);
  } else res.json([]);
});

const logout = asyncHandler(async (req, res) => {
  await Session.deleteMany({ user_id: req.user.id });
  res.status(200).json({ message: "Successfully logged out" });
});

module.exports = { registerUser, loginUser, searchUsers, logout };
