import React from "react";

type Props = {
  stream: any;
  muted?: boolean;
};

const VideoComponent = ({ stream, muted }: Props) => {
  return (
    <video
      id="local"
      className=" w-full h-full rounded-2xl border-2 object-cover"
      ref={(video) => {
        if (video) video.srcObject = stream;
      }}
      muted={muted}
      autoPlay
      playsInline
    ></video>
  );
};

export default VideoComponent;
