import React, { forwardRef } from "react";
import { BoxProps } from "@mui/material";

import { AdaHolderIconUrl } from "src/commons/resources";

import { DisableAbleLabel, FacingImg, RectBox } from "./styles";

const ADAHolderRect: React.FC<BoxProps> = forwardRef((props, boxRef) => {
  return (
    <RectBox {...props} ref={boxRef}>
      <FacingImg src={AdaHolderIconUrl} />
      <DisableAbleLabel>ADA Holder</DisableAbleLabel>
    </RectBox>
  );
});

ADAHolderRect.displayName = "ADAHolderRect";

export default ADAHolderRect;
