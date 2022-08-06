const jwt = require("jsonwebtoken");
const Session = require("../models/sessionModel");

const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  await Session.create({
    user_id: id,
    token,
  });
  return token;
};

module.exports = generateToken;
