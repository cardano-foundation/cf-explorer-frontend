import { Box, styled, IconButton as IconButtonMui } from "@mui/material";
import i18next from "i18next";

import CertificateShape from "src/components/commons/CertificateShape";
import FeeBox from "src/components/commons/FeeBox";
import HoldBox from "src/components/commons/HoldBox";

export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2)
}));

export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px",
  color: theme.palette.secondary.main
}));

export const StepInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  marginBottom: 36,
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    marginBottom: 30
  }
}));

export const InfoGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5
  }
}));

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
  },
  ">div": {
    zIndex: 2
  }
}));

export const MiddleGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "max-content",
  flexDirection: "column",
  gap: 25,
  paddingTop: 89,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row-reverse",
    maxWidth: 536,
    gap: 96,
    paddingTop: 46,
    paddingBottom: 35
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320,
    minWidth: 320,
    gap: 20
  }
}));

export const BoxGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 50,
  height: "100%",
  width: "max-content",
  margin: "auto",

  [theme.breakpoints.down("xl")]: {
    gap: 15
  },
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    gap: 60
  },
  [theme.breakpoints.down("sm")]: {
    gap: 33
  }
}));

export const StyledCertificateShape = styled(CertificateShape)(({ theme }) => ({
  width: 220,
  height: 220,
  margin: "auto",
  color: theme.palette.secondary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.down("sm")]: {
    width: 140
  }
}));

export const StyledHoldBox = styled(HoldBox)(({ theme }) => ({
  "::after": {
    content: `"${i18next.t("glossary.poolHold").toUpperCase()}"`
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "calc(100% - 16px)"
  }
}));

export const StyledFeeBox = styled(FeeBox)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    minWidth: "calc(100% - 16px)"
  }
}));
