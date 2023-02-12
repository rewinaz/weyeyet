import React from "react";
import {
  faVideo,
  faMicrophone,
  faVideoSlash,
  faMicrophoneSlash,
  faPhoneFlip,
  faSmile,
  faHand,
} from "@fortawesome/free-solid-svg-icons";
import CustomIconButton from "./CustomIconButton";

type Props = {};

const BottomBar = (props: Props) => {
  const iconColor = "#fff";

  return (
    <div className="h-24 flex items-center justify-center">
      <div className=" w-9/12 mx-auto py-3 rounded-xl flex items-center justify-center bg-slate-800">
        <CustomIconButton icon={faVideo} color={iconColor} onTap={() => {}} />
        <CustomIconButton
          icon={faMicrophone}
          color={iconColor}
          onTap={() => {}}
        />
        <CustomIconButton icon={faSmile} color={iconColor} onTap={() => {}} />
        <CustomIconButton icon={faHand} color={iconColor} onTap={() => {}} />
        <CustomIconButton
          icon={faPhoneFlip}
          color={"#d11717"}
          onTap={() => {}}
        />
      </div>
    </div>
  );
};

export default BottomBar;
