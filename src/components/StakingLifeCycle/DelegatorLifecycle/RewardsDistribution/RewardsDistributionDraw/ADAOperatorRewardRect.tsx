import React from "react";

import { SPOHolderIconUrl } from "src/commons/resources";

import { DisableAbleLabel, FacingImg, RectBox } from "./styles";

export interface IADAOperatorRewardRectProps {
  disabled?: boolean;
}
const ADAOperatorRewardRect: React.FC<IADAOperatorRewardRectProps> = ({ disabled }) => {
  return (
    <RectBox disabled={+Boolean(disabled)}>
      <FacingImg src={SPOHolderIconUrl} />
      <DisableAbleLabel disabled={+Boolean(disabled)}>Operator Reward (SPO)</DisableAbleLabel>
    </RectBox>
  );
};

export default ADAOperatorRewardRect;
