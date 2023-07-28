import { Box, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";

import AdaHolder from "src/components/commons/AdaHolder";
import CertificateShape from "src/components/commons/CertificateShape";
import CopyButton from "src/components/commons/CopyButton";
import HoldBox from "src/components/commons/HoldBox";

export const IconButtonBack = styled(IconButton)(() => ({
  padding: 0
}));

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),
  width: "max-content"
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

export const InfoGroup = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.down(sidebar ? "lg" : "md")]: {
    gap: 12
  },
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
  }
}));

export const MiddleGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "max-content",
  flexDirection: "column",
  gap: 25,
  paddingTop: 75,
  [theme.breakpoints.down("lg")]: {
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
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.secondary.main,
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


export const StyledLink = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;

export const StyledCopyButton = styled(CopyButton)`
  margin-left: 5px;
`;
