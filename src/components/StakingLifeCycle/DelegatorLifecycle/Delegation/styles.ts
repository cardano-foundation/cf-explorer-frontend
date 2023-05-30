import { Typography, Box, styled, IconButton as IconButtonMui } from "@mui/material";
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
  fontSize: "14px"
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
