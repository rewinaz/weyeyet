"use client";

import { Inter } from "@next/font/google";
import { ButtonHTMLAttributes, FormEventHandler, useState } from "react";
import VideoComponents from "@/components/VideoComponents";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

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

  const onCreateRoomHandler: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] =
    (e) => {};

  const onJoinRoomHandler: FormEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <div className=" h-screen flex justify-center items-center bg-bc-darkblue">
      <div className=" flex-col max-w-xl w-full">
        <form
          onSubmit={() => {}}
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
          <p className="text-white text-center my-3">OR</p>
          <Button value="Create Room" onClick={onCreateRoomHandler} />
        </form>
      </div>
    </div>
  );
}
