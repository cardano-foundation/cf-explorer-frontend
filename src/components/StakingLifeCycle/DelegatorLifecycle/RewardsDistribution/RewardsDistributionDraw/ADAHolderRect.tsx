import React from "react";

import { AdaHolderIconUrl } from "src/commons/resources";

import { DisableAbleLabel, FacingImg, RectBox } from "./styles";

const ADAHolderRect = () => {
  return (
    <RectBox>
      <FacingImg src={AdaHolderIconUrl} />
      <DisableAbleLabel>ADA Holder</DisableAbleLabel>
    </RectBox>
  );
};

export default ADAHolderRect;
