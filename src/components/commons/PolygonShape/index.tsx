import React, { forwardRef } from "react";
import { Box, BoxProps, styled } from "@mui/material";

import { PolygonWhiteIconUrl } from "src/commons/resources";

const PolygonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
  width: 220,
  height: 220,
  boxSizing: "border-box",
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "19px",
  textAlign: "center",
  color: theme.palette.secondary.main,
  padding: "40px 40px 50px",
  backgroundImage: `url(${PolygonWhiteIconUrl})`,
  backgroundSize: "contain",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat"
}));

export const PolygonShape: React.FC<BoxProps> = forwardRef(({ children, ...props }, boxRef) => {
  return (
    <PolygonBox {...props} ref={boxRef}>
      {children}
    </PolygonBox>
  );
});

PolygonShape.displayName = "PolygonShape";

export default PolygonShape;
