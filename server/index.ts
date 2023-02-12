import { Request, Response, Express } from "express";
import { Socket } from "socket.io";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const webrtc = require("wrtc");

const app: Express = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  origin: "http://localhost:3000",
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

const emailToPeerMapping: Map<string, any> = new Map();
const emailToStreamMapping: Map<string, any> = new Map();
const roomToEmailMapping: Map<string, Set<string>> = new Map();
// const socketToEmailMapping: Map<string, string> = new Map();
// const socketToRoomMapping: Map<string, string> = new Map();

function handleTrackEvent(e: any, peer: any, email: string) {
  console.log("====================================");
  console.log("STREAM RECIEVED");
  const senderStream = e.streams[0];

  emailToStreamMapping.set(email, senderStream);
  console.log("====================================");
  console.log("EMAIL TO STREAM MAPPING", emailToStreamMapping);
  console.log("====================================");
}

const createPeer = async (email: string, roomId: string, offer: any) => {
  const peer: any = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });
  try {
    peer.ontrack = (e: any) => handleTrackEvent(e, peer, email);
    const desc = new webrtc.RTCSessionDescription(offer);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    //store room to email mapping
    const roomMembers = roomToEmailMapping.get(roomId);
    if (roomMembers) {
      roomMembers.add(email);
      roomToEmailMapping.set(roomId, roomMembers);
    } else {
      roomToEmailMapping.set(roomId, new Set([email]));
    }
    // Store the peer in the map
    emailToPeerMapping.set(email, peer);
  } catch (error) {
    console.log("====================================");
    console.log("ERROR", error);
  }
  return peer;
};

app.post("/api/v1/create-room", async (req: Request, res: Response) => {
  const { offer, email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  if (!offer) return res.status(400).json({ error: "Offer is required" });

  const roomId = uuidv4();

  try {
    const peer = await createPeer(email, roomId, offer);
    res.status(200).json({ answer: peer.localDescription, roomId });
  } catch (error) {
    console.log("====================================");
    console.log("ERROR", error);
    res.status(500).json({ error });
  }
});

app.post<{ roomId: string }>(
  "/api/v1/join-room/:roomId",
  async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const { email, offer } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!offer) return res.status(400).json({ error: "Offer is required" });
    if (!roomId) return res.status(400).json({ error: "Room Id is required" });
    if (!roomToEmailMapping.has(roomId))
      return res.status(400).json({ error: "Room does not exist" });
    if (roomToEmailMapping.get(roomId)?.has(email))
      return res.status(400).json({ error: "User already in room" });

    try {
      const peer = await createPeer(email, roomId, offer);
      res.status(200).json({ answer: peer.localDescription, roomId });
    } catch (error) {
      console.log("====================================");
      console.log("ERROR", error);
      res.status(500).json({ error });
    }
  }
);

app.post<{ roomId: string }>(
  "/api/v1/get-transciver/:roomId",
  async (req: Request, res: Response) => {
    console.log("GET TREANSCIVER");

    const { roomId } = req.params;
    const { email, offer, peerEmail } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!roomId) return res.status(400).json({ error: "Room Id is required" });
    if (!roomToEmailMapping.has(roomId))
      return res.status(400).json({ error: "Room does not exist" });
    if (!roomToEmailMapping.get(roomId)?.has(email))
      return res.status(400).json({ error: "User not in room" });
    if (!roomToEmailMapping.get(roomId)?.has(peerEmail))
      return res.status(400).json({ error: "Peer not in room" });

    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    const desc = new webrtc.RTCSessionDescription(offer);
    try {
      await peer.setRemoteDescription(desc);
      const peerStream = emailToStreamMapping.get(peerEmail);
      if (peerStream) {
        peerStream.getTracks().forEach((track: any) => {
          peer.addTrack(track, peerStream);
        });
      }
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      res.status(200).json({ answer: peer.localDescription });
    } catch (error) {
      console.log("====================================");
      console.log("ERROR", error);
      res.status(500).json({ error });
    }
  }
);

// app.post("/api/v1/leave-room/:roomId", (req: Request, res: Response) => {});

// io.on("connection", (socket: Socket) => {
//   console.log("====================================");
//   console.log("SOCKET CONNECTED");

//   socket.on("room:joined", async ({ roomId, email }: any) => {
//     console.log("SOCKET ROOM JOINED", roomId);

//     if (
//       roomId &&
//       email &&
//       roomToEmailMapping.has(roomId) &&
//       !socketToRoomMapping.has(socket.id)
//     ) {
//       socket.join(roomId);
//       socketToEmailMapping.set(socket.id, email);
//       socketToRoomMapping.set(socket.id, roomId);

//       // socket.emit("user:joined", { email });
//       socket.broadcast.to(roomId).emit("user:joined", { email });
//       // Send the previous users to the new user
//       const prevUsers = Array.from(roomToEmailMapping.get(roomId) || []).filter(
//         (userEmail) => userEmail !== email
//       );
//       console.log("PREV USERS", prevUsers);

//       socket.emit("previous:users", { emails: [...prevUsers] });
//     }
//   });

//   socket.on("disconnect", () => {
//     const email = socketToEmailMapping.get(socket.id);
//     if (email) {
//       emailToPeerMapping.delete(email);
//       emailToStreamMapping.delete(email);
//       socketToEmailMapping.delete(socket.id);

//       // Remove the email from the room
//       const roomId = socketToRoomMapping.get(socket.id);
//       if (roomId) {
//         const roomMembers = roomToEmailMapping.get(roomId);
//         if (roomMembers) {
//           roomMembers.delete(email);
//           roomToEmailMapping.set(roomId, roomMembers);
//         }
//         socketToRoomMapping.delete(socket.id);
//         // Leave the room
//         socket.leave(roomId);
//         socket.broadcast.to(roomId).emit("user:left", { email });
//       }
//     }
//   });
// });

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
