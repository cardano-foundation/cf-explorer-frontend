import React, { forwardRef } from "react";
import { BoxProps, styled } from "@mui/material";

import { AdaHolderIconUrl } from "src/commons/resources";
import { formatADAFull } from "src/commons/utils/helper";

import { AdaHolderImage, AdaHolderValue, StyledAdaLogoIcon } from "./styles";
import PolygonShape from "../PolygonShape";

const StyledPolygonShape = styled(PolygonShape)(() => ({
  margin: "0px -13px"
}));

export interface IAdaHolderProps extends BoxProps {
  value?: number;
}

export const AdaHolder: React.FC<IAdaHolderProps> = forwardRef(({ value, ...props }, boxRef) => {
  return (
    <StyledPolygonShape {...props} ref={boxRef}>
      <AdaHolderImage src={AdaHolderIconUrl} alt="AdaHolderIconUrl" />
      ADA Holder
      {value && (
        <AdaHolderValue>
          {formatADAFull(value)}
          <StyledAdaLogoIcon />
        </AdaHolderValue>
      )}
    </StyledPolygonShape>
  );
});

AdaHolder.displayName = "AdaHolder";

export default AdaHolder;
