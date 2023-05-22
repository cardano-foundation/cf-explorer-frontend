import { BoxProps, styled, useTheme } from "@mui/material";
import React, { forwardRef } from "react";
import { AdaHolderIconUrl } from "~/commons/resources";
import PolygonShape from "../PolygonShape";
import { AdaHolderImage, AdaHolderValue } from "./styles";
import { formatADAFull } from "~/commons/utils/helper";
import ADAicon from "../ADAIcon";

export interface IAdaHolderProps extends BoxProps {
  value?: number;
}

export const AdaHolder: React.FC<IAdaHolderProps> = forwardRef(({ children, value, ...props }, boxRef) => {
  const theme = useTheme();
  return (
    <PolygonShape {...props} ref={boxRef}>
      <AdaHolderImage src={AdaHolderIconUrl} alt='AdaHolderIconUrl' />
      ADA Holder
      {value && (
        <AdaHolderValue>
          {formatADAFull(value)} <ADAicon style={{ color: theme.palette.grey[700] }} fontSize={14} />
        </AdaHolderValue>
      )}
    </PolygonShape>
  );
});

AdaHolder.displayName = "AdaHolder";

export default AdaHolder;
