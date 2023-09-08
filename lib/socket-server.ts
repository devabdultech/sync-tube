import { Server, Socket } from "socket.io";

export default function setupSocketServer(server: any) {
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}
