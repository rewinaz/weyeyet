import PeerConnection from "../class/PeerConnection";
import { createContext, useState } from "react";
import axios from "axios";

const axiosConfig = {
  baseURL: "http://localhost:3001/api/v1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
};

export type RoomContextType = {
  room: string;
  setRoom: (room: string) => void;
  localStream: MediaStream;
  setLocalStream: (stream: MediaStream) => void;
  localPeer: RTCPeerConnection;
  setLocalPeer: (peer: RTCPeerConnection) => void;
  remoteStreams: { email: string; stream: MediaStream }[];
  setRemoteStreams: (streams: { email: string; stream: MediaStream }[]) => void;
  remotePeers: RTCPeerConnection[];
  setRemotePeers: (peers: RTCPeerConnection[]) => void;
};

export const RoomContext = createContext<RoomContextType>({
  room: "",
  setRoom: () => {},
  localStream: new MediaStream(),
  setLocalStream: () => {},
  localPeer: new RTCPeerConnection(),
  setLocalPeer: () => {},
  remoteStreams: [],
  setRemoteStreams: () => {},
  remotePeers: [],
  setRemotePeers: () => {},
});

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:global.stun.twilio.com:3478",
      ],
    },
  ],
};

const RoomProvider = (props: {} & React.PropsWithChildren) => {
  const [room, setRoom] = useState<string>("");
  const [localStream, setLocalStream] = useState<MediaStream>(
    new MediaStream()
  );
  const [localPeer, setLocalPeer] = useState<RTCPeerConnection>(
    new RTCPeerConnection(servers)
  );

  const [remotePeers, setRemotePeers] = useState<RTCPeerConnection[]>([]);

  const [remoteStreams, setRemoteStreams] = useState<
    { email: string; stream: MediaStream }[]
  >([]);

  return (
    <RoomContext.Provider
      value={{
        room,
        setRoom,
        localStream,
        setLocalStream,
        localPeer,
        setLocalPeer,
        remoteStreams,
        setRemoteStreams,
        remotePeers,
        setRemotePeers,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
