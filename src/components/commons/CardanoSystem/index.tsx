import { BoxProps } from "@mui/material";
import React, { forwardRef } from "react";

import { CardanoSystemIcon } from "src/commons/resources";

import PolygonShape from "../PolygonShape";
import CustomIcon from "../CustomIcon";

export const CardanoSystem: React.FC<BoxProps> = forwardRef(({ ...props }, boxRef) => {
  return (
    <PolygonShape {...props} ref={boxRef}>
      <CustomIcon icon={CardanoSystemIcon} height={100} width={100} />
      Cardano Blockchain
    </PolygonShape>
  );
});

CardanoSystem.displayName = "CardanoSystem";

export default CardanoSystem;
