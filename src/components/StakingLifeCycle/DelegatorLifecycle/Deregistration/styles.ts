import { Box, styled, IconButton as IconButtonMui, alpha } from "@mui/material";

export const HoldBox = styled(Box)(({ theme }) => ({
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.success[800]}`,
  borderRadius: "10px",
  marginRight: theme.spacing(5),
  position: "relative",
  background: theme.palette.common.white,
  top: "-70px",
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
    background: theme.palette.success[800],
    transform: " translate(0, 60%)"
  }
}));
export const FeeBox = styled(Box)(({ theme }) => ({
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.error[700]}`,
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
    background: theme.palette.error[700],
    transform: " translate(0, 60%)"
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.primary[100]
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
  color: theme.palette.secondary.main,
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px"
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

export const StyledContainerModal = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.light, 0.1),
  padding: 24,
  [theme.breakpoints.down("md")]: {
    padding: "15px !important"
  }
}));
