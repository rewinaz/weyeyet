import { Socket } from "socket.io";

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  origin: "http://localhost:3000",
});

const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const socketToEmailMapping: Map<string, string> = new Map();
const socketToRoomMapping: Map<string, string> = new Map();

io.on("connection", (socket: Socket) => {
  console.log("====================================");
  console.log("SOCKET CONNECTED");

  socket.on("room:created", ({ roomId, email }: any) => {
    console.log("SOCKET ROOM CREATED", roomId, " ", socket.id);

    if (roomId && email) {
      socket.join(roomId);
      socketToEmailMapping.set(socket.id, email);
      socketToRoomMapping.set(socket.id, roomId);
    }
  });

  socket.on("room:joined", async ({ roomId, email }: any) => {
    console.log("SOCKET ROOM JOINED", roomId, " - ", socket.id);
    if (roomId && email) {
      socket.join(roomId);
      socketToEmailMapping.set(socket.id, email);
      socketToRoomMapping.set(socket.id, roomId);

      socket.broadcast.to(roomId).emit("user:joined", { email });

      // Send the previous users to the new user
      //       const prevUsers = Array.from(roomToEmailMapping.get(roomId) || []).filter(
      //         (userEmail) => userEmail !== email
      //       );
      let usersInRoom: Set<string> = await io.sockets.adapter.rooms.get(roomId);

      let prevUsers: string[] = [];
      for (const user of usersInRoom) {
        if (user !== socket.id) {
          if (socketToEmailMapping.get(user))
            prevUsers.push(socketToEmailMapping.get(user)!);
        }
      }

      console.log("PREV USERS", prevUsers);

      socket.emit("previous:users", { emails: [...prevUsers], room: roomId });
    }
  });

  socket.on("disconnect", () => {});
});

server.listen(3002, () => console.log("Server started on 3002"));
