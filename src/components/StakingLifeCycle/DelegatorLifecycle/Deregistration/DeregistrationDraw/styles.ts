import { Box, styled } from "@mui/material";
import CertificateShape from "src/components/commons/CertificateShape";
import FeeBox from "src/components/commons/FeeBox";
import HoldBox from "src/components/commons/HoldBox";

export const DrawContainer = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "calc(100% + 30px)",
  height: "max-content",
  position: "relative",
  margin: "0px -15px",
  marginTop: 35,
  [theme.breakpoints.down("lg")]: {
    margin: "auto",
    width: "100%"
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
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

export const MiddleGroup = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "max-content",
  flexDirection: "column",
  gap: 25,
  marginTop: 18,
  [theme.breakpoints.down("lg")]: {
    gap: 10,
    paddingTop: 14
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
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

export const StyledCertificateShape = styled(CertificateShape)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  width: 220,
  height: 220,
  margin: "auto",
  border: `2px solid ${theme.palette.border.block}`,
  [theme.breakpoints.down("sm")]: {
    width: 140,
    height: 199
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    height: 199,
    width: 180
  }
}));

export const BoxGroup = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 50,
  width: "max-content",
  margin: "auto",
  height: 128,
  alignItems: "space-between",
  [theme.breakpoints.down("xl")]: {
    gap: 30
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
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

export const StyledFreeBox = styled(FeeBox)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  alignSelf: "flex-end",
  width: 180,
  height: 70,
  boxSizing: "border-box",
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    alignSelf: "flex-start"
  }
}));

export const StyledWithHoldBox = styled(HoldBox)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  border: "2px solid #438F68",
  boxSizing: "border-box",
  height: 70,
  width: 180,
  "&:after": {
    backgroundColor: "#438F68"
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    alignSelf: "flex-end"
  }
}));
