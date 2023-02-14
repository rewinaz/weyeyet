"use client";
import React from "react";
import PeerVideosWrapper from "@/components/room/VideoComponents/PeerVideosWrapper";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex-1 h-screen flex flex-col">
      <div className="">Bar</div>
      <div className="w-full flex-1 overflow-y-scroll">
        <PeerVideosWrapper />
      </div>
      <div>Bar</div>
    </div>
  );
};

export default page;
