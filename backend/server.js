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

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //To connect user to their individual socket
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  //To create a new socket room for selected chat
  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log("User connected to " + chatId);
  });

  //@TODO/Feature -- for typing indicator
  // socket.on("typing", (chatId) => {
  //   socket.in(chatId).emit("typing");
  // });

  // socket.on("stopped typing", (chatId) => {
  //   socket.in(chatId).emit("stopped typing");
  // });

  //For sending real-time messages
  socket.on("new message", (message) => {
    //get the chat object from the message
    const { chat } = message;

    //Check if there are users in the chat
    if (!chat.users) {
      console.log("chat.users are not defined");
      return;
    }

    //Emit a message to all other users in the chat except the sender
    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;

      socket.in(user._id).emit("message received", message);
    });
  });

  //Cleanup socket
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
