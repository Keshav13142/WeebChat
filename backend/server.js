const express = require("express");
const app = express();
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

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/group", require("./routes/groupRoutes"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
