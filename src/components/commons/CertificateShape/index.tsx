import { Box, BoxProps, styled } from "@mui/material";
import React, { forwardRef } from "react";
import { CertificateIcon } from "~/commons/resources";
import CustomIcon from "../CustomIcon";

const CertificateBox = styled(Box)(({ theme }) => ({
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
  color: theme.palette.common.black,
  background: theme.palette.common.white,
  padding: 20,
  borderRadius: 12,
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.03)",
  cursor: "pointer"
}));

const StyledImage = styled("img")(() => ({
  width: 100,
  height: 100,
  aspectRatio: 1
}));

export const CertificateShape: React.FC<BoxProps> = forwardRef(({ children, ...props }, boxRef) => {
  return (
    <CertificateBox {...props} ref={boxRef}>
      <CustomIcon icon={CertificateIcon} height={100} />
      {children}
    </CertificateBox>
  );
});

CertificateShape.displayName = "CertificateShape";

export default CertificateShape;
