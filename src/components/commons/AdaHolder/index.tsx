import React, { forwardRef } from "react";
import { BoxProps } from "@mui/material";

import { AdaHolderIconUrl } from "src/commons/resources";
import { formatADAFull } from "src/commons/utils/helper";

import { AdaHolderImage, AdaHolderValue, StyledAdaLogoIcon } from "./styles";
import PolygonShape from "../PolygonShape";

export interface IAdaHolderProps extends BoxProps {
  value?: number;
}

export const AdaHolder: React.FC<IAdaHolderProps> = forwardRef(({ value, ...props }, boxRef) => {
  return (
    <PolygonShape {...props} ref={boxRef}>
      <AdaHolderImage src={AdaHolderIconUrl} alt="AdaHolderIconUrl" />
      ADA Holder
      {value && (
        <AdaHolderValue>
          {formatADAFull(value)}
          <StyledAdaLogoIcon />
        </AdaHolderValue>
      )}
    </PolygonShape>
  );
});

AdaHolder.displayName = "AdaHolder";

export default AdaHolder;
