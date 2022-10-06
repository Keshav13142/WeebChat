const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();
const chats = require("./data/dummydata");
const getConnection = require("./utils/db");
const { errorHandler, notFound } = require("./middlewares/errorHandlers");

getConnection();
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(cors());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/group", require("./routes/groupRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
