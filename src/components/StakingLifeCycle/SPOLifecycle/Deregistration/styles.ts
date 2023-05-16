import { Box, styled, IconButton as IconButtonMui } from "@mui/material";
import { Link } from "react-router-dom";

export const HoldBox = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.green[600]}`,
  borderRadius: "10px",
  marginRight: theme.spacing(5),
  position: "relative",
  background: theme.palette.common.white,
  top: "-70px",
  "::after": {
    content: '"POOL HOLD"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.green[600],
    transform: " translate(0, 60%)"
  },
  [theme.breakpoints.down("md")]: {
    top: "0px",
    width: "155px",
    margin: "0px",
    marginRight: "-6px",
    fontSize: "16px",
    padding: "12px 8px"
  }
}));
export const FeeBox = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
  borderRadius: "10px",
  background: theme.palette.common.white,
  marginRight: theme.spacing(5),
  position: "relative",
  "::after": {
    content: '"FEES"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.red[600],
    transform: " translate(0, 60%)"
  },
  [theme.breakpoints.down("md")]: {
    width: "155px",
    marginRight: "0px",
    position: "absolute",
    bottom: "0px",
    left: "-35px",
    fontSize: "16px",
    padding: "12px 8px"
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.grey[100]
}));
export const IconButtonBack = styled(IconButtonMui)(({ theme }) => ({
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
  cursor: "pointer"
}));

export const HoldBoxText = styled(Box)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  color: theme.palette.common.black
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.875rem",
  color: theme.palette.blue[800],
  "&:hover": {
    color: theme.palette.blue[800]
  }
}));

export const DetailRetirement = styled(Box)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    ".list-images": {
      maxWidth: "390px",
      margin: "0px auto"
    }
  },
  [theme.breakpoints.down("sm")]: {
    "& > div:nth-of-type(1)": {
      alignItems: "flex-start",
      "& > div:nth-of-type(1)": {
        flexDirection: "column",
        gap: "5px"
      }
    }
  }
}));
