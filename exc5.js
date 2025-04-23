const express = require("express");
const { Server } = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/exc5", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exc5.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("roomSelected", (roomNumber) => {
    socket.join(roomNumber);
    console.log(`${socket.id} joined ${roomNumber}`);
  });

  socket.on("sendMsg", ({ roomNumber, text }) => {
    socket.to(roomNumber).emit("receiveMsg", { text, id: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
