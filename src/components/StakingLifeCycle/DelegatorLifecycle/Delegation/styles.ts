import { Typography, Box, styled, alpha, IconButton as IconButtonMui } from "@mui/material";

import ADAicon from "src/components/commons/ADAIcon";

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
    content: '"HOLD"',
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
  }
}));
export const FeeBox = styled(Box)(({ theme }) => ({
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
  borderRadius: "10px",
  background: theme.palette.common.white,
  position: "relative",
  marginLeft: "10px",
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
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.grey[100]
}));
export const IconButtonBack = styled(IconButtonMui)(() => ({
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
  color: theme.palette.grey[700]
}));

export const FilterDateLabel = styled("span")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.grey[400],
  [theme.breakpoints.down("sm")]: {
    display: "none",
    fontSize: 12
  }
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

export const ADATotalStake = styled(Typography)`
  font-size: 12px;
  position: absolute;
  left: 50%;
  bottom: 36px;
  transform: translateX(-50%);
  color: #13152f;
`;

export const ADATotalStakeContainer = styled(Box)`
  position: relative;
`;

export const StyledADAicon = styled(ADAicon)`
  color: #13152f;
`;

export const ItemList = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px 15px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  width: 500,
  [theme.breakpoints.down("md")]: {
    width: "100%"
  }
}));

export const Item = styled(Box)(({ theme, flexDirection }) => ({
  backgroundColor: alpha(theme.palette.grey[300], 0.1),
  padding: 20,
  flex: 1,
  display: "flex",
  flexDirection: typeof flexDirection === "string" ? flexDirection : "column",
  justifyContent: flexDirection === "row" ? "space-between" : "flex-start",
  alignItems: flexDirection === "row" ? "center" : "flex-start",
  minWidth: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    padding: "15px 20px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: 15,
    paddingRight: flexDirection === "row" ? 5 : 15
  }
}));

export const Label = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: "16px",
  color: theme.palette.grey[400],
  marginBottom: 8
}));

export const LineData = styled(Box)(() => ({
  marginBottom: 8,
  ":last-of-type": {
    marginBottom: 0
  }
}));
