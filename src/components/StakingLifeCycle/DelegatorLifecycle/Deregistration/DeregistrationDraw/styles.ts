import { Box, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";

import CertificateShape from "src/components/commons/CertificateShape";
import CopyButton from "src/components/commons/CopyButton";
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
  },
  ">div": {
    zIndex: 2
  },
  [theme.breakpoints.down(355)]: {
    maxWidth: 320,
    minWidth: "unset",
    width: "100%"
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
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.secondary.main,
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
  },
  [theme.breakpoints.down(355)]: {
    paddingRight: 4
  }
}));

export const StyledFeeBox = styled(FeeBox)(({ theme }) => ({
  alignSelf: "flex-end",
  width: 180,
  height: 70,
  boxSizing: "border-box",
  [theme.breakpoints.down("lg")]: {
    alignSelf: "flex-start"
  }
}));

export const StyledWithHoldBox = styled(HoldBox)(({ theme }) => ({
  border: `2px solid ${theme.isDark ? theme.palette.success[100] : theme.palette.success[800]} `,
  boxSizing: "border-box",
  height: 70,
  width: 180,
  "&:after": {
    backgroundColor: theme.isDark ? theme.palette.success[100] : theme.palette.success[800]
  },
  [theme.breakpoints.down("lg")]: {
    alignSelf: "flex-end"
  }
}));

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

export const StyledCopyButton = styled(CopyButton)`
  margin-left: 5px;
`;

export const StyledLink = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;
