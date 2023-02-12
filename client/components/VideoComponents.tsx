import React, { useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import VideoComponent from "./VideoComponent";

type Props = {
  localStream: MediaStream | null;
  remoteStreams: any;
};

const VideoComponents = ({ localStream, remoteStreams }: Props) => {
  useEffect(() => {
    console.log("VideoComponents.tsx: remoteStreams", remoteStreams);
  }, [remoteStreams]);
  return (
    <div className=" bg-white-600 w-full flex-1 py-10 px-28 grid grid-cols-4 gap-2">
      {localStream && (
        <VideoComponent key={uuid()} stream={localStream} muted={true} />
      )}
      {remoteStreams && (
        <>
          {remoteStreams.map((remoteStream: { email: string; stream: any }) => (
            <VideoComponent key={uuid()} stream={remoteStream.stream} />
          ))}
        </>
      )}
    </div>
  );
};

export default VideoComponents;
