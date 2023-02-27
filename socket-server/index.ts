import { Socket } from "socket.io";

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  origin: "http://localhost:3000",
});
const cors = require("cors");
const RoomSchema = require("./models/room");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

io.on("connection", (socket: Socket) => {
  console.log("====================================");
  console.log("SOCKET CONNECTED");

  socket.on("room:created", ({ roomId }: any) => {
    console.log("SOCKET ROOM CREATED", roomId, " ", socket.id);
    if (roomId) {
      socket.join(roomId);
    }
  });

  socket.on("room:joined", async ({ roomId, email }: any) => {
    console.log("SOCKET ROOM JOINED", roomId, " - ", socket.id);
    if (roomId && email) {
      socket.join(roomId);

      try {
        const room = await RoomSchema.findById(roomId);

        // SENDING Room members to the new user
        const users = room.streams
          .map((stream: any) => stream.get("email"))
          .filter((email: string) => email !== email);
        socket.emit("room:previous:users", { users: users });

        socket.broadcast.to(roomId).emit("room:new:user", { email });
      } catch (err) {
        console.log(err);
      }

      // TODO SEND THE STREAMS TO THE NEW USER
      // const filteredStreams = room.streams.filter(
      //   (stream: any) => stream.get("email") !== email
      // );
      // socket.broadcast
      //   .to(roomId)
      //   .emit("user:joined", { email, streams: filteredStreams });

      // Send the previous users to the new user
      // let usersInRoom: Set<string> = await io.sockets.adapter.rooms.get(roomId);

      // console.log("PREV USERS", prevUsers);

      // socket.emit("previous:users", { emails: [...prevUsers], room: roomId });
    }
  });

  socket.on("disconnect", () => {});
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
server.listen(3002, () => console.log("Server started on 3002"));
