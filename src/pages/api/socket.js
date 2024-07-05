import { Server } from "socket.io";

const handler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io server");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  } else {
    console.log("Socket.io server already initialized");
  }
  res.end();
};

export default handler;
