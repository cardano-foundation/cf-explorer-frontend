import { BoxProps, styled } from "@mui/material";
import React, { forwardRef } from "react";

import { CardanoSystemIcon } from "src/commons/resources";

import PolygonShape from "../PolygonShape";
import CustomIcon from "../CustomIcon";

const StyledPolygonShape = styled(PolygonShape)(() => ({
  padding: "40px 38px 50px",
  margin: "0px -13px"
}));

export const CardanoBlockchain: React.FC<BoxProps> = forwardRef(({ ...props }, boxRef) => {
  return (
    <StyledPolygonShape {...props} ref={boxRef}>
      <CustomIcon icon={CardanoSystemIcon} height={100} width={100} />
      Cardano Blockchain
    </StyledPolygonShape>
  );
});

CardanoBlockchain.displayName = "CardanoBlockchain";

export default CardanoBlockchain;
