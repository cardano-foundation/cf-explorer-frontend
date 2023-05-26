import { BoxProps } from "@mui/material";
import React, { forwardRef } from "react";
import { AdaHolderIconUrl } from "~/commons/resources";
import PolygonShape from "../PolygonShape";
import { AdaHolderImage, AdaHolderValue, StyledAdaLogoIcon } from "./styles";
import { formatADAFull } from "~/commons/utils/helper";

export interface IAdaHolderProps extends BoxProps {
  value?: number;
}

export const AdaHolder: React.FC<IAdaHolderProps> = forwardRef(({ children, value, ...props }, boxRef) => {
  return (
    <PolygonShape {...props} ref={boxRef}>
      <AdaHolderImage src={AdaHolderIconUrl} alt='AdaHolderIconUrl' />
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
