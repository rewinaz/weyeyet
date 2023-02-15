"use client";

import React, { useEffect, useState } from "react";

type Props = {
  stream: any;
  muted?: boolean;
};

const VideoComponent = ({ stream, muted }: Props) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const getLocalStream = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setLocalStream(stream);
      });
  };

  useEffect(() => {
    // getLocalStream();
  }, []);
  return (
    <img
      className=" w-full h-full rounded-2xl border-2 object-cover bg-white "
      src={"../../../public/next.svg"}
      alt="stream"
    />
    // <video
    //   id="local"
    //   className=" w-full h-full rounded-2xl border-2 object-cover bg-white "
    //   ref={(video) => {
    //     if (video) video.srcObject = localStream;
    //   }}
    //   muted={muted}
    //   autoPlay
    //   playsInline
    // ></video>
  );
};

export default VideoComponent;
