const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/exc4", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exc4.html"));
});

io.on("connection", (socket) => {
  socket.on("typing", () => {
    socket.broadcast.emit("isTyping", socket.id);
  });

  socket.on("endTyping", () => {
    socket.broadcast.emit("endTyping");
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
