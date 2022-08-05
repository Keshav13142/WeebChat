const express = require("express");
const app = express();
require("dotenv").config();
const chats = require("./data/dummydata");

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/chats", (req, res) => {
  res.json(chats);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
