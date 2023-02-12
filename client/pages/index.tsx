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

  return (
    <div className=" h-full flex justify-center items-center">
      <div className=" flex-col">
        <p>{joinedRoom}</p>
        <button
          className=" px-4 py-2 mb-4 bg-slate-800 text-white rounded-full"
          onClick={() => {}}
        >
          Create Call
        </button>

        <form onSubmit={() => {}}>
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
            className="px-4 py-2 mb-4 bg-slate-800 text-white rounded-full"
            onSubmit={() => {}}
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
