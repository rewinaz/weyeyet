"use client";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { clsx } from "clsx";
import React, { useState } from "react";

type MaterialIconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

type Props = {
  MaterialIcon: MaterialIconType;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const SideBarMenuButton = ({ MaterialIcon, onClick }: Props) => {
  return (
    //     clsx('classes', {
    //     'classes classes1 classes2': cond1,
    //     '...': cond2 && cond3 && cond4
    // })

    <div
      className="bg-bc-s-darkblue hover:bg-bc-violet-500 h-14 w-14 flex items-center justify-center overflow-hidden transition-colors rounded-2xl cursor-pointer my-4 mx-4 p-2"
      onClick={(e) => {
        onClick(e);
      }}
    >
      {<MaterialIcon fontSize="large" />}
    </div>
  );
};

export default SideBarMenuButton;
