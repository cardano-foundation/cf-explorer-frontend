import React, { forwardRef } from "react";
import { BoxProps } from "@mui/material";

import { SPOHolderIconUrl } from "src/commons/resources";

import { DisableAbleLabel, FacingImg, RectBox } from "./styles";

export interface Props extends BoxProps {
  disabled?: boolean;
}
const ADAOperatorRewardRect: React.FC<Props> = forwardRef(({ disabled, ...props }, boxRef) => {
  return (
    <RectBox disabled={+!!disabled} {...props} ref={boxRef}>
      <FacingImg src={SPOHolderIconUrl} />
      <DisableAbleLabel disabled={+!!disabled}>Operator Reward (SPO)</DisableAbleLabel>
    </RectBox>
  );
});

ADAOperatorRewardRect.displayName = "ADAOperatorRewardRect";

export default ADAOperatorRewardRect;
