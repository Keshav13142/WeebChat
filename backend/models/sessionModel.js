const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
