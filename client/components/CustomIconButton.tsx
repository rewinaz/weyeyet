// import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";
import { MouseEventHandler } from "react";
import { useState } from "react";

type OtherProps = { onTap: MouseEventHandler<HTMLDivElement> };

type Props = FontAwesomeIconProps & OtherProps;

const CustomIconButton = ({ onTap, ...iconProperties }: Props) => {
  return (
    <div
      className=" w-12 h-12 rounded-full flex mx-1 justify-center items-center cursor-pointer bg-slate-700 hover:bg-slate-600"
      onClick={onTap}
    >
      <FontAwesomeIcon  size="lg" {...iconProperties}  />
    </div>
  );
};

export default CustomIconButton;
