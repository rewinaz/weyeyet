"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import TextInput from "../components/ui/TextInput";
import CustomButton from "../components/ui/Button";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { RoomContext, RoomContextType } from "../contexts/RoomContext";
import { createRoom, getStream, joinRoom } from "../api/roomApi";
import { SocketContext } from "../contexts/SocketIoContext";

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

export default function Home() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { user, isLoading, loginWithPopup, logout } = useAuth0();
  const [joinRoomId, setJoinRoomId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const {
    setLocalStream,
    localPeer,
    room,
    setRoom,
    remotePeers,
    setRemotePeers,
    remoteStreams,
    setRemoteStreams,
  } = useContext<RoomContextType>(RoomContext);

  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);

      stream.getTracks().forEach((track) => {
        localPeer.addTrack(track, stream);
      });
    } catch (error) {
      console.log(error);
    }
  };

  localPeer.onnegotiationneeded = async () => {
    const offer = await localPeer.createOffer();
    await localPeer.setLocalDescription(offer);
    console.log("ON NEGOTIATION NEEDED");
    console.log("USER", email);

    const payload = {
      email: user?.email,
      offer: localPeer.localDescription,
    };
    const { data } = await joinRoom(room, payload);
    if (data) {
      localPeer.setRemoteDescription(data.answer);
      console.log("DATA", data);
      setRoom(data.roomId);
      socket.emit("room:joined", { roomId: data.roomId, email: user?.email });
    }
    return navigate(`/room/${data.roomId}`);
  };

  const onCreateRoomHandler = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        email: email,
      };
      const { data } = await createRoom(payload);
      if (data) {
        setRoom(data.roomId);
        socket.emit("room:created", { roomId: data.roomId });
        await getUserMedia();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onJoinRoomHandler = async (e: any) => {
    e.preventDefault();
    try {
      setRoom(joinRoomId);
      await getUserMedia();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      console.log("EMAIL", user.email);
      setEmail(user?.email);
    }
  }, [user]);

  // ? SOCKET IO
  useEffect(() => {
    socket.on("room:previous:users", async (users: string[]) => {
      for (const user of users) {
        const peer = new RTCPeerConnection(servers);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        const { data } = await getStream(room, { email: user, offer: offer });
        if (data) {
          peer.setRemoteDescription(data.answer);
          const stream = new MediaStream(data.stream);
          const userEmail: string = data.userEmail;

          // TODO Add stream to remote streams
          // TODO Add peer to remote peers
        }
      }
    });
  }, []);

  if (isLoading || !user || !user.email) {
    return (
      <div className=" h-screen flex justify-center items-center bg-bc-darkblue">
        <div className=" flex-col max-w-xl w-full">
          <div className="flex justify-between mb-4">
            <div>
              <p className=" text-white">Please login to continue</p>
            </div>
            <div>
              <Button variant="outlined" onClick={() => loginWithPopup()}>
                login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-screen flex justify-center items-center bg-bc-darkblue">
      <div className=" flex-col max-w-xl w-full">
        <div className="flex justify-between mb-4">
          <div>
            <img
              src={`${user?.picture}`}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className=" text-white">{user?.email}</p>
          </div>

          <div>
            {user ? (
              <Button variant="outlined" color="error" onClick={() => logout()}>
                logout
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => loginWithPopup()}>
                login
              </Button>
            )}
          </div>
        </div>

        <form
          onSubmit={onJoinRoomHandler}
          className="flex flex-col h-full w-full"
        >
          <p className="text-white">{room}</p>
          <p className="text-white">{joinRoomId}</p>
          <TextInput
            onInput={(e) => setJoinRoomId(e.trim())}
            placeholder={"Enter room id to join"}
            required={true}
            value={joinRoomId}
            className="bc-white mb-4 focus:ring-gray-500 focus:ring-2"
          />
          <CustomButton
            value="Join Room"
            type="submit"
            onSubmit={onJoinRoomHandler}
          />
        </form>
        <p className="text-white text-center my-3">OR</p>

        <form
          className="flex flex-col h-full w-full"
          onSubmit={onCreateRoomHandler}
        >
          <CustomButton value="Create Room" onClick={onCreateRoomHandler} />
        </form>
      </div>
    </div>
  );
}
