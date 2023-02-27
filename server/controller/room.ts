const { v4: uuidv4 } = require("uuid");
const webrtc = require("wrtc");
const mongo = require("mongoose");
const RoomSchema = require("../model/room");

async function handleTrackEvent(
  e: any,
  peer: any,
  email: string,
  roomId: string
) {
  console.log("====================================");
  console.log("STREAM RECIEVED", e.streams[0]);
  const senderStream = e.streams[0];

  const userStream = new Map();
  userStream.set("email", email);
  userStream.set("stream", senderStream);

  let room = await RoomSchema.findById(roomId);
  if (room) {
    const filteredStreams = room.streams.filter((stream: Map<string, any>) => {
      return stream.get("email") !== email;
    });

    room = await RoomSchema.findByIdAndUpdate(
      roomId,
      { streams: [...filteredStreams, userStream] },
      { new: true }
    );
    console.log("FILTERED STREAMS", room.streams);
    room = await room.save();
  }
}

const createPeer = async (email: string, offer: any, roomId: string) => {
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
    peer.ontrack = (e: any) => handleTrackEvent(e, peer, email, roomId);
    const desc = new webrtc.RTCSessionDescription(offer);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
  } catch (error) {
    console.log("====================================");
    console.log("ERROR", error);
  }
  return peer;
};

const createRoom = async (req: any, res: any) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });
  console.log("EMAIL", email);
  try {
    let room = new RoomSchema({ streams: [] });
    room = await room.save();

    res.status(200).json({ roomId: room._id });
  } catch (error) {
    console.log("====================================");
    console.log("ERROR", error);
  }
};

const joinRoom = async (req: any, res: any) => {
  const { email, offer } = req.body;
  const { id } = req.params;
  console.log("email", email);

  if (!email) return res.status(400).json({ error: "Email is required" });
  if (!id) return res.status(400).json({ error: "Room id is required" });
  if (!mongo.isValidObjectId(id))
    return res.status(400).json({ error: "Room id is invalid" });

  try {
    let room = await RoomSchema.findById(id);
    if (!room) return res.status(400).json({ error: "Room does not exist" });

    // geting users from room and adding new user
    const peer = await createPeer(email, offer, id);
    res
      .status(200)
      .json({ roomId: room._id, answer: peer.currentLocalDescription });
  } catch (error) {
    console.log("====================================");
    console.log("ERROR", error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const getStream = async (req: any, res: any) => {
  const { email, offer } = req.body;
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Room id is required" });
  if (!mongo.isValidObjectId(id))
    return res.status(400).json({ error: "Room id is invalid" });
  if (!email) return res.status(400).json({ error: "Email is required" });
  if (!offer) return res.status(400).json({ error: "Offer is required" });

  const room = await RoomSchema.findById(id);
  if (!room) return res.status(400).json({ error: "Room does not exist" });
  const filteredStreams = room.filter(
    (stream: Map<string, any>) => stream.get("email") === email
  );

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
    await peer.setRemoteDescription(offer);
    if (filteredStreams.length === 0)
      return res.status(400).json({ error: "No streams found" });
    filteredStreams[0].getTracks().forEach((track: any) => {
      peer.addTrack(track, filteredStreams);
    });
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    res.status(200).json({
      userEmail: email,
      answer: answer,
      stream: filteredStreams[0].stream,
    });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  createRoom,
  joinRoom,
  getStream,
};
