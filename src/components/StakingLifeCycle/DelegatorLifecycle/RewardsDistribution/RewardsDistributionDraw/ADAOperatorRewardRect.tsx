import React from "react";
import { DisableAbleLabel, FacingImg, RectBox } from "./styles";
import { InfoIcon, SPOHolderIconUrl } from "~/commons/resources";
import { Box } from "@mui/material";
export interface IADAOperatorRewardRectProps {
  disabled?: boolean;
}
const ADAOperatorRewardRect: React.FC<IADAOperatorRewardRectProps> = ({ disabled }) => {
  return (
    <RectBox disabled={+Boolean(disabled)}>
      <FacingImg src={SPOHolderIconUrl} />
      <DisableAbleLabel disabled={+Boolean(disabled)}>Operator Reward (SPO)</DisableAbleLabel>
      <Box>{disabled && <InfoIcon />}</Box>
    </RectBox>
  );
};

export default ADAOperatorRewardRect;
