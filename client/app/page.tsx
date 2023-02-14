"use client";

import { Inter } from "@next/font/google";
import {
  useEffect,
  useState,
} from "react";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [roomId, setRoomId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [joinedRoom, setJoinedRoom] = useState<string>("");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<
    { email: string; stream: any }[]
  >([]);

  // Constants
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const onCreateRoomHandler = (e: any) => {
    e.preventDefault();
    if (!user) {
      window.location.assign("/api/auth/login");
    } else if (user) {
      router.push("/room");
    }
  };

  const onJoinRoomHandler = (e: any) => {
    e.preventDefault();
    if (!user) {
      window.location.assign("/api/auth/login");
    } else if (user) {
      router.push("/room");
    }
  };

  useEffect(() => {
    console.log("USER :: ", user);
  }, [user]);

  return (
    <div className=" h-screen flex justify-center items-center bg-bc-darkblue">
      <div className=" flex-col max-w-xl w-full">
        {user && (
          <Image
            src={`${user?.picture}`}
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        <p className=" text-white">{user?.email}</p>
        <a href="/api/auth/login" className="text-white">
          login
        </a>
        <a href="/api/auth/logout" className="text-white">
          logout
        </a>
        <form
          onSubmit={onJoinRoomHandler}
          className="flex flex-col h-full max-w-lg w-full mx-auto"
        >
          <TextInput
            onInput={setRoomId}
            placeholder={"Enter room id to join"}
            required={true}
            value={roomId}
            className="bc-white mb-4 focus:ring-gray-500 focus:ring-2"
          />
          <Button
            value="Join Room"
            type="submit"
            onSubmit={onJoinRoomHandler}
          />
        </form>
        <p className="text-white text-center my-3">OR</p>

        <form
          className="flex flex-col h-full max-w-lg w-full mx-auto"
          onSubmit={onCreateRoomHandler}
        >
          <Button value="Create Room" onClick={onCreateRoomHandler} />
        </form>
      </div>
    </div>
  );
}
