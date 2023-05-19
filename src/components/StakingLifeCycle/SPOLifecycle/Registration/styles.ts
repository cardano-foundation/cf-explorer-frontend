import { Box, styled, IconButton as IconButtonMui, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";

export const HoldBox = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
  borderRadius: "10px",
  marginRight: theme.spacing(5),
  position: "relative",
  background: theme.palette.common.white,
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
    background: theme.palette.red[600],
    transform: " translate(0, 60%)"
  },
  "@media screen and (max-width: 1270px)": {
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
  "@media screen and (max-width: 1270px)": {
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
  cursor: "pointer"
}));

export const PoolName = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  bottom: "30%",
  color: theme.palette.grey[400],
  fontWeight: 500,
  transform: "translate(-50%, 0)",
  maxWidth: "70%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));
export const ButtonSPO = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "12%",
  padding: 0,
  zIndex: 3
}));
export const PoolNamePopup = styled(Link)(({ theme }) => ({
  fontSize: "1.125rem",
  color: `${theme.palette.blue[800]} !important`,
  textDecoration: "underline !important",
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`,
  maxWidth: 180,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));
export const StyledCopyButton = styled(CopyButton)`
  margin-left: 5px;
`;
export const StyledLink = styled(Link)`
  font-size: 0.875rem;
`;

export const CustomPopover = styled(CustomTooltip)(({ theme }) => ({
  background: theme.palette.common.white,
  borderRadius: "4px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
}));

export const HoldBoxText = styled(Box)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  color: theme.palette.common.black
}));

export const StyledSkeletonContainer = styled(Box)(({ theme }) => ({}));
export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    wordBreak: "break-all",
    "& > div": {
      height: "100%"
    },
    "& > div > div": {
      padding: "20px 15px",
      gap: "8px",
      minHeight: "40px"
    }
  }
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  ".list-images": {
    maxWidth: "390px",
    margin: "0px auto"
  },
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
