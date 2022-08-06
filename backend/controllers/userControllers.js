const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateJWT");

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

module.exports = { registerUser, loginUser };
