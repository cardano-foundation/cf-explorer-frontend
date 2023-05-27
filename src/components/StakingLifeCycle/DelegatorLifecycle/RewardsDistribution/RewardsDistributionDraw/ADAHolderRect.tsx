import React from "react";
import { DisableAbleLabel, FacingImg, RectBox } from "./styles";
import { AdaHolderIconUrl } from "~/commons/resources";

const ADAHolderRect = () => {
  return (
    <RectBox>
      <FacingImg src={AdaHolderIconUrl} />
      <DisableAbleLabel>ADA Holder</DisableAbleLabel>
    </RectBox>
  );
};

export default ADAHolderRect;
