"use client";
import React, { useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";
import PeerVideo from "./PeerVideo";

type Props = {
  //   localStream: MediaStream | null;
  //   remoteStreams: any;
};

const PeerVideosWrapper = ({}: Props) => {
  //   useEffect(() => {
  //     console.log("VideoComponents.tsx: remoteStreams", remoteStreams);
  //   }, [remoteStreams]);
  return (
    // <div className=" bg-white-600 w-full flex-1 py-10 px-28 grid grid-cols-4 gap-2">
    <Grid item container spacing={3} className=" w-11/12 m-auto">
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} height={300}>
        <PeerVideo key={uuid()} stream={""} muted={true} />
      </Grid>

      {/* {remoteStreams && (
		  <>
          {remoteStreams.map((remoteStream: { email: string; stream: any }) => (
			  <VideoComponent key={uuid()} stream={remoteStream.stream} />
			  ))}
			  </>
			)} */}
      {/* </div> */}
    </Grid>
  );
};

export default PeerVideosWrapper;
