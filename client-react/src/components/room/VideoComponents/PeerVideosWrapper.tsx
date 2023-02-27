"use client";
import React, { useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";
import PeerVideo from "./PeerVideo";
import { RoomContextType, RoomContext } from "../../../contexts/RoomContext";
// import PeerConnection from "@/class/PeerConnection";

type Props = {};

{
  /* <Grid item xs={12} sm={6} md={4} height={300}>
            <PeerVideo key={uuid()} stream={""} muted={true} />
          </Grid> */
}

const PeerVideosWrapper = ({}: Props) => {
  const { localStream, remoteStreams } = useContext(RoomContext);
  return (
    <Grid item container spacing={3} className=" w-11/12 m-auto">
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={localStream} muted={true} />
      </Grid>
      {remoteStreams.map((remoteStream) => (
        <Grid item xs={12} sm={6} md={4} height={300}>
          <PeerVideo key={remoteStream.email} stream={remoteStream.stream} />
        </Grid>
      ))}
      {
        // peers.map(
        // (peer) =>
        // peer.getDirection() !== "both" && (
        // <Grid item xs={12} sm={6} md={4} height={300}>
        // <PeerVideo key={uuid()} stream={peer.getRemoteStream()} />
        // </Grid>
        // )
        // )
      }
      {/* {remoteStreams && (
		  <>
          {remoteStreams.map((remoteStream: { email: string; stream: any }) => (
			  <VideoComponent key={uuid()} stream={remoteStream.stream} />
			  ))}
			  </>
			)} */}
    </Grid>
  );
};

export default PeerVideosWrapper;
