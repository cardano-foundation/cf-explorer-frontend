import { BoxProps } from "@mui/material";
import React, { forwardRef } from "react";
import { CardanoSystemIcon } from "~/commons/resources";
import PolygonShape from "../PolygonShape";
import CustomIcon from "../CustomIcon";

export const CardanoSystem: React.FC<BoxProps> = forwardRef(({ children, ...props }, boxRef) => {
  return (
    <PolygonShape {...props} ref={boxRef}>
      <CustomIcon icon={CardanoSystemIcon} height={100} width={100} />
      Cardano System
    </PolygonShape>
  );
});

CardanoSystem.displayName = "CardanoSystem";

export default CardanoSystem;
