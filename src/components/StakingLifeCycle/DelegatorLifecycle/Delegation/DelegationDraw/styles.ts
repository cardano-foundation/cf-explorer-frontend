import { Box, styled } from "@mui/material";

import AdaHolder from "src/components/commons/AdaHolder";
import CertificateShape from "src/components/commons/CertificateShape";
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
  [theme.breakpoints.down("xl")]: {
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
  paddingTop: 75,
  [theme.breakpoints.down("md")]: {
    gap: 10
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    flexDirection: "row-reverse",
    maxWidth: 536,
    gap: 96,
    paddingTop: 46,
    paddingBottom: 35,
    alignItems: "center"
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 330,
    minWidth: 330,
    gap: 33
  }
}));

export const FeeBox = styled(HoldBox)(() => ({
  "::after": {
    content: '"FEES"'
  }
}));

export const StyledCertificateShape = styled(CertificateShape)(({ theme }) => ({
  width: 220,
  height: 220,
  margin: "auto",
  border: `2px solid ${theme.palette.border.block}`,
  [theme.breakpoints.down("sm")]: {
    width: 140
  }
}));

export const StyledAdaHolder = styled(AdaHolder)`
  gap: unset;
  & img[alt="AdaHolderIconUrl"] {
    margin-bottom: 12px;
  }
`;
