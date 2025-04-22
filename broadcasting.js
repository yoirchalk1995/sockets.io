const express = require("express");
const { Server } = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/broadcasting", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "broadcasting.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendMessage", (msg) => {
    console.log(`message received from client with id ${socket.id}: ${msg}`);
    io.emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
