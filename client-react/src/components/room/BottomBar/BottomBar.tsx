"use client";
import React from "react";
import BottomBarButton from "./BottomBarButton";
import {
  CallEnd,
  PanToolOutlined,
  SentimentSatisfiedAltSharp,
  VideocamOutlined,
  MicOutlined,
  MessageOutlined,
} from "@mui/icons-material";

type Props = {};

const BottomBar = (props: Props) => {
  return (
    <div className="flex justify-center text-white">
      <BottomBarButton
        color="inherit"
        MaterialIcon={PanToolOutlined}
        onClick={() => {
          
        }}
      />
      <BottomBarButton
        color="inherit"
        MaterialIcon={SentimentSatisfiedAltSharp}
        onClick={() => {}}
      />
      <BottomBarButton
        color="inherit"
        MaterialIcon={MessageOutlined}
        onClick={() => {}}
      />
      <BottomBarButton
        color="inherit"
        MaterialIcon={VideocamOutlined}
        onClick={() => {}}
      />
      <BottomBarButton
        color="inherit"
        MaterialIcon={MicOutlined}
        onClick={() => {}}
      />
      <BottomBarButton
        color="error"
        MaterialIcon={CallEnd}
        onClick={() => {}}
      />
    </div>
  );
};

export default BottomBar;
