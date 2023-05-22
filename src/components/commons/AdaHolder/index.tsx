import { BoxProps, styled } from "@mui/material";
import React, { forwardRef } from "react";
import { AdaHolderIconUrl } from "~/commons/resources";
import PolygonShape from "../PolygonShape";

export const AdaHolderImage = styled("img")(() => ({
  width: 100,
  height: 100
}));

export const AdaHolder: React.FC<BoxProps> = forwardRef(({ children, ...props }, boxRef) => {
  return (
    <PolygonShape {...props} ref={boxRef}>
      <AdaHolderImage src={AdaHolderIconUrl} alt='AdaHolderIconUrl' />
      ADA Holder
    </PolygonShape>
  );
});

AdaHolder.displayName = "AdaHolder";

export default AdaHolder;
