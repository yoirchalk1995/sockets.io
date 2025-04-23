const express = require("express");
const { Server } = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = [];
let userNumber = 1;

app.use(express.static(path.join(__dirname, "public")));

app.get("/privateMsg", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "privateMsg.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("your_id", socket.id);

  socket.on("sendMessage", ({ targetId, message }) => {
    console.log(`${message}   ${targetId}`);

    console.log(`Message from ${socket.id} to ${targetId}: ${message}`);

    io.to(targetId).emit("private_message", {
      from: socket.id,
      message: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
