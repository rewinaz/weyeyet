import { Inter } from "@next/font/google";
import { useCallback, useContext, useEffect, useState } from "react";
import VideoComponents from "@/components/VideoComponents";
import axios, { AxiosResponse } from "axios";
import { SocketContext } from "@/contexts/SocketIoContext";
import { Socket } from "socket.io-client";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [roomId, setRoomId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [joinedRoom, setJoinedRoom] = useState<string>("");
  const [outputPeer, setOutputPeer] = useState<RTCPeerConnection | null>(null);

  const [inputPeers, setInputPeers] = useState<
    {
      email: string;
      peer: RTCPeerConnection;
    }[]
  >([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<
    { email: string; stream: any }[]
  >([]);

  const socket = useContext(SocketContext) as Socket;

  const axiosConfig = {
    baseURL: "http://localhost:3001/api/v1",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleNegotiationNeededEvent = async (
    peer: RTCPeerConnection,
    context: "create" | "join"
  ) => {
    console.log("NEGOTIATION NEEDED");

    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      const payload = {
        email,
        offer: peer.localDescription,
      };

      if (context === "create") {
        const { data } = await axios.post("/create-room", payload, axiosConfig);
        const desc = new RTCSessionDescription(data.answer);
        peer.setRemoteDescription(desc);
        socket.emit("room:created", { roomId: data.roomId, email });
        setJoinedRoom(data.roomId);
      } else if (context === "join") {
        const { data } = await axios.post(
          `/join-room/${roomId}`,
          payload,
          axiosConfig
        );
        const desc = new RTCSessionDescription(data.answer);
        peer.setRemoteDescription(desc);
        socket.emit("room:joined", { roomId: data.roomId, email });
        setJoinedRoom(data.roomId);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const handleRecieverTransciverNegotiationNeededEvent = async (
    peer: RTCPeerConnection,
    peerEmail: string,
    room: string
  ) => {
    console.log("TRANSCIEVER NEGOTIATION NEEDED");

    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      const payload = {
        email,
        offer: peer.localDescription,
        peerEmail,
      };

      const { data } = await axios.post(
        `/get-transciver/${room}`,
        payload,
        axiosConfig
      );

      const desc = new RTCSessionDescription(data.answer);
      peer.setRemoteDescription(desc);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleTrackEvent = (event: any, email: string) => {
    console.log("HANDLE TRACK EVENT");
    remoteStreams.push({ email, stream: event.streams[0] });
    setRemoteStreams([...remoteStreams]);
  };

  const createPeer = (context: "create" | "join") => {
    console.log("CREATE PEER");
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
    peer.onnegotiationneeded = () =>
      handleNegotiationNeededEvent(peer, context);

    return peer;
  };

  const getUserMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return stream;
  };

  const sendMyStream = async (context: "create" | "join") => {
    const stream = await getUserMediaStream();
    const peerConnection = createPeer(context);

    if (peerConnection) {
      setLocalStream(stream);
      stream.getTracks().forEach((track: any) => {
        peerConnection.addTrack(track, stream);
      });
    }
    setOutputPeer(peerConnection);
  };

  const createTransceiverPeerConnection = (peerEmail: string, room: string) => {
    console.log("CREATE TRANSCEIVER PEER");
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
    peer.ontrack = (e) => handleTrackEvent(e, peerEmail);
    peer.addTransceiver("video", { direction: "recvonly" });
    peer.onnegotiationneeded = () =>
      handleRecieverTransciverNegotiationNeededEvent(peer, peerEmail, room);

    return peer;
  };

  const handleCall = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMyStream("create");
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMyStream("join");
  };

  const onUserJoined = useCallback(({ email }: any) => {
    console.log("ROOM JOINED", email);
    console.log("USER JOINED", joinedRoom);
    const peerConnection = createTransceiverPeerConnection(email, joinedRoom);
    setInputPeers([...inputPeers, { email: email, peer: peerConnection }]);
  }, []);

  const onUserLeft = useCallback(({ email }: any) => {
    console.log("USER LEFT", email);
    if (inputPeers) {
      const filteredPeers = inputPeers.filter((peer) => peer.email !== email);
      const filteredStreams = remoteStreams.filter(
        (stream) => stream.email !== email
      );

      setInputPeers([...filteredPeers]);
      setRemoteStreams([...filteredStreams]);
    }
  }, []);

  const onPreviousUsers = useCallback(({ emails, room }: any) => {
    console.log("PREVIOUS USERS", emails);
    console.log("PREVIOUS USERS", joinedRoom);
    console.log("PREVIOUS USERS", email);
    if (emails) {
      emails.forEach((user: any) => {
        const peerConnection = createTransceiverPeerConnection(user, room);
        setInputPeers([...inputPeers, { email: user, peer: peerConnection }]);
      });
    }
  }, []);

  useEffect(() => {
    socket.on("user:joined", onUserJoined);
    socket.on("user:left", onUserLeft);
    socket.on("previous:users", onPreviousUsers);

    return () => {
      socket.off("user:joined");
      socket.off("user:left");
      socket.off("previous:users");
    };
  }, [socket, joinedRoom, email, inputPeers, remoteStreams]);

  useEffect(() => {
    console.log("JOINED ROOM ::", joinedRoom);
  }, [joinedRoom]);

  return (
    <div className=" h-full flex justify-center items-center">
      <div className=" flex-col">
        <p>{joinedRoom}</p>
        <button
          className=" px-4 py-2 mb-4 bg-slate-800 text-white rounded-full"
          onClick={handleCall}
        >
          Create Call
        </button>

        <form onSubmit={handleJoinRoom}>
          <input
            className=" border-slate-600 outline-2 outline-slate-700"
            type="text"
            placeholder="place link"
            required
            value={roomId}
            onInput={(e) => {
              setRoomId(e.currentTarget.value);
            }}
          />
          <input
            className=" border-slate-600 outline-2 outline-slate-700"
            type="email"
            placeholder="place email"
            required
            value={email}
            onInput={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <button
            type="submit"
            className=" px-4 py-2 mb-4 bg-slate-800 text-white rounded-full"
            onSubmit={handleJoinRoom}
          >
            Join Call
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full h-screen">
        <VideoComponents
          localStream={localStream}
          remoteStreams={remoteStreams}
        />
      </div>
    </div>
  );
}
