"use client";

import React from "react";
import SideBarMenuButton from "./SideBarMenuButton";
import { DeleteOutlineOutlined, Search, ArrowBack } from "@mui/icons-material";
import { Divider } from "@mui/material";

type Props = {};

const SideBarMenu = (props: Props) => {
  return (
    <div className="h-screen box-border bg-bc-m-darkblue">
      <SideBarMenuButton MaterialIcon={ArrowBack} onClick={()=>{}}/>
      <Divider />
      <SideBarMenuButton MaterialIcon={DeleteOutlineOutlined} onClick={()=>{}}/>
      <SideBarMenuButton MaterialIcon={Search} onClick={()=>{}}/>
    </div>
  );
};

export default SideBarMenu;
