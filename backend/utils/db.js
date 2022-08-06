const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = getConnection;
