import { Box, styled } from "@mui/material";

import CertificateShape from "src/components/commons/CertificateShape";
import FeeBox from "src/components/commons/FeeBox";
import HoldBox from "src/components/commons/HoldBox";

export const DrawContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: "max-content",
  position: "relative",
  marginTop: 35,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    maxWidth: 540,
    minWidth: 540
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320,
    minWidth: 320
  }
}));

export const MiddleGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "max-content",
  flexDirection: "column",
  gap: 25,
  marginTop: 18,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row-reverse",
    maxWidth: 536,
    paddingTop: 46,
    paddingBottom: 35,
    gap: 30
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320,
    minWidth: 320,
    gap: 6
  }
}));

export const StyledCertificateShape = styled(CertificateShape)(({ theme }) => ({
  width: 220,
  height: 220,
  margin: "auto",
  border: `2px solid ${theme.palette.border.block}`,
  color: theme.palette.grey[400],
  [theme.breakpoints.down("lg")]: {
    height: 199,
    width: 180
  },
  [theme.breakpoints.down("sm")]: {
    width: 140,
    height: 199
  }
}));

export const BoxGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 50,
  width: "max-content",
  margin: "auto",
  height: 128,
  alignItems: "space-between",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    gap: 30,
    margin: 0,
    justifyContent: "space-between",
    height: 199,
    width: 300
  },
  [theme.breakpoints.down("sm")]: {
    gap: 33
  }
}));

export const StyledFreeBox = styled(FeeBox)(({ theme }) => ({
  alignSelf: "flex-end",
  width: 180,
  height: 70,
  boxSizing: "border-box",
  [theme.breakpoints.down("lg")]: {
    alignSelf: "flex-start"
  }
}));

export const StyledWithHoldBox = styled(HoldBox)(({ theme }) => ({
  border: `2px solid ${theme.palette.green[200]} `,
  boxSizing: "border-box",
  height: 70,
  width: 180,
  "&:after": {
    backgroundColor: theme.palette.green[200]
  },
  [theme.breakpoints.down("lg")]: {
    alignSelf: "flex-end"
  }
}));
