"use client";
import React from "react";
import {
  IconButton,
  IconButtonPropsColorOverrides,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type MaterialIconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

type Props = {
  MaterialIcon: MaterialIconType;
  color?:
    | "default"
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "info";
  onClick: Function;
};

const ButtomBarButton = ({
  MaterialIcon,
  color = "default",
  onClick,
}: Props) => {
  return (
    <IconButton
      color={color}
      size="large"
      onClick={() => onClick()}
      className="bg-bc-m-darkblue mx-1 my-4 transition-colors"
    >
      {<MaterialIcon />}
    </IconButton>
  );
};

export default ButtomBarButton;
