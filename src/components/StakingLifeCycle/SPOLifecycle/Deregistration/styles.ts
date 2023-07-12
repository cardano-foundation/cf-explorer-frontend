import { Box, styled, IconButton as IconButtonMui, Grid, alpha } from "@mui/material";
import { Link } from "react-router-dom";

import CertificateShape from "src/components/commons/CertificateShape";
import CopyButton from "src/components/commons/CopyButton";

export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));

export const Info = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));
export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
  color: theme.palette.grey[400]
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.875rem",
  color: theme.palette.blue[100] + "!important",
  "&:hover": {
    color: theme.palette.blue[100]
  }
}));

export const DetailRetirement = styled(Box)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: theme.palette.grey[400]
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
    margin: "auto",
    width: "100%"
  },
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

export const MiddleGroup = styled(Box)<{ hold?: number }>(({ theme, hold }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "max-content",
  flexDirection: "column",
  gap: hold ? 25 : 90,
  paddingTop: hold ? 5 : 75,

  [theme.breakpoints.down("lg")]: {
    gap: 10
  },
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row-reverse",
    maxWidth: 536,
    gap: 30,
    paddingTop: 46,
    paddingBottom: 35,
    alignItems: hold ? "unset" : "center"
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320,
    minWidth: 320,
    gap: 10
  }
}));

export const BoxGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "max-content",
  maxWidth: 530,
  minWidth: 530,
  margin: "auto",
  "& > div": {
    display: "flex",
    width: "100%"
  },
  "& > div:nth-of-type(2)": {
    justifyContent: "flex-end"
  },

  [theme.breakpoints.down("lg")]: {
    maxWidth: 287,
    minWidth: 287,
    margin: 0,
    gap: 78,
    "& > div:nth-of-type(1)": {
      justifyContent: "flex-end"
    },
    "& > div:nth-of-type(2)": {
      justifyContent: "flex-start"
    }
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 178,
    minWidth: 178
  }
}));

export const StyledCertificateShape = styled(CertificateShape)(({ theme }) => ({
  width: 220,
  height: 220,
  margin: "auto",
  border: `2px solid ${theme.palette.border.block}`,
  color: theme.palette.grey[400],
  [theme.breakpoints.down("sm")]: {
    width: 140
  }
}));
export const StyledCopyButton = styled(CopyButton)`
  margin-left: 5px;
`;
export const StyledGridItem = styled(Grid)(({ theme }) => ({
  "& > div": {
    background: `${alpha(theme.palette.grey[300], 0.1)}`,
    padding: 24
  },
  [theme.breakpoints.down("sm")]: {
    "& > div": {
      minHeight: "59px",
      padding: 15
    }
  }
}));
